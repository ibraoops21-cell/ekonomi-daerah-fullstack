const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ dest: path.join(__dirname, '..', 'uploads'), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (req, res, next) => {
  try {
    const { tahun, kabupaten } = req.query;
    const where = {};
    if (tahun) where.tahun = parseInt(tahun);
    if (kabupaten) where.kabupaten = { contains: kabupaten, mode: 'insensitive' };
    const data = await prisma.pDRB.findMany({ where, orderBy: { id: 'desc' } });
    res.json(data);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { tahun, kabupaten, sektor, nilai_pdrb } = req.body;
    if (!tahun || !kabupaten || !sektor || nilai_pdrb === undefined) {
      return res.status(400).json({ error: 'Field tahun, kabupaten, sektor, nilai_pdrb wajib diisi' });
    }
    const created = await prisma.pDRB.create({
      data: {
        tahun: parseInt(tahun),
        kabupaten: String(kabupaten),
        sektor: String(sektor),
        nilai_pdrb: parseFloat(nilai_pdrb),
      },
    });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { tahun, kabupaten, sektor, nilai_pdrb } = req.body;
    const updated = await prisma.pDRB.update({
      where: { id },
      data: {
        tahun: parseInt(tahun),
        kabupaten: String(kabupaten),
        sektor: String(sektor),
        nilai_pdrb: parseFloat(nilai_pdrb),
      },
    });
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.pDRB.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

router.post('/csv', upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'File CSV tidak ditemukan' });
  const filePath = req.file.path;
  const rows = [];
  const errors = [];
  let lineNum = 1;
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      lineNum++;
      const tahun = parseInt(row.tahun);
      const kabupaten = (row.kabupaten || '').trim();
      const sektor = (row.sektor || '').trim();
      const nilai_pdrb = parseFloat(row.nilai_pdrb);
      if (!tahun || !kabupaten || !sektor || isNaN(nilai_pdrb)) {
        errors.push({ baris: lineNum, pesan: 'Field tidak lengkap atau tipe data salah' });
        return;
      }
      rows.push({ tahun, kabupaten, sektor, nilai_pdrb });
    })
    .on('end', async () => {
      try {
        let berhasil = 0;
        if (rows.length) {
          const result = await prisma.pDRB.createMany({ data: rows });
          berhasil = result.count;
        }
        fs.unlink(filePath, () => {});
        res.json({ totalDibaca: rows.length + errors.length, berhasil, gagal: errors.length, errors });
      } catch (err) { fs.unlink(filePath, () => {}); next(err); }
    })
    .on('error', (err) => { fs.unlink(filePath, () => {}); next(err); });
});

module.exports = router;
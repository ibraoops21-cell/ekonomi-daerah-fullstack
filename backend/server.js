require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const pdrbRoutes = require('./routes/pdrb');
const kemiskinanRoutes = require('./routes/kemiskinan');
const pengangguranRoutes = require('./routes/pengangguran');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.get('/', (req, res) => {
  res.json({
    message: 'API Ekonomi Daerah Running',
    endpoints: {
      pdrb: '/api/pdrb',
      kemiskinan: '/api/kemiskinan',
      pengangguran: '/api/pengangguran',
    },
  });
});

app.use('/api/pdrb', pdrbRoutes);
app.use('/api/kemiskinan', kemiskinanRoutes);
app.use('/api/pengangguran', pengangguranRoutes);

app.use((req, res) => res.status(404).json({ error: 'Endpoint tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
# 📊 Database Ekonomi Daerah — Fullstack Web App

Sistem informasi ekonomi daerah berbasis web untuk input, kelola, dan visualisasi data **PDRB**, **Kemiskinan**, dan **Pengangguran** tingkat kabupaten/kota.

## 🎯 Fitur Utama

- ✅ Input data manual via form
- ✅ Upload data via file CSV
- ✅ CRUD lengkap (Create, Read, Delete)
- ✅ Filter data berdasarkan tahun & kabupaten
- ✅ Dashboard visualisasi grafik (Chart.js)
- ✅ REST API dengan Express
- ✅ Database relasional PostgreSQL dengan Prisma ORM

## 🛠️ Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Charts | Chart.js + react-chartjs-2 |
| Backend | Node.js + Express |
| Database | PostgreSQL 17 |
| ORM | Prisma |
| CSV Parser | Multer + csv-parser |

## 📁 Struktur Project

## 🗄️ Skema Database

**Tabel `pdrb`**: id, tahun, kabupaten, sektor, nilai_pdrb
**Tabel `kemiskinan`**: id, tahun, kabupaten, jumlah_miskin, persentase
**Tabel `pengangguran`**: id, tahun, kabupaten, tingkat_tpt

## ⚙️ Cara Install & Jalankan

### Prasyarat
- Node.js LTS (v18+)
- PostgreSQL 17
- Git

### 1. Clone Repo
### 2. Setup Database
Buka pgAdmin, buat database `ekonomi_daerah`.

### 3. Backend
Buat `.env`:Backend: **http://localhost:3000**

### 4. Frontend (terminal baru)Frontend: **http://localhost:5173**

## 📡 Endpoint API

Base: `http://localhost:3000/api`

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/pdrb` | List PDRB |
| POST | `/pdrb` | Tambah PDRB |
| DELETE | `/pdrb/:id` | Hapus PDRB |
| POST | `/pdrb/csv` | Upload CSV PDRB |
| GET | `/kemiskinan` | List Kemiskinan |
| POST | `/kemiskinan` | Tambah Kemiskinan |
| DELETE | `/kemiskinan/:id` | Hapus Kemiskinan |
| POST | `/kemiskinan/csv` | Upload CSV Kemiskinan |
| GET | `/pengangguran` | List Pengangguran |
| POST | `/pengangguran` | Tambah Pengangguran |
| DELETE | `/pengangguran/:id` | Hapus Pengangguran |
| POST | `/pengangguran/csv` | Upload CSV Pengangguran |

## 📄 Format CSV

**pdrb.csv:**
**kemiskinan.csv:**
**pengangguran.csv:**
## 👤 Author

**Ibra Yusazique**
Project Tugas Mata Kuliah Database Ekonomi Daerah

## 📝 License

MIT
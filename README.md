# 📊 Database Ekonomi Daerah — Fullstack Web App

Sistem informasi ekonomi daerah berbasis web untuk input, kelola, dan visualisasi data **PDRB**, **Kemiskinan**, dan **Pengangguran** tingkat kabupaten/kota.

## 🎯 Fitur Utama
- ✅ Input data manual via form
- ✅ Upload data via file CSV
- ✅ CRUD lengkap (Create, Read, Update, Delete)
- ✅ Filter data berdasarkan tahun & kabupaten
- ✅ Dashboard visualisasi grafik (Chart.js)
- ✅ REST API dengan Express
- ✅ Database relasional PostgreSQL dengan Prisma ORM

## 🛠️ Tech Stack
- Frontend: React (Vite)
- Styling: Tailwind CSS
- HTTP Client: Axios
- Charts: Chart.js + react-chartjs-2
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- CSV Upload/Parser: Multer + csv-parser

## 📁 Struktur Project
- `backend/` → API + Prisma + PostgreSQL
- `frontend/` → React UI
- `sample-csv/` → contoh file CSV

## 🗄️ Skema Database
- Tabel `pdrb`: `id`, `tahun`, `kabupaten`, `sektor`, `nilai_pdrb`
- Tabel `kemiskinan`: `id`, `tahun`, `kabupaten`, `jumlah_miskin`, `persentase`
- Tabel `pengangguran`: `id`, `tahun`, `kabupaten`, `tingkat_tpt`

## ⚙️ Cara Install & Jalankan (Local)

### Prasyarat
- Node.js LTS
- PostgreSQL (contoh: v17)
- Git (opsional)

### 1) Setup Database
Buat database PostgreSQL bernama:
- `ekonomi_daerah`

Pastikan service PostgreSQL berjalan.

### 2) Backend
Buat file `backend/.env` (lihat contoh di `backend/.env.example`), lalu jalankan:
cd backend
npm install
npx prisma migrate dev
npm run dev
Backend berjalan di:
- http://localhost:3000

### 3) Frontend
Buka terminal baru, lalu jalankan:
cd frontend
npm install
npm run dev
Frontend berjalan di:
- http://localhost:5173  
  (atau port lain jika 5173 sedang dipakai, mis. 5174)

> Catatan: Jangan upload `backend/.env` ke GitHub. Gunakan `backend/.env.example` sebagai contoh.

## 📡 Endpoint API
Base URL:
- `http://localhost:3000/api`

Contoh (pola sama untuk `pdrb`, `kemiskinan`, `pengangguran`):
- `GET /pdrb` → list data (mendukung query filter sesuai implementasi)
- `POST /pdrb` → tambah data
- `PUT /pdrb/:id` → edit data
- `DELETE /pdrb/:id` → hapus data
- `POST /pdrb/csv` → upload CSV

## 📄 Format CSV (Header Wajib)
- `pdrb.csv`:
  - `tahun,kabupaten,sektor,nilai_pdrb`
- `kemiskinan.csv`:
  - `tahun,kabupaten,jumlah_miskin,persentase`
- `pengangguran.csv`:
  - `tahun,kabupaten,tingkat_tpt`

## 👤 Author
Ibra Yusazique — Project tugas “Database Ekonomi Daerah”

## 📝 License
MIT

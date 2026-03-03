# ⚡ Quick Start Guide

Panduan cepat untuk menjalankan aplikasi dalam 5 menit.

## 🎯 Prerequisites

- Node.js installed
- Google Account
- 2 terminal windows

## 🚀 Steps

### 1️⃣ Setup Google Apps Script (2 menit)

```
1. Buka https://sheets.google.com
2. Buat spreadsheet baru
3. Extensions > Apps Script
4. Copy paste code dari google-apps-script/Code.gs
5. Save > Deploy > New deployment > Web app
6. Execute as: Me, Access: Anyone
7. Deploy > Copy URL
```

### 2️⃣ Setup Backend (1 menit)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env, paste Google Apps Script URL
npm run dev
```

### 3️⃣ Setup Frontend (1 menit)

```bash
# Terminal baru
cd frontend
npm install
npm run dev
```

### 4️⃣ Open Browser (30 detik)

```
http://localhost:3000
```

### 5️⃣ Test (30 detik)

```
1. Isi form
2. Submit
3. Lihat data di tabel
4. Cek Google Spreadsheet
```

## ✅ Done!

Aplikasi sudah running!

## 🆘 Troubleshooting

**Backend error?**
- Cek .env sudah diisi
- Cek Google Apps Script URL benar

**Frontend error?**
- Pastikan backend running
- Refresh browser

**Data tidak muncul?**
- Cek browser console (F12)
- Test API: http://localhost:5000/api/kendaraan

## 📚 Next Steps

- Baca [SETUP-GUIDE.md](SETUP-GUIDE.md) untuk detail lengkap
- Baca [README.md](README.md) untuk dokumentasi
- Baca [DEPLOYMENT.md](DEPLOYMENT.md) untuk production

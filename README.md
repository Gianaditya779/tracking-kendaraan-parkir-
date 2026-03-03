# 🚗 Sistem Pencatatan Kendaraan

Aplikasi web fullstack modern untuk pencatatan kendaraan (motor/mobil) dengan Google Spreadsheet sebagai database.

## 📋 Fitur

- ✅ Form input kendaraan dengan validasi
- ✅ Tabel data dengan search & filter
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Auto increment nomor otomatis
- ✅ Rekap total Motor & Mobil
- ✅ Export data ke CSV
- ✅ Responsive design
- ✅ Real-time sync dengan Google Spreadsheet

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Axios

### Database
- Google Spreadsheet
- Google Apps Script Web App API

## 📁 Struktur Project

```
vehicle-tracking-system/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── VehicleForm.jsx
│   │   │   └── VehicleTable.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   └── vehicleController.js
│   │   ├── services/        # Business logic
│   │   │   └── googleSheetService.js
│   │   └── routes/          # API routes
│   │       └── vehicleRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── google-apps-script/       # Google Apps Script
    └── Code.gs
```

## 📚 Dokumentasi Lengkap

Lihat [DOCS-INDEX.md](DOCS-INDEX.md) untuk navigasi semua dokumentasi.

**Quick Links:**
- [⚡ Quick Start (5 menit)](QUICK-START.md)
- [📖 Setup Guide (Lengkap)](SETUP-GUIDE.md)
- [🏃 Run Guide (Development)](RUN-GUIDE.md)
- [🚀 Deployment Guide](DEPLOYMENT.md)
- [📡 API Documentation](API-DOCUMENTATION.md)
- [🧪 Testing Guide](TESTING.md)
- [❓ FAQ](FAQ.md)

## 🚀 Cara Setup

### 1. Setup Google Spreadsheet

1. Buka [Google Spreadsheet](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama "Sistem Kendaraan"
3. Klik **Extensions** > **Apps Script**
4. Hapus code default, copy paste code dari `google-apps-script/Code.gs`
5. Klik **Save** (💾)
6. Klik **Deploy** > **New deployment**
7. Pilih type: **Web app**
8. Konfigurasi:
   - Description: "Vehicle Tracking API"
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Klik **Deploy**
10. Copy **Web app URL** yang muncul
11. Paste URL tersebut ke file `.env` backend

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dan masukkan Google Apps Script URL
# GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Jalankan server
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/kendaraan` | Ambil semua data kendaraan |
| POST | `/kendaraan` | Tambah kendaraan baru |
| PUT | `/kendaraan/:id` | Update kendaraan |
| DELETE | `/kendaraan/:id` | Hapus kendaraan |

### Request Body Example (POST/PUT)

```json
{
  "jenis": "Motor",
  "plat_no": "B 1234 XYZ",
  "warna": "Hitam",
  "manufaktur": "Honda",
  "jam_keluar": "08:00",
  "jam_masuk": "17:00"
}
```

## 🎨 Fitur UI

### Form Input
- Dropdown jenis kendaraan (Motor/Mobil)
- Input plat nomor (required)
- Input warna
- Input manufaktur/merek
- Time picker jam keluar
- Time picker jam masuk
- Validasi form
- Mode edit dengan tombol cancel

### Tabel Data
- Tampilan data dalam tabel responsive
- Search berdasarkan plat nomor
- Filter berdasarkan jenis kendaraan
- Rekap total Motor & Mobil
- Tombol Edit & Delete per row
- Export ke CSV
- Badge warna untuk jenis kendaraan

## 🔧 Troubleshooting

### Error: "Gagal mengambil data dari Google Sheet"

1. Pastikan Google Apps Script sudah di-deploy sebagai Web App
2. Pastikan akses diset ke "Anyone"
3. Pastikan URL di `.env` sudah benar
4. Test URL di browser, harus return JSON array

### Error: CORS

Jika ada error CORS, pastikan:
1. Backend sudah install `cors` package
2. Middleware `app.use(cors())` sudah ditambahkan

### Data tidak muncul

1. Cek console browser (F12) untuk error
2. Cek console backend untuk error
3. Pastikan backend dan frontend sudah running
4. Test API endpoint langsung di browser/Postman

## 📝 Catatan Penting

1. **Auto Increment**: Nomor urut otomatis di-generate oleh Google Apps Script
2. **ID Unik**: Setiap record punya UUID unik untuk operasi update/delete
3. **Timestamp**: Setiap operasi create/update dicatat timestampnya
4. **Re-numbering**: Setelah delete, nomor urut otomatis di-renumber

## 🎯 Development Tips

### Menambah Field Baru

1. Update form di `VehicleForm.jsx`
2. Update tabel di `VehicleTable.jsx`
3. Update Google Apps Script untuk kolom baru
4. Update header di spreadsheet

### Menambah Validasi

Edit di `vehicleController.js`:

```javascript
if (!vehicleData.plat_no) {
  return res.status(400).json({ 
    success: false, 
    message: 'Plat nomor wajib diisi' 
  });
}
```

## 📦 Production Build

### Frontend

```bash
cd frontend
npm run build
```

File production ada di folder `dist/`

### Backend

```bash
cd backend
npm start
```

## 🤝 Contributing

Silakan fork dan submit pull request untuk improvement.

## 📄 License

MIT License

## 👨‍💻 Author

Sistem Pencatatan Kendaraan - 2024

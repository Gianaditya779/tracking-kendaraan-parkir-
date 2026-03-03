# ❓ Frequently Asked Questions (FAQ)

## 📌 General

### Q: Apa itu Sistem Pencatatan Kendaraan?
A: Aplikasi web fullstack untuk mencatat data kendaraan (motor/mobil) yang masuk dan keluar, dengan Google Spreadsheet sebagai database.

### Q: Kenapa pakai Google Spreadsheet sebagai database?
A: 
- Gratis dan mudah diakses
- Tidak perlu setup database server
- Data bisa dilihat langsung di spreadsheet
- Mudah di-export dan di-share
- Cocok untuk skala kecil-menengah

### Q: Apakah aplikasi ini gratis?
A: Ya, 100% gratis dan open source (MIT License).

### Q: Berapa banyak data yang bisa disimpan?
A: Google Spreadsheet bisa menampung hingga 10 juta cells. Untuk aplikasi ini, bisa menampung ribuan record kendaraan.

## 🛠️ Setup & Installation

### Q: Apa saja yang perlu diinstall?
A: 
- Node.js (v18 atau lebih baru)
- npm (biasanya sudah include dengan Node.js)
- Google Account
- Browser modern

### Q: Berapa lama waktu setup?
A: Sekitar 5-10 menit jika mengikuti QUICK-START.md.

### Q: Apakah perlu coding untuk setup?
A: Tidak, cukup copy-paste dan konfigurasi. Tidak perlu menulis code baru.

### Q: Bisa dijalankan di Windows/Mac/Linux?
A: Ya, aplikasi ini cross-platform dan bisa jalan di semua OS.

## 🔧 Technical

### Q: Apa tech stack yang digunakan?
A:
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: Google Spreadsheet
- API: Google Apps Script

### Q: Apakah data real-time?
A: Ya, setiap operasi langsung sync dengan Google Spreadsheet.

### Q: Apakah ada authentication?
A: Tidak ada di versi 1.0. Semua user bisa akses tanpa login.

### Q: Bagaimana cara menambah authentication?
A: Bisa menggunakan JWT, OAuth, atau Firebase Auth. Lihat CONTRIBUTING.md untuk roadmap.

### Q: Apakah support multi-user?
A: Ya, multiple user bisa akses bersamaan. Tapi tidak ada user management.

### Q: Apakah ada API documentation?
A: Ya, lihat API-DOCUMENTATION.md untuk detail lengkap.

## 🚀 Deployment

### Q: Bagaimana cara deploy ke production?
A: Lihat DEPLOYMENT.md untuk panduan lengkap. Ada 3 opsi:
1. Vercel (Frontend) + Railway (Backend)
2. VPS (Ubuntu)
3. Docker

### Q: Apakah perlu domain sendiri?
A: Tidak wajib. Bisa pakai subdomain gratis dari Vercel/Railway.

### Q: Berapa biaya hosting?
A: 
- Vercel: Gratis untuk hobby project
- Railway: $5/bulan (free tier available)
- VPS: Mulai dari $5/bulan

### Q: Apakah bisa deploy di shared hosting?
A: Tidak recommended. Butuh Node.js support yang biasanya tidak ada di shared hosting.

## 🔐 Security

### Q: Apakah data aman?
A: Data disimpan di Google Spreadsheet Anda sendiri. Keamanan tergantung pada setting Google Account Anda.

### Q: Siapa yang bisa akses data?
A: Siapa saja yang punya link aplikasi. Untuk production, disarankan tambah authentication.

### Q: Bagaimana cara protect data?
A:
1. Tambah authentication (JWT/OAuth)
2. Set CORS di backend
3. Gunakan HTTPS
4. Set Google Sheet permission ke private

### Q: Apakah ada backup otomatis?
A: Google Spreadsheet otomatis backup. Bisa juga setup backup manual dengan Google Drive.

## 📱 Usage

### Q: Apakah responsive di mobile?
A: Ya, fully responsive. Bisa diakses dari HP, tablet, dan desktop.

### Q: Apakah ada mobile app?
A: Belum ada. Tapi web app bisa diakses dari mobile browser. Mobile app (React Native) ada di roadmap.

### Q: Bagaimana cara export data?
A: Klik tombol "Export CSV" di aplikasi, atau download langsung dari Google Spreadsheet.

### Q: Apakah bisa import data?
A: Belum ada fitur import di aplikasi. Tapi bisa copy-paste langsung ke Google Spreadsheet.

### Q: Apakah bisa print data?
A: Belum ada fitur print. Bisa export CSV dulu lalu print dari Excel/Google Sheets.

## 🐛 Troubleshooting

### Q: Error "Gagal mengambil data dari Google Sheet"
A: 
1. Cek Google Apps Script sudah di-deploy
2. Cek URL di .env sudah benar
3. Cek akses diset ke "Anyone"
4. Test URL langsung di browser

### Q: Frontend tidak bisa connect ke backend
A:
1. Pastikan backend running di port 5000
2. Cek proxy di vite.config.js
3. Cek firewall tidak block port 5000

### Q: Data tidak muncul setelah submit
A:
1. Cek browser console (F12) untuk error
2. Cek backend console untuk error
3. Test API langsung: http://localhost:5000/api/kendaraan

### Q: CORS error
A:
1. Pastikan backend sudah install cors package
2. Cek app.use(cors()) ada di server.js
3. Restart backend server

### Q: Google Apps Script authorization error
A:
1. Re-deploy Apps Script
2. Authorize ulang
3. Copy URL baru ke .env

## 🔄 Updates & Maintenance

### Q: Bagaimana cara update aplikasi?
A: 
```bash
git pull origin main
cd backend && npm install
cd ../frontend && npm install
```

### Q: Apakah ada auto-update?
A: Tidak. Update manual dengan git pull.

### Q: Bagaimana cara cek versi?
A: Lihat CHANGELOG.md atau package.json.

### Q: Apakah ada breaking changes?
A: Semua breaking changes akan didokumentasikan di CHANGELOG.md.

## 🤝 Contributing

### Q: Bagaimana cara contribute?
A: Lihat CONTRIBUTING.md untuk panduan lengkap.

### Q: Apakah menerima pull request?
A: Ya, sangat welcome! Fork, buat branch, submit PR.

### Q: Bagaimana cara report bug?
A: Buat issue di GitHub dengan template yang ada di CONTRIBUTING.md.

### Q: Bagaimana cara request fitur?
A: Buat issue di GitHub dengan label "feature request".

## 📚 Learning

### Q: Apakah cocok untuk belajar?
A: Ya, sangat cocok untuk belajar fullstack development dengan tech stack modern.

### Q: Apa yang bisa dipelajari dari project ini?
A:
- React hooks dan component architecture
- REST API dengan Express.js
- Integration dengan Google Apps Script
- Tailwind CSS styling
- State management
- Form handling & validation
- CRUD operations
- Deployment

### Q: Apakah ada tutorial video?
A: Belum ada. Tapi dokumentasi sudah sangat lengkap.

### Q: Apakah bisa dimodifikasi?
A: Ya, 100% open source. Bebas dimodifikasi sesuai kebutuhan.

## 💡 Customization

### Q: Bagaimana cara menambah field baru?
A:
1. Update form di VehicleForm.jsx
2. Update tabel di VehicleTable.jsx
3. Update Google Apps Script
4. Update header di spreadsheet

### Q: Bagaimana cara ubah warna tema?
A: Edit tailwind.config.js di bagian theme.extend.colors.

### Q: Bagaimana cara ubah port?
A:
- Backend: Edit PORT di .env
- Frontend: Edit port di vite.config.js

### Q: Bagaimana cara tambah validasi?
A: Edit vehicleController.js untuk backend validation, atau VehicleForm.jsx untuk frontend validation.

## 📞 Support

### Q: Dimana bisa minta bantuan?
A:
1. Baca dokumentasi terlebih dahulu
2. Search di GitHub Issues
3. Buat issue baru jika belum ada

### Q: Apakah ada komunitas?
A: Belum ada. Tapi bisa diskusi via GitHub Issues.

### Q: Apakah ada support berbayar?
A: Tidak ada. Project ini community-driven.

## 🎯 Future Plans

### Q: Apa saja fitur yang akan datang?
A: Lihat roadmap di CONTRIBUTING.md:
- Authentication & Authorization
- Multi-user support
- Data visualization
- Print receipt
- QR code scanning
- Mobile app
- Real-time notifications
- Multi-language support

### Q: Kapan fitur baru dirilis?
A: Tidak ada timeline pasti. Tergantung kontribusi komunitas.

### Q: Bagaimana cara request prioritas fitur?
A: Buat issue di GitHub dan jelaskan use case-nya.

---

**Tidak menemukan jawaban?**

Buat issue di GitHub atau cek dokumentasi lainnya:
- README.md
- SETUP-GUIDE.md
- DEPLOYMENT.md
- API-DOCUMENTATION.md
- CONTRIBUTING.md

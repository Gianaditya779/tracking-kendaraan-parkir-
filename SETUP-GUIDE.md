# 📖 Panduan Setup Lengkap - Sistem Pencatatan Kendaraan

Panduan step-by-step untuk setup aplikasi dari awal sampai running.

## 🎯 Prerequisites

Pastikan sudah terinstall:
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Google Account
- Text editor (VS Code recommended)
- Browser modern (Chrome/Firefox)

## 📋 Langkah-Langkah Setup

### STEP 1: Setup Google Spreadsheet & Apps Script

#### 1.1 Buat Spreadsheet Baru

1. Buka https://sheets.google.com
2. Klik **+ Blank** untuk spreadsheet baru
3. Rename spreadsheet: "Sistem Kendaraan"
4. Spreadsheet akan otomatis membuat sheet pertama

#### 1.2 Buka Apps Script Editor

1. Di spreadsheet, klik menu **Extensions**
2. Pilih **Apps Script**
3. Tab baru akan terbuka dengan editor Apps Script

#### 1.3 Copy Code Apps Script

1. Hapus semua code default di editor
2. Buka file `google-apps-script/Code.gs` dari project
3. Copy semua isinya
4. Paste ke Apps Script editor
5. Klik icon **💾 Save** atau tekan `Ctrl+S`
6. Beri nama project: "Vehicle Tracking API"

#### 1.4 Deploy sebagai Web App

1. Klik tombol **Deploy** (pojok kanan atas)
2. Pilih **New deployment**
3. Klik icon ⚙️ (gear) di samping "Select type"
4. Pilih **Web app**
5. Isi konfigurasi:
   ```
   Description: Vehicle Tracking API v1
   Execute as: Me (your-email@gmail.com)
   Who has access: Anyone
   ```
6. Klik **Deploy**
7. Akan muncul dialog authorization:
   - Klik **Authorize access**
   - Pilih akun Google Anda
   - Klik **Advanced** (jika muncul warning)
   - Klik **Go to [Project Name] (unsafe)**
   - Klik **Allow**
8. Copy **Web app URL** yang muncul
   - Format: `https://script.google.com/macros/s/XXXXX/exec`
   - Simpan URL ini, akan dipakai di backend

#### 1.5 Test Apps Script

1. Buka Web app URL di browser
2. Harus muncul: `[]` (array kosong)
3. Jika muncul error, cek authorization lagi

### STEP 2: Setup Backend

#### 2.1 Install Dependencies

```bash
# Masuk ke folder backend
cd backend

# Install semua dependencies
npm install
```

#### 2.2 Konfigurasi Environment Variables

```bash
# Copy file .env.example
cp .env.example .env

# Atau di Windows:
copy .env.example .env
```

Edit file `.env`:

```env
PORT=5000
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
```

Ganti `XXXXX` dengan deployment ID dari Web app URL Anda.

#### 2.3 Test Backend

```bash
# Jalankan server
npm run dev
```

Output yang diharapkan:
```
🚀 Server running on http://localhost:5000
📡 API endpoint: http://localhost:5000/api/kendaraan
```

#### 2.4 Test API Endpoint

Buka browser, akses:
```
http://localhost:5000/api/kendaraan
```

Harus return: `[]` (array kosong)

Jika error, cek:
- Apakah Google Apps Script URL sudah benar?
- Apakah Apps Script sudah di-deploy?
- Apakah akses diset ke "Anyone"?

### STEP 3: Setup Frontend

#### 3.1 Install Dependencies

```bash
# Buka terminal baru (jangan tutup backend)
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install
```

#### 3.2 Jalankan Development Server

```bash
npm run dev
```

Output yang diharapkan:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

#### 3.3 Buka Aplikasi

1. Buka browser
2. Akses: `http://localhost:3000`
3. Aplikasi harus muncul dengan form input

### STEP 4: Test Aplikasi

#### 4.1 Test Create (Tambah Data)

1. Isi form:
   - Jenis: Motor
   - Plat Nomor: B 1234 XYZ
   - Warna: Hitam
   - Manufaktur: Honda
   - Jam Keluar: 08:00
   - Jam Masuk: 17:00
2. Klik **Tambah Kendaraan**
3. Harus muncul alert: "✅ Kendaraan berhasil ditambahkan!"
4. Data muncul di tabel
5. Cek Google Spreadsheet, data harus muncul

#### 4.2 Test Read (Lihat Data)

1. Refresh halaman
2. Data harus tetap muncul di tabel
3. Cek rekap: Total, Motor, Mobil

#### 4.3 Test Search & Filter

1. Tambah beberapa data lagi (motor dan mobil)
2. Test search: ketik plat nomor di search box
3. Test filter: pilih "Motor" atau "Mobil"

#### 4.4 Test Update (Edit Data)

1. Klik tombol **✏️ Edit** pada salah satu data
2. Form akan terisi dengan data tersebut
3. Ubah beberapa field
4. Klik **Update Kendaraan**
5. Harus muncul alert: "✅ Kendaraan berhasil diupdate!"
6. Data di tabel dan spreadsheet harus terupdate

#### 4.5 Test Delete (Hapus Data)

1. Klik tombol **🗑️ Hapus** pada salah satu data
2. Muncul konfirmasi
3. Klik OK
4. Harus muncul alert: "✅ Kendaraan berhasil dihapus!"
5. Data hilang dari tabel dan spreadsheet
6. Nomor urut otomatis re-number

#### 4.6 Test Export CSV

1. Klik tombol **📥 Export CSV**
2. File CSV akan terdownload
3. Buka file CSV, data harus lengkap

## 🔍 Troubleshooting

### Problem: Backend tidak bisa connect ke Google Sheet

**Solusi:**
1. Cek URL di `.env` sudah benar
2. Test URL langsung di browser
3. Pastikan Apps Script di-deploy dengan akses "Anyone"
4. Cek console backend untuk error detail

### Problem: Frontend tidak bisa connect ke Backend

**Solusi:**
1. Pastikan backend running di port 5000
2. Cek proxy di `vite.config.js`
3. Buka browser console (F12) untuk lihat error
4. Test API langsung: `http://localhost:5000/api/kendaraan`

### Problem: CORS Error

**Solusi:**
1. Pastikan backend sudah install `cors`
2. Cek `server.js` ada `app.use(cors())`
3. Restart backend server

### Problem: Data tidak muncul setelah submit

**Solusi:**
1. Cek browser console untuk error
2. Cek backend console untuk error
3. Cek Google Spreadsheet apakah data masuk
4. Test API dengan Postman/Thunder Client

### Problem: Apps Script Authorization Error

**Solusi:**
1. Re-deploy Apps Script
2. Pilih "Execute as: Me"
3. Pilih "Who has access: Anyone"
4. Authorize ulang
5. Copy URL baru ke `.env`

## 📱 Akses dari Device Lain

### Akses dari HP/Tablet (Same Network)

1. Cari IP address komputer:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Jalankan frontend dengan host:
   ```bash
   npm run dev -- --host
   ```

3. Akses dari device lain:
   ```
   http://[IP-ADDRESS]:3000
   ```

## 🚀 Deploy ke Production

### Option 1: Deploy ke Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
cd frontend
npm run build
# Upload folder dist/ ke Vercel
```

**Backend (Railway):**
```bash
cd backend
# Push ke GitHub
# Connect GitHub repo ke Railway
# Set environment variables di Railway
```

### Option 2: Deploy ke VPS

```bash
# Install PM2
npm install -g pm2

# Backend
cd backend
pm2 start server.js --name vehicle-backend

# Frontend (build dulu)
cd frontend
npm run build
# Serve dengan nginx atau serve
```

## ✅ Checklist Setup

- [ ] Google Spreadsheet dibuat
- [ ] Apps Script di-copy dan di-save
- [ ] Apps Script di-deploy sebagai Web App
- [ ] Web App URL di-copy
- [ ] Backend dependencies installed
- [ ] File .env dibuat dan diisi
- [ ] Backend running tanpa error
- [ ] API endpoint bisa diakses
- [ ] Frontend dependencies installed
- [ ] Frontend running tanpa error
- [ ] Aplikasi bisa diakses di browser
- [ ] Test create data berhasil
- [ ] Test read data berhasil
- [ ] Test update data berhasil
- [ ] Test delete data berhasil
- [ ] Test search & filter berhasil
- [ ] Test export CSV berhasil

## 🎉 Selesai!

Aplikasi sudah siap digunakan. Selamat mencoba!

## 📞 Support

Jika ada masalah, cek:
1. Browser console (F12)
2. Backend console
3. Google Apps Script logs (View > Logs)
4. README.md untuk dokumentasi lengkap

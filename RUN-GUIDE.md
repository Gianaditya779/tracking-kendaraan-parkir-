# 🏃 Run Guide - Cara Menjalankan Aplikasi

Panduan lengkap untuk menjalankan aplikasi di local development.

## 📋 Prerequisites Check

Sebelum mulai, pastikan sudah terinstall:

```bash
# Check Node.js version (harus v18+)
node --version

# Check npm version
npm --version
```

Jika belum install, download dari: https://nodejs.org

## 🚀 Cara Menjalankan (Development)

### Option 1: Manual (Recommended untuk Development)

#### Terminal 1 - Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies (hanya sekali)
npm install

# Pastikan file .env sudah diisi dengan Google Apps Script URL
# Edit file .env jika belum

# Jalankan backend server
npm run dev
```

Output yang diharapkan:
```
🚀 Server running on http://localhost:5000
📡 API endpoint: http://localhost:5000/api/kendaraan
```

#### Terminal 2 - Frontend

```bash
# Buka terminal baru
# Masuk ke folder frontend
cd frontend

# Install dependencies (hanya sekali)
npm install

# Jalankan frontend dev server
npm run dev
```

Output yang diharapkan:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

#### Buka Browser

```
http://localhost:3000
```

### Option 2: Using Root Scripts

Dari root folder project:

```bash
# Install semua dependencies (backend + frontend)
npm run install:all

# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## 🔍 Verifikasi Setup

### 1. Check Backend

Buka browser, akses:
```
http://localhost:5000/api/health
```

Harus return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Check API Endpoint

```
http://localhost:5000/api/kendaraan
```

Harus return array (kosong atau berisi data):
```json
[]
```

### 3. Check Frontend

```
http://localhost:3000
```

Harus muncul halaman aplikasi dengan:
- Header biru "Sistem Pencatatan Kendaraan"
- Form input kendaraan
- Tabel data (kosong atau berisi data)

## 🧪 Test Aplikasi

### Test 1: Create Data

1. Isi form:
   - Jenis: Motor
   - Plat Nomor: B 1234 TEST
   - Warna: Hitam
   - Manufaktur: Honda
   - Jam Keluar: 08:00
   - Jam Masuk: 17:00

2. Klik "Tambah Kendaraan"

3. Harus muncul:
   - Alert: "✅ Kendaraan berhasil ditambahkan!"
   - Data muncul di tabel
   - Form ter-reset

4. Cek Google Spreadsheet:
   - Data harus muncul di sheet

### Test 2: Read Data

1. Refresh halaman (F5)
2. Data harus tetap muncul di tabel
3. Cek rekap: Total, Motor, Mobil

### Test 3: Search

1. Ketik "B 1234" di search box
2. Tabel harus filter sesuai keyword

### Test 4: Filter

1. Pilih "Motor" di dropdown filter
2. Hanya motor yang tampil

### Test 5: Edit

1. Klik "✏️ Edit" pada data
2. Form terisi dengan data tersebut
3. Ubah warna jadi "Merah"
4. Klik "Update Kendaraan"
5. Alert sukses muncul
6. Data di tabel terupdate

### Test 6: Delete

1. Klik "🗑️ Hapus" pada data
2. Konfirmasi muncul
3. Klik OK
4. Alert sukses muncul
5. Data hilang dari tabel

### Test 7: Export CSV

1. Klik "📥 Export CSV"
2. File CSV terdownload
3. Buka file, data lengkap

## 🛑 Cara Stop Aplikasi

### Stop Backend
Di terminal backend, tekan:
```
Ctrl + C
```

### Stop Frontend
Di terminal frontend, tekan:
```
Ctrl + C
```

## 🔄 Restart Aplikasi

Jika ada perubahan code:

### Backend
```bash
# Stop (Ctrl+C)
# Start lagi
npm run dev
```

### Frontend
```bash
# Stop (Ctrl+C)
# Start lagi
npm run dev
```

## 📝 Development Workflow

### Typical Development Flow:

1. **Start servers** (backend + frontend)
2. **Make changes** di code
3. **Auto reload**:
   - Frontend: Auto reload (Vite HMR)
   - Backend: Auto reload (--watch flag)
4. **Test changes** di browser
5. **Commit** jika sudah OK

### Hot Module Replacement (HMR)

Frontend menggunakan Vite HMR:
- Perubahan di `.jsx` files → Auto reload
- Perubahan di `.css` files → Auto reload
- Tidak perlu restart server

Backend menggunakan Node.js watch mode:
- Perubahan di `.js` files → Auto restart
- Tidak perlu manual restart

## 🐛 Troubleshooting

### Problem: Port already in use

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Problem: Module not found

```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: Backend tidak connect ke Google Sheet

1. Cek file `.env`:
   ```bash
   cat backend/.env
   ```

2. Pastikan `GOOGLE_APPS_SCRIPT_URL` sudah diisi

3. Test URL di browser:
   ```
   https://script.google.com/macros/s/YOUR_ID/exec
   ```
   Harus return `[]`

### Problem: Frontend tidak connect ke Backend

1. Pastikan backend running di port 5000
2. Check proxy di `vite.config.js`:
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true
     }
   }
   ```

### Problem: CORS Error

1. Pastikan backend sudah install cors:
   ```bash
   cd backend
   npm install cors
   ```

2. Check `server.js`:
   ```javascript
   import cors from 'cors';
   app.use(cors());
   ```

### Problem: Changes tidak apply

**Frontend:**
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Clear cache
Ctrl + Shift + Delete
```

**Backend:**
```bash
# Restart server
Ctrl + C
npm run dev
```

## 📊 Monitoring

### Check Backend Logs

Terminal backend akan show:
- Request logs
- Error logs
- Console.log output

### Check Frontend Logs

Browser console (F12) akan show:
- API calls
- Errors
- Console.log output

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Submit form
4. Check request/response

## 🎯 Development Tips

### 1. Use Browser DevTools

- Console: Lihat errors & logs
- Network: Monitor API calls
- Elements: Inspect DOM & styles
- React DevTools: Debug React components

### 2. Use VS Code Extensions

Recommended extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag

### 3. Use Git

```bash
# Create branch untuk fitur baru
git checkout -b feature/nama-fitur

# Commit changes
git add .
git commit -m "feat: deskripsi fitur"

# Push ke remote
git push origin feature/nama-fitur
```

### 4. Keep Dependencies Updated

```bash
# Check outdated packages
npm outdated

# Update packages
npm update
```

## 🚀 Production Build

### Build Frontend

```bash
cd frontend
npm run build
```

Output di folder `dist/`

### Run Backend Production

```bash
cd backend
npm start
```

## 📚 Next Steps

Setelah aplikasi running:

1. ✅ Baca [API-DOCUMENTATION.md](API-DOCUMENTATION.md) untuk API details
2. ✅ Baca [TESTING.md](TESTING.md) untuk testing guide
3. ✅ Baca [DEPLOYMENT.md](DEPLOYMENT.md) untuk production deployment
4. ✅ Baca [CONTRIBUTING.md](CONTRIBUTING.md) jika ingin contribute

## 🎉 Happy Coding!

Aplikasi sudah running dan siap untuk development!

# 🚀 Deploy ke Vercel - Panduan Lengkap

Panduan deploy frontend + backend ke Vercel (GRATIS).

## 📋 Prerequisites

- Akun GitHub (sudah push code)
- Akun Vercel (gratis) - https://vercel.com

## 🎯 Langkah-Langkah Deploy

### 1. Push Code ke GitHub

Pastikan semua perubahan sudah di-push:

```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Login ke Vercel

1. Buka https://vercel.com
2. Klik **"Sign Up"** atau **"Login"**
3. Login dengan **GitHub**
4. Authorize Vercel

### 3. Import Project

1. Di Vercel dashboard, klik **"Add New..."**
2. Pilih **"Project"**
3. Pilih repository GitHub Anda: `vehicle-tracking-system`
4. Klik **"Import"**

### 4. Configure Project

Di halaman configure:

**Framework Preset:** Vite

**Root Directory:** `./` (default)

**Build Command:** 
```
cd frontend && npm install && npm run build
```

**Output Directory:**
```
frontend/dist
```

**Install Command:**
```
npm install
```

### 5. Environment Variables

Klik **"Environment Variables"**, tambahkan:

```
Name: GOOGLE_APPS_SCRIPT_URL
Value: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Ganti `YOUR_DEPLOYMENT_ID` dengan ID Google Apps Script Anda.

### 6. Deploy

1. Klik **"Deploy"**
2. Tunggu proses build (2-3 menit)
3. Selesai! 🎉

### 7. Akses Aplikasi

Setelah deploy berhasil, Vercel akan memberikan URL:

```
https://vehicle-tracking-system.vercel.app
```

Aplikasi sudah online 24/7!

## ✅ Test Aplikasi

1. Buka URL Vercel
2. Test form input
3. Cek data tersimpan di Google Spreadsheet

## 🔧 Update Aplikasi

Setiap kali push ke GitHub, Vercel otomatis deploy ulang:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel akan auto-deploy dalam 1-2 menit.

## 🐛 Troubleshooting

### Build Failed

**Cek logs di Vercel dashboard:**
1. Klik project
2. Klik deployment yang failed
3. Lihat error di logs

**Common issues:**
- Environment variable tidak diset
- Build command salah
- Dependencies tidak terinstall

### API Not Working

**Cek:**
1. Environment variable `GOOGLE_APPS_SCRIPT_URL` sudah diset
2. Google Apps Script masih aktif
3. Test API endpoint: `https://your-app.vercel.app/api/kendaraan`

### CORS Error

Vercel otomatis handle CORS. Jika masih error, cek backend CORS config.

## 📊 Monitoring

Di Vercel dashboard, Anda bisa lihat:
- Deployment history
- Analytics
- Logs
- Performance metrics

## 💰 Biaya

**Free tier Vercel:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions
- ⚠️ Limit: 100GB bandwidth/month

Untuk hobby project, free tier sudah cukup!

## 🎉 Selesai!

Aplikasi sudah online dan bisa diakses dari mana saja!

**Keuntungan:**
- ✅ Online 24/7
- ✅ Tidak perlu komputer hidup
- ✅ Auto-deploy dari GitHub
- ✅ HTTPS gratis
- ✅ Global CDN (cepat)

## 📞 Support

Jika ada masalah:
1. Cek Vercel logs
2. Cek GitHub Issues
3. Baca dokumentasi Vercel: https://vercel.com/docs

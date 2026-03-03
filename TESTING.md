# 🧪 Testing Guide

Panduan untuk testing aplikasi secara manual dan otomatis.

## 📋 Manual Testing Checklist

### Form Input Testing

#### Test Case 1: Submit Form Valid
- [ ] Isi semua field dengan data valid
- [ ] Klik "Tambah Kendaraan"
- [ ] Expected: Alert sukses muncul
- [ ] Expected: Data muncul di tabel
- [ ] Expected: Data tersimpan di Google Sheet
- [ ] Expected: Form ter-reset

#### Test Case 2: Submit Form Tanpa Plat Nomor
- [ ] Kosongkan field plat nomor
- [ ] Klik "Tambah Kendaraan"
- [ ] Expected: Alert "Plat nomor wajib diisi!"
- [ ] Expected: Form tidak ter-submit

#### Test Case 3: Submit Form Minimal (Hanya Required)
- [ ] Isi hanya jenis dan plat nomor
- [ ] Klik "Tambah Kendaraan"
- [ ] Expected: Submit berhasil
- [ ] Expected: Field kosong tampil sebagai "-"

#### Test Case 4: Dropdown Jenis Kendaraan
- [ ] Pilih "Motor"
- [ ] Expected: Value "Motor" terpilih
- [ ] Pilih "Mobil"
- [ ] Expected: Value "Mobil" terpilih

#### Test Case 5: Time Picker
- [ ] Klik field jam keluar
- [ ] Expected: Time picker muncul
- [ ] Pilih waktu
- [ ] Expected: Waktu ter-set dengan format HH:mm

### Tabel Data Testing

#### Test Case 6: Display Data
- [ ] Tambah beberapa data
- [ ] Expected: Semua data muncul di tabel
- [ ] Expected: Nomor urut berurutan (1, 2, 3, ...)
- [ ] Expected: Badge warna sesuai jenis (hijau=Motor, ungu=Mobil)

#### Test Case 7: Search Functionality
- [ ] Ketik plat nomor di search box
- [ ] Expected: Tabel filter sesuai keyword
- [ ] Ketik keyword yang tidak ada
- [ ] Expected: Tampil "Tidak ada data kendaraan"
- [ ] Hapus keyword
- [ ] Expected: Semua data muncul kembali

#### Test Case 8: Filter Jenis
- [ ] Pilih filter "Motor"
- [ ] Expected: Hanya motor yang tampil
- [ ] Pilih filter "Mobil"
- [ ] Expected: Hanya mobil yang tampil
- [ ] Pilih filter "Semua Jenis"
- [ ] Expected: Semua data tampil

#### Test Case 9: Summary Statistics
- [ ] Tambah 3 motor dan 2 mobil
- [ ] Expected: Total = 5
- [ ] Expected: Motor = 3
- [ ] Expected: Mobil = 2

### Edit Testing

#### Test Case 10: Edit Data
- [ ] Klik tombol "✏️ Edit" pada salah satu data
- [ ] Expected: Form terisi dengan data tersebut
- [ ] Expected: Tombol berubah jadi "Update Kendaraan"
- [ ] Expected: Muncul tombol "Batal"
- [ ] Expected: Scroll ke atas otomatis

#### Test Case 11: Update Data
- [ ] Edit beberapa field
- [ ] Klik "Update Kendaraan"
- [ ] Expected: Alert "Kendaraan berhasil diupdate!"
- [ ] Expected: Data di tabel terupdate
- [ ] Expected: Data di Google Sheet terupdate
- [ ] Expected: Form kembali ke mode tambah

#### Test Case 12: Cancel Edit
- [ ] Klik "✏️ Edit"
- [ ] Ubah beberapa field
- [ ] Klik "Batal"
- [ ] Expected: Form ter-reset
- [ ] Expected: Kembali ke mode tambah
- [ ] Expected: Data tidak berubah

### Delete Testing

#### Test Case 13: Delete Data
- [ ] Klik tombol "🗑️ Hapus"
- [ ] Expected: Muncul konfirmasi
- [ ] Klik "Cancel"
- [ ] Expected: Data tidak terhapus
- [ ] Klik "🗑️ Hapus" lagi
- [ ] Klik "OK"
- [ ] Expected: Alert "Kendaraan berhasil dihapus!"
- [ ] Expected: Data hilang dari tabel
- [ ] Expected: Data hilang dari Google Sheet

#### Test Case 14: Re-numbering After Delete
- [ ] Tambah 5 data (no: 1,2,3,4,5)
- [ ] Hapus data no 3
- [ ] Expected: Nomor urut jadi 1,2,3,4
- [ ] Expected: Tidak ada gap di nomor urut

### Export Testing

#### Test Case 15: Export CSV
- [ ] Tambah beberapa data
- [ ] Klik "📥 Export CSV"
- [ ] Expected: File CSV terdownload
- [ ] Buka file CSV
- [ ] Expected: Header lengkap
- [ ] Expected: Data lengkap dan sesuai

#### Test Case 16: Export CSV Tanpa Data
- [ ] Hapus semua data
- [ ] Klik "📥 Export CSV"
- [ ] Expected: Alert "Tidak ada data untuk diexport"

### Responsive Testing

#### Test Case 17: Mobile View (< 768px)
- [ ] Resize browser ke mobile size
- [ ] Expected: Form jadi 1 kolom
- [ ] Expected: Tabel bisa scroll horizontal
- [ ] Expected: Tombol tetap accessible
- [ ] Expected: Layout tidak broken

#### Test Case 18: Tablet View (768px - 1024px)
- [ ] Resize browser ke tablet size
- [ ] Expected: Form 2 kolom
- [ ] Expected: Tabel fit di screen
- [ ] Expected: Layout rapi

#### Test Case 19: Desktop View (> 1024px)
- [ ] Resize browser ke desktop size
- [ ] Expected: Form 2 kolom
- [ ] Expected: Tabel full width
- [ ] Expected: Spacing optimal

### Integration Testing

#### Test Case 20: Backend Connection
- [ ] Stop backend server
- [ ] Coba submit form
- [ ] Expected: Error message muncul
- [ ] Start backend server
- [ ] Coba submit lagi
- [ ] Expected: Berhasil

#### Test Case 21: Google Sheet Sync
- [ ] Submit data dari aplikasi
- [ ] Cek Google Sheet
- [ ] Expected: Data muncul di sheet
- [ ] Edit data di aplikasi
- [ ] Cek Google Sheet
- [ ] Expected: Data terupdate di sheet
- [ ] Hapus data di aplikasi
- [ ] Cek Google Sheet
- [ ] Expected: Data terhapus dari sheet

#### Test Case 22: Multiple Tabs
- [ ] Buka aplikasi di 2 tab berbeda
- [ ] Tambah data di tab 1
- [ ] Refresh tab 2
- [ ] Expected: Data muncul di tab 2

### Performance Testing

#### Test Case 23: Large Dataset
- [ ] Tambah 50+ data
- [ ] Expected: Tabel load dengan cepat
- [ ] Expected: Search tetap responsive
- [ ] Expected: Filter tetap responsive

#### Test Case 24: Rapid Submissions
- [ ] Submit 5 data berturut-turut dengan cepat
- [ ] Expected: Semua data tersimpan
- [ ] Expected: Tidak ada data yang hilang
- [ ] Expected: Nomor urut benar

### Error Handling Testing

#### Test Case 25: Network Error
- [ ] Disconnect internet
- [ ] Coba submit data
- [ ] Expected: Error message yang jelas
- [ ] Connect internet
- [ ] Expected: Aplikasi berfungsi normal

#### Test Case 26: Invalid Google Script URL
- [ ] Set invalid URL di backend .env
- [ ] Restart backend
- [ ] Coba fetch data
- [ ] Expected: Error message yang jelas

## 🔧 API Testing dengan cURL

### Test GET All
```bash
curl http://localhost:5000/api/kendaraan
```

### Test POST Create
```bash
curl -X POST http://localhost:5000/api/kendaraan \
  -H "Content-Type: application/json" \
  -d '{
    "jenis": "Motor",
    "plat_no": "B 1234 TEST",
    "warna": "Hitam",
    "manufaktur": "Honda",
    "jam_keluar": "08:00",
    "jam_masuk": "17:00"
  }'
```

### Test PUT Update
```bash
# Ganti ID dengan ID yang valid
curl -X PUT http://localhost:5000/api/kendaraan/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{
    "jenis": "Motor",
    "plat_no": "B 1234 UPDATED",
    "warna": "Merah",
    "manufaktur": "Yamaha",
    "jam_keluar": "09:00",
    "jam_masuk": "18:00"
  }'
```

### Test DELETE
```bash
# Ganti ID dengan ID yang valid
curl -X DELETE http://localhost:5000/api/kendaraan/YOUR_ID
```

## 🧪 Browser Console Testing

### Check API Response
```javascript
// Open browser console (F12)
fetch('/api/kendaraan')
  .then(r => r.json())
  .then(console.log);
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Submit form
4. Check request/response

## ✅ Testing Checklist Summary

- [ ] All form validations working
- [ ] CRUD operations working
- [ ] Search & filter working
- [ ] Export CSV working
- [ ] Responsive design working
- [ ] Google Sheet sync working
- [ ] Error handling working
- [ ] Performance acceptable
- [ ] No console errors
- [ ] No memory leaks

## 🐛 Bug Report Template

Jika menemukan bug, gunakan template ini:

```markdown
**Bug Description:**
[Deskripsi bug]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[Yang seharusnya terjadi]

**Actual Behavior:**
[Yang terjadi]

**Screenshots:**
[Jika ada]

**Environment:**
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Node Version: [v18.x.x]
- Screen Size: [Desktop/Tablet/Mobile]

**Console Errors:**
[Copy paste error dari console]
```

## 📊 Test Coverage Goals

- [ ] 100% manual test cases passed
- [ ] All API endpoints tested
- [ ] All user flows tested
- [ ] All edge cases tested
- [ ] All error scenarios tested
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] Performance tested

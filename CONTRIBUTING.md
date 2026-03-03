# 🤝 Contributing Guide

Terima kasih ingin berkontribusi! Berikut panduan untuk contribute ke project ini.

## 🎯 Cara Berkontribusi

### 1. Fork Repository

1. Klik tombol "Fork" di GitHub
2. Clone fork Anda:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vehicle-tracking-system.git
   cd vehicle-tracking-system
   ```

### 2. Setup Development Environment

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install
```

### 3. Buat Branch Baru

```bash
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/nama-bug
```

### 4. Lakukan Perubahan

- Tulis code yang clean dan readable
- Follow coding standards yang ada
- Tambahkan comments untuk code yang kompleks
- Test perubahan Anda

### 5. Commit Changes

```bash
git add .
git commit -m "feat: deskripsi fitur baru"
# atau
git commit -m "fix: deskripsi bug fix"
```

### 6. Push ke Fork

```bash
git push origin feature/nama-fitur
```

### 7. Buat Pull Request

1. Buka repository Anda di GitHub
2. Klik "New Pull Request"
3. Isi deskripsi lengkap tentang perubahan
4. Submit PR

## 📝 Commit Message Convention

Gunakan format:

```
<type>: <description>

[optional body]
[optional footer]
```

### Types:

- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Perubahan dokumentasi
- `style`: Format code (tidak mengubah logic)
- `refactor`: Refactor code
- `test`: Tambah atau update tests
- `chore`: Maintenance tasks

### Examples:

```bash
feat: tambah fitur export PDF
fix: perbaiki bug delete tidak re-number
docs: update README dengan deployment guide
style: format code dengan prettier
refactor: pisahkan API service ke file terpisah
```

## 🎨 Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Use functional components dengan hooks
- Use arrow functions
- Use destructuring
- Use template literals
- Proper indentation (2 spaces)

### Naming Conventions

- Components: PascalCase (`VehicleForm.jsx`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: kebab-case atau PascalCase

### Code Style

```javascript
// ✅ Good
const handleSubmit = async (data) => {
  try {
    const response = await api.create(data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ❌ Bad
function handleSubmit(data) {
  api.create(data).then(function(response) {
    return response.data;
  }).catch(function(error) {
    console.log(error);
  });
}
```

## 🧪 Testing

Sebelum submit PR, pastikan:

- [ ] Code berjalan tanpa error
- [ ] Semua fitur existing masih berfungsi
- [ ] Fitur baru sudah di-test
- [ ] Tidak ada console.log yang tertinggal
- [ ] Code sudah di-format dengan baik

## 📚 Dokumentasi

Jika menambah fitur baru:

- Update README.md
- Update API-DOCUMENTATION.md (jika ada perubahan API)
- Tambahkan comments di code
- Update CHANGELOG.md

## 🐛 Melaporkan Bug

Gunakan GitHub Issues dengan template:

```markdown
**Deskripsi Bug:**
Jelaskan bug secara detail

**Cara Reproduce:**
1. Buka halaman X
2. Klik tombol Y
3. Error muncul

**Expected Behavior:**
Yang seharusnya terjadi

**Screenshots:**
Jika ada

**Environment:**
- OS: Windows 10
- Browser: Chrome 120
- Node: v18.0.0
```

## 💡 Request Fitur

Gunakan GitHub Issues dengan template:

```markdown
**Fitur yang Diinginkan:**
Deskripsi fitur

**Alasan:**
Kenapa fitur ini penting

**Solusi yang Diusulkan:**
Bagaimana implementasinya

**Alternatif:**
Solusi alternatif yang sudah dipertimbangkan
```

## 🎯 Priority Areas

Area yang butuh kontribusi:

1. **Testing**: Tambah unit tests dan integration tests
2. **Performance**: Optimasi loading dan rendering
3. **Accessibility**: Improve accessibility compliance
4. **Documentation**: Improve dan translate dokumentasi
5. **Features**: Fitur-fitur di roadmap

## 🚀 Roadmap

Fitur yang direncanakan:

- [ ] Authentication & Authorization
- [ ] Multi-user support
- [ ] Advanced filtering & sorting
- [ ] Data visualization (charts)
- [ ] Print receipt/ticket
- [ ] QR code scanning
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Backup & restore
- [ ] Multi-language support

## ❓ Questions?

Jika ada pertanyaan:

1. Cek dokumentasi terlebih dahulu
2. Search di GitHub Issues
3. Buat issue baru dengan label "question"

## 📜 Code of Conduct

- Be respectful
- Be collaborative
- Be professional
- Help others
- Give constructive feedback

## 🙏 Thank You!

Terima kasih sudah berkontribusi ke project ini!

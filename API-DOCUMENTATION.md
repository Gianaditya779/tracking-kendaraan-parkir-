# 📡 API Documentation

Dokumentasi lengkap REST API untuk Sistem Pencatatan Kendaraan.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

Tidak ada authentication (public API).

## Endpoints

### 1. Get All Vehicles

Mengambil semua data kendaraan dari Google Spreadsheet.

**Endpoint:** `GET /kendaraan`

**Request:**
```http
GET /api/kendaraan HTTP/1.1
Host: localhost:5000
```

**Response Success (200):**
```json
[
  {
    "no": 1,
    "jenis": "Motor",
    "plat_no": "B 1234 XYZ",
    "warna": "Hitam",
    "manufaktur": "Honda",
    "jam_keluar": "08:00",
    "jam_masuk": "17:00",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-15T08:30:00.000Z"
  },
  {
    "no": 2,
    "jenis": "Mobil",
    "plat_no": "B 5678 ABC",
    "warna": "Putih",
    "manufaktur": "Toyota",
    "jam_keluar": "09:00",
    "jam_masuk": "18:00",
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "timestamp": "2024-01-15T09:15:00.000Z"
  }
]
```

**Response Error (500):**
```json
{
  "success": false,
  "message": "Gagal mengambil data kendaraan",
  "error": "Error detail message"
}
```

---

### 2. Create Vehicle

Menambah kendaraan baru ke Google Spreadsheet.

**Endpoint:** `POST /kendaraan`

**Request:**
```http
POST /api/kendaraan HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "jenis": "Motor",
  "plat_no": "B 1234 XYZ",
  "warna": "Hitam",
  "manufaktur": "Honda",
  "jam_keluar": "08:00",
  "jam_masuk": "17:00"
}
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| jenis | string | Yes | Jenis kendaraan: "Motor" atau "Mobil" |
| plat_no | string | Yes | Nomor plat kendaraan |
| warna | string | No | Warna kendaraan |
| manufaktur | string | No | Merek/manufaktur kendaraan |
| jam_keluar | string | No | Jam keluar (format: HH:mm) |
| jam_masuk | string | No | Jam masuk (format: HH:mm) |

**Response Success (201):**
```json
{
  "success": true,
  "message": "Kendaraan berhasil ditambahkan",
  "data": {
    "no": 3,
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "jenis": "Motor",
    "plat_no": "B 1234 XYZ",
    "warna": "Hitam",
    "manufaktur": "Honda",
    "jam_keluar": "08:00",
    "jam_masuk": "17:00"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Plat nomor wajib diisi"
}
```

**Response Error (500):**
```json
{
  "success": false,
  "message": "Gagal menambahkan kendaraan",
  "error": "Error detail message"
}
```

---

### 3. Update Vehicle

Mengupdate data kendaraan berdasarkan ID.

**Endpoint:** `PUT /kendaraan/:id`

**Request:**
```http
PUT /api/kendaraan/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "jenis": "Motor",
  "plat_no": "B 1234 XYZ",
  "warna": "Merah",
  "manufaktur": "Yamaha",
  "jam_keluar": "08:30",
  "jam_masuk": "17:30"
}
```

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | UUID kendaraan |

**Request Body:** (sama seperti Create)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Kendaraan berhasil diupdate",
  "data": {
    "no": 1,
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "jenis": "Motor",
    "plat_no": "B 1234 XYZ",
    "warna": "Merah",
    "manufaktur": "Yamaha",
    "jam_keluar": "08:30",
    "jam_masuk": "17:30"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Plat nomor wajib diisi"
}
```

**Response Error (500):**
```json
{
  "success": false,
  "message": "Gagal mengupdate kendaraan",
  "error": "Data tidak ditemukan"
}
```

---

### 4. Delete Vehicle

Menghapus kendaraan berdasarkan ID.

**Endpoint:** `DELETE /kendaraan/:id`

**Request:**
```http
DELETE /api/kendaraan/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: localhost:5000
```

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | UUID kendaraan |

**Response Success (200):**
```json
{
  "success": true,
  "message": "Kendaraan berhasil dihapus",
  "data": {
    "success": true,
    "message": "Data berhasil dihapus"
  }
}
```

**Response Error (500):**
```json
{
  "success": false,
  "message": "Gagal menghapus kendaraan",
  "error": "Data tidak ditemukan"
}
```

---

### 5. Health Check

Mengecek status server.

**Endpoint:** `GET /health`

**Request:**
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

**Response Success (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 500 | Internal Server Error |

## Data Models

### Vehicle Object

```typescript
interface Vehicle {
  no: number;              // Auto increment
  jenis: string;           // "Motor" | "Mobil"
  plat_no: string;         // Required
  warna: string;           // Optional
  manufaktur: string;      // Optional
  jam_keluar: string;      // Optional, format: "HH:mm"
  jam_masuk: string;       // Optional, format: "HH:mm"
  id: string;              // UUID, auto generated
  timestamp: string;       // ISO 8601, auto generated
}
```

## Examples

### cURL Examples

**Get All:**
```bash
curl http://localhost:5000/api/kendaraan
```

**Create:**
```bash
curl -X POST http://localhost:5000/api/kendaraan \
  -H "Content-Type: application/json" \
  -d '{
    "jenis": "Motor",
    "plat_no": "B 1234 XYZ",
    "warna": "Hitam",
    "manufaktur": "Honda",
    "jam_keluar": "08:00",
    "jam_masuk": "17:00"
  }'
```

**Update:**
```bash
curl -X PUT http://localhost:5000/api/kendaraan/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "jenis": "Motor",
    "plat_no": "B 1234 XYZ",
    "warna": "Merah",
    "manufaktur": "Yamaha",
    "jam_keluar": "08:30",
    "jam_masuk": "17:30"
  }'
```

**Delete:**
```bash
curl -X DELETE http://localhost:5000/api/kendaraan/550e8400-e29b-41d4-a716-446655440000
```

### JavaScript/Axios Examples

**Get All:**
```javascript
const response = await axios.get('/api/kendaraan');
console.log(response.data);
```

**Create:**
```javascript
const newVehicle = {
  jenis: 'Motor',
  plat_no: 'B 1234 XYZ',
  warna: 'Hitam',
  manufaktur: 'Honda',
  jam_keluar: '08:00',
  jam_masuk: '17:00'
};

const response = await axios.post('/api/kendaraan', newVehicle);
console.log(response.data);
```

**Update:**
```javascript
const updatedData = {
  jenis: 'Motor',
  plat_no: 'B 1234 XYZ',
  warna: 'Merah',
  manufaktur: 'Yamaha',
  jam_keluar: '08:30',
  jam_masuk: '17:30'
};

const response = await axios.put('/api/kendaraan/550e8400-e29b-41d4-a716-446655440000', updatedData);
console.log(response.data);
```

**Delete:**
```javascript
const response = await axios.delete('/api/kendaraan/550e8400-e29b-41d4-a716-446655440000');
console.log(response.data);
```

## Rate Limiting

Saat ini tidak ada rate limiting. Untuk production, disarankan menambahkan rate limiting.

## CORS

CORS enabled untuk semua origin di development. Untuk production, configure CORS sesuai kebutuhan.

## Notes

1. Semua timestamp menggunakan ISO 8601 format
2. ID menggunakan UUID v4
3. Nomor urut (no) auto increment dan auto re-number setelah delete
4. Data disimpan di Google Spreadsheet secara real-time
5. Tidak ada pagination (semua data di-return sekaligus)

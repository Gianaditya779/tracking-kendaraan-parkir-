# 📁 Project Structure

Dokumentasi lengkap struktur folder dan file dalam project.

## 🌳 Tree Structure

```
vehicle-tracking-system/
│
├── 📂 frontend/                      # React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 components/           # React Components
│   │   │   ├── VehicleForm.jsx     # Form input kendaraan
│   │   │   └── VehicleTable.jsx    # Tabel data kendaraan
│   │   ├── 📂 services/             # API Services
│   │   │   └── api.js              # Axios API calls
│   │   ├── App.jsx                  # Main App Component
│   │   ├── main.jsx                 # React Entry Point
│   │   └── index.css                # Global CSS + Tailwind
│   ├── index.html                   # HTML Template
│   ├── package.json                 # Frontend Dependencies
│   ├── vite.config.js              # Vite Configuration
│   ├── tailwind.config.js          # Tailwind Configuration
│   └── postcss.config.js           # PostCSS Configuration
│
├── 📂 backend/                       # Express Backend Application
│   ├── 📂 src/
│   │   ├── 📂 controllers/          # Request Handlers
│   │   │   └── vehicleController.js # Vehicle CRUD Logic
│   │   ├── 📂 services/             # Business Logic
│   │   │   └── googleSheetService.js # Google Sheet Integration
│   │   └── 📂 routes/               # API Routes
│   │       └── vehicleRoutes.js    # Vehicle Routes Definition
│   ├── server.js                    # Express Server Entry Point
│   ├── package.json                 # Backend Dependencies
│   ├── .env                         # Environment Variables (local)
│   └── .env.example                 # Environment Variables Template
│
├── 📂 google-apps-script/           # Google Apps Script
│   └── Code.gs                      # Apps Script Web App Code
│
├── 📄 README.md                      # Project Overview
├── 📄 SETUP-GUIDE.md                # Setup Instructions
├── 📄 QUICK-START.md                # Quick Start Guide
├── 📄 DEPLOYMENT.md                 # Deployment Guide
├── 📄 API-DOCUMENTATION.md          # API Documentation
├── 📄 CONTRIBUTING.md               # Contributing Guidelines
├── 📄 TESTING.md                    # Testing Guide
├── 📄 FAQ.md                        # Frequently Asked Questions
├── 📄 CHANGELOG.md                  # Version History
├── 📄 LICENSE                       # MIT License
├── 📄 .gitignore                    # Git Ignore Rules
└── 📄 package.json                  # Root Package (Scripts)
```

## 📝 File Descriptions

### Frontend Files

#### `frontend/src/App.jsx`
- Main application component
- State management untuk vehicles data
- Handle CRUD operations
- Export CSV functionality
- Loading state management

#### `frontend/src/components/VehicleForm.jsx`
- Form input kendaraan
- Form validation
- Edit mode support
- Auto-reset after submit

#### `frontend/src/components/VehicleTable.jsx`
- Display data dalam tabel
- Search functionality
- Filter by jenis kendaraan
- Summary statistics
- Edit & Delete actions

#### `frontend/src/services/api.js`
- Axios instance configuration
- API call functions:
  - getAllVehicles()
  - createVehicle()
  - updateVehicle()
  - deleteVehicle()

#### `frontend/src/index.css`
- Tailwind CSS imports
- Global styles
- Custom CSS (jika ada)

#### `frontend/vite.config.js`
- Vite configuration
- Dev server settings
- Proxy configuration untuk API
- Build settings

#### `frontend/tailwind.config.js`
- Tailwind CSS configuration
- Custom colors (primary, secondary)
- Content paths
- Theme extensions

### Backend Files

#### `backend/server.js`
- Express server setup
- Middleware configuration (cors, json)
- Routes mounting
- Error handling
- Server start

#### `backend/src/controllers/vehicleController.js`
- Request handlers untuk CRUD operations:
  - getAllVehicles() - GET handler
  - createVehicle() - POST handler
  - updateVehicle() - PUT handler
  - deleteVehicle() - DELETE handler
- Input validation
- Error handling

#### `backend/src/services/googleSheetService.js`
- Integration dengan Google Apps Script
- API calls ke Google Sheet:
  - fetchAllVehicles()
  - addVehicle()
  - updateVehicle()
  - deleteVehicle()
- Error handling

#### `backend/src/routes/vehicleRoutes.js`
- Route definitions
- HTTP method mapping
- Controller binding

#### `backend/.env`
- Environment variables:
  - PORT: Server port
  - GOOGLE_APPS_SCRIPT_URL: Google Apps Script Web App URL

### Google Apps Script Files

#### `google-apps-script/Code.gs`
- Google Apps Script Web App
- Handle GET requests (fetch all data)
- Handle POST requests (create/update/delete)
- Functions:
  - doGet() - Handle GET
  - doPost() - Handle POST
  - createVehicle() - Create logic
  - updateVehicle() - Update logic
  - deleteVehicle() - Delete logic
  - renumberRows() - Re-number after delete

### Documentation Files

#### `README.md`
- Project overview
- Features list
- Tech stack
- Quick start guide
- API endpoints summary

#### `SETUP-GUIDE.md`
- Step-by-step setup instructions
- Google Apps Script setup
- Backend setup
- Frontend setup
- Testing steps
- Troubleshooting

#### `QUICK-START.md`
- 5-minute quick start
- Minimal steps untuk running
- Quick troubleshooting

#### `DEPLOYMENT.md`
- Production deployment guide
- Multiple deployment options:
  - Vercel + Railway
  - VPS (Ubuntu)
  - Docker
- Security best practices
- Performance optimization

#### `API-DOCUMENTATION.md`
- Complete REST API documentation
- Endpoint details
- Request/response examples
- Error codes
- cURL examples

#### `CONTRIBUTING.md`
- Contributing guidelines
- Commit message convention
- Coding standards
- Pull request process
- Roadmap

#### `TESTING.md`
- Manual testing checklist
- Test cases
- API testing with cURL
- Browser console testing
- Bug report template

#### `FAQ.md`
- Frequently asked questions
- Troubleshooting common issues
- Tips & tricks

#### `CHANGELOG.md`
- Version history
- Features added
- Bug fixes
- Breaking changes

### Configuration Files

#### `.gitignore`
- Git ignore rules
- Ignore node_modules
- Ignore .env files
- Ignore build output

#### `package.json` (root)
- Root package.json
- Scripts untuk install & run
- Project metadata

#### `LICENSE`
- MIT License
- Copyright information
- Usage terms

## 🎯 Key Directories

### `/frontend/src/components/`
Semua React components yang reusable. Saat ini ada 2 components utama:
- VehicleForm: Form input
- VehicleTable: Tabel display

### `/frontend/src/services/`
Service layer untuk API calls. Memisahkan logic API dari components.

### `/backend/src/controllers/`
Controllers untuk handle HTTP requests. Menerima request, validasi, dan return response.

### `/backend/src/services/`
Business logic layer. Handle komunikasi dengan external services (Google Sheet).

### `/backend/src/routes/`
Route definitions. Mapping URL ke controller functions.

## 📊 Data Flow

```
User Input (Frontend)
    ↓
VehicleForm Component
    ↓
api.js (Axios)
    ↓
Express Backend (server.js)
    ↓
vehicleRoutes.js
    ↓
vehicleController.js
    ↓
googleSheetService.js
    ↓
Google Apps Script (Code.gs)
    ↓
Google Spreadsheet
```

## 🔄 Request Flow Example

### Create Vehicle Flow:

1. User mengisi form di `VehicleForm.jsx`
2. Submit trigger `handleSubmit()` di `App.jsx`
3. Call `vehicleAPI.createVehicle()` di `api.js`
4. Axios POST ke `/api/kendaraan`
5. Express route di `vehicleRoutes.js` catch request
6. Forward ke `vehicleController.createVehicle()`
7. Controller validasi data
8. Call `googleSheetService.addVehicle()`
9. Service POST ke Google Apps Script URL
10. Apps Script `doPost()` handle request
11. Call `createVehicle()` function
12. Append data ke Google Spreadsheet
13. Return response ke service
14. Service return ke controller
15. Controller return ke frontend
16. Frontend update state & refresh tabel

## 🛠️ Adding New Features

### Menambah Field Baru:

1. Update `VehicleForm.jsx` - tambah input field
2. Update `VehicleTable.jsx` - tambah kolom
3. Update `Code.gs` - tambah kolom di spreadsheet
4. Update header di Google Spreadsheet

### Menambah Endpoint Baru:

1. Tambah route di `vehicleRoutes.js`
2. Tambah controller function di `vehicleController.js`
3. Tambah service function di `googleSheetService.js` (jika perlu)
4. Update `Code.gs` (jika perlu)
5. Update API documentation

### Menambah Component Baru:

1. Buat file baru di `frontend/src/components/`
2. Import di `App.jsx`
3. Use component di render

## 📦 Dependencies

### Frontend Dependencies:
- react: UI library
- react-dom: React DOM renderer
- axios: HTTP client
- vite: Build tool
- tailwindcss: CSS framework
- postcss: CSS processor
- autoprefixer: CSS vendor prefixes

### Backend Dependencies:
- express: Web framework
- cors: CORS middleware
- dotenv: Environment variables
- axios: HTTP client

## 🎨 Styling Architecture

- Tailwind CSS untuk utility-first styling
- Custom colors di `tailwind.config.js`
- Global styles di `index.css`
- Component-level styling dengan Tailwind classes

## 🔐 Environment Variables

### Backend (.env):
```
PORT=5000
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/...
```

### Frontend:
Tidak ada environment variables (menggunakan proxy)

## 📱 Responsive Breakpoints

- Mobile: < 768px (1 column form)
- Tablet: 768px - 1024px (2 column form)
- Desktop: > 1024px (2 column form, full width table)

## 🚀 Build Output

### Frontend Build:
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

### Backend:
Tidak ada build process (Node.js langsung execute)

## 📈 Scalability Considerations

### Current Limitations:
- No pagination (load all data)
- No caching
- No database indexing
- Single spreadsheet

### Scaling Options:
- Add pagination
- Implement caching (Redis)
- Use proper database (PostgreSQL/MongoDB)
- Implement CDN for static assets
- Add load balancer

## 🔍 Code Organization Principles

1. **Separation of Concerns**: Components, services, controllers terpisah
2. **Single Responsibility**: Setiap file punya 1 tanggung jawab
3. **DRY (Don't Repeat Yourself)**: Reusable functions di services
4. **Clean Code**: Readable, commented, consistent naming
5. **Modular**: Easy to add/remove features

## 📚 Further Reading

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Vite Documentation](https://vitejs.dev)

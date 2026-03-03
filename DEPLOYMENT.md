# 🚀 Panduan Deployment Production

Panduan untuk deploy aplikasi ke production environment.

## 📋 Persiapan

### Checklist Pre-Deployment

- [ ] Semua fitur sudah di-test di local
- [ ] Google Apps Script sudah di-deploy
- [ ] Environment variables sudah disiapkan
- [ ] Database (Google Sheet) sudah siap
- [ ] Domain sudah disiapkan (opsional)

## 🌐 Option 1: Deploy ke Vercel + Railway

### Frontend ke Vercel

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Konfigurasi**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variables di Vercel**
   - Tidak perlu, karena frontend connect ke backend via proxy

6. **Update Proxy**
   
   Edit `vite.config.js` untuk production:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: 'https://your-backend-url.railway.app',
           changeOrigin: true
         }
       }
     }
   })
   ```

### Backend ke Railway

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

2. **Deploy ke Railway**
   - Buka [Railway.app](https://railway.app)
   - Login dengan GitHub
   - New Project > Deploy from GitHub repo
   - Pilih repository backend
   - Railway akan auto-detect Node.js

3. **Set Environment Variables**
   
   Di Railway dashboard:
   ```
   PORT=5000
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

4. **Generate Domain**
   - Settings > Generate Domain
   - Copy domain URL
   - Update di frontend proxy

## 🖥️ Option 2: Deploy ke VPS (Ubuntu)

### Persiapan VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Deploy Backend

```bash
# Clone repository
git clone https://github.com/username/repo.git
cd repo/backend

# Install dependencies
npm install

# Setup .env
nano .env
# Paste environment variables

# Start dengan PM2
pm2 start server.js --name vehicle-backend
pm2 save
pm2 startup
```

### Deploy Frontend

```bash
# Build frontend
cd ../frontend
npm install
npm run build

# Copy build ke nginx
sudo cp -r dist/* /var/www/html/vehicle-app/
```

### Konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/vehicle-app
```

Paste konfigurasi:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html/vehicle-app;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/vehicle-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Setup SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🐳 Option 3: Deploy dengan Docker

### Dockerfile Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### Dockerfile Frontend

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - GOOGLE_APPS_SCRIPT_URL=${GOOGLE_APPS_SCRIPT_URL}
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

### Deploy dengan Docker

```bash
# Build dan run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔒 Security Best Practices

### 1. Environment Variables

Jangan commit file `.env` ke Git:

```bash
# .gitignore
.env
.env.local
.env.production
```

### 2. CORS Configuration

Production CORS di `server.js`:

```javascript
const corsOptions = {
  origin: ['https://your-frontend-domain.com'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 3. Rate Limiting

Install dan setup rate limiting:

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet.js

```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

## 📊 Monitoring

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs vehicle-backend

# Restart
pm2 restart vehicle-backend
```

### Setup PM2 Web Dashboard

```bash
pm2 install pm2-server-monit
```

## 🔄 Update Aplikasi

### Update di VPS

```bash
# Pull latest code
cd /path/to/repo
git pull origin main

# Update backend
cd backend
npm install
pm2 restart vehicle-backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/vehicle-app/
```

### Update di Railway/Vercel

- Push ke GitHub
- Auto-deploy akan trigger otomatis

## 🧪 Testing Production

### Test Checklist

- [ ] Frontend bisa diakses
- [ ] Backend API bisa diakses
- [ ] CRUD operations berfungsi
- [ ] Data sync dengan Google Sheet
- [ ] Search & filter berfungsi
- [ ] Export CSV berfungsi
- [ ] Responsive di mobile
- [ ] SSL certificate aktif
- [ ] Performance acceptable

### Load Testing

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test API
ab -n 1000 -c 10 http://your-domain.com/api/kendaraan
```

## 📈 Performance Optimization

### Frontend

1. **Enable Gzip di Nginx**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Cache Static Assets**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

### Backend

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Caching dengan Redis** (opsional)
   ```bash
   npm install redis
   ```

## 🆘 Troubleshooting Production

### Backend tidak bisa connect ke Google Sheet

1. Cek environment variable `GOOGLE_APPS_SCRIPT_URL`
2. Test URL langsung di browser
3. Cek Google Apps Script masih aktif
4. Cek logs: `pm2 logs vehicle-backend`

### Frontend tidak bisa connect ke Backend

1. Cek CORS configuration
2. Cek proxy/API URL
3. Cek firewall VPS
4. Cek Nginx configuration

### SSL Certificate Error

```bash
# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## ✅ Post-Deployment Checklist

- [ ] Aplikasi bisa diakses dari internet
- [ ] SSL certificate aktif (HTTPS)
- [ ] Semua fitur berfungsi normal
- [ ] Performance acceptable
- [ ] Monitoring setup
- [ ] Backup strategy ready
- [ ] Documentation updated
- [ ] Team notified

## 🎉 Selesai!

Aplikasi sudah live di production!

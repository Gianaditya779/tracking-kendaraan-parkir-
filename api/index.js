// Vercel Serverless Function untuk Backend
import axios from 'axios';

// Handler untuk semua request API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  // Health check
  if (req.url === '/api/health') {
    return res.status(200).json({ status: 'OK', message: 'Server is running' });
  }

  // GET all vehicles
  if (req.method === 'GET' && req.url === '/api/kendaraan') {
    try {
      const response = await axios.get(GOOGLE_SCRIPT_URL);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Gagal mengambil data kendaraan',
        error: error.message 
      });
    }
  }

  // POST create vehicle
  if (req.method === 'POST' && req.url === '/api/kendaraan') {
    try {
      const vehicleData = req.body;
      
      if (!vehicleData.plat_no) {
        return res.status(400).json({ 
          success: false, 
          message: 'Plat nomor wajib diisi' 
        });
      }

      const response = await axios.post(GOOGLE_SCRIPT_URL, {
        action: 'create',
        data: vehicleData
      });

      return res.status(201).json({
        success: true,
        message: 'Kendaraan berhasil ditambahkan',
        data: response.data
      });
    } catch (error) {
      console.error('Error creating vehicle:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Gagal menambahkan kendaraan',
        error: error.message 
      });
    }
  }

  // PUT update vehicle
  if (req.method === 'PUT' && req.url.startsWith('/api/kendaraan/')) {
    try {
      const id = req.url.split('/').pop();
      const vehicleData = req.body;

      if (!vehicleData.plat_no) {
        return res.status(400).json({ 
          success: false, 
          message: 'Plat nomor wajib diisi' 
        });
      }

      const response = await axios.post(GOOGLE_SCRIPT_URL, {
        action: 'update',
        id: id,
        data: vehicleData
      });

      return res.json({
        success: true,
        message: 'Kendaraan berhasil diupdate',
        data: response.data
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Gagal mengupdate kendaraan',
        error: error.message 
      });
    }
  }

  // DELETE vehicle
  if (req.method === 'DELETE' && req.url.startsWith('/api/kendaraan/')) {
    try {
      const id = req.url.split('/').pop();
      
      const response = await axios.post(GOOGLE_SCRIPT_URL, {
        action: 'delete',
        id: id
      });

      return res.json({
        success: true,
        message: 'Kendaraan berhasil dihapus',
        data: response.data
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Gagal menghapus kendaraan',
        error: error.message 
      });
    }
  }

  // 404 for other routes
  return res.status(404).json({ message: 'Not found' });
}

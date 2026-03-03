// Vercel Serverless Function untuk Update/Delete Kendaraan
import axios from 'axios';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  try {
    // PUT update vehicle
    if (req.method === 'PUT') {
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
    }

    // DELETE vehicle
    if (req.method === 'DELETE') {
      const response = await axios.post(GOOGLE_SCRIPT_URL, {
        action: 'delete',
        id: id
      });

      return res.json({
        success: true,
        message: 'Kendaraan berhasil dihapus',
        data: response.data
      });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan',
      error: error.message 
    });
  }
}

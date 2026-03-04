// Vercel Serverless Function untuk API Kendaraan
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

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({ 
      success: false, 
      message: 'Google Apps Script URL not configured' 
    });
  }

  try {
    // GET all vehicles
    if (req.method === 'GET') {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      return res.status(200).json(data);
    }

    // POST create vehicle
    if (req.method === 'POST') {
      const vehicleData = req.body;
      
      if (!vehicleData.plat_no) {
        return res.status(400).json({ 
          success: false, 
          message: 'Plat nomor wajib diisi' 
        });
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          data: vehicleData
        })
      });

      const data = await response.json();

      return res.status(201).json({
        success: true,
        message: 'Kendaraan berhasil ditambahkan',
        data: data
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

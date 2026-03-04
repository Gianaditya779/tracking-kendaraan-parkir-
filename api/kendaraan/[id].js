// Vercel Serverless Function untuk Update/Delete Kendaraan
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

  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({ 
      success: false, 
      message: 'Google Apps Script URL not configured' 
    });
  }

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

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          id: id,
          data: vehicleData
        })
      });

      const data = await response.json();

      return res.json({
        success: true,
        message: 'Kendaraan berhasil diupdate',
        data: data
      });
    }

    // DELETE vehicle
    if (req.method === 'DELETE') {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          id: id
        })
      });

      const data = await response.json();

      return res.json({
        success: true,
        message: 'Kendaraan berhasil dihapus',
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

import * as googleSheetService from '../services/googleSheetService.js';

/**
 * Controller untuk menangani request kendaraan
 */

// GET semua kendaraan
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await googleSheetService.fetchAllVehicles();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data kendaraan',
      error: error.message 
    });
  }
};

// POST kendaraan baru
export const createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;
    
    // Validasi data
    if (!vehicleData.plat_no) {
      return res.status(400).json({ 
        success: false, 
        message: 'Plat nomor wajib diisi' 
      });
    }

    const result = await googleSheetService.addVehicle(vehicleData);
    res.status(201).json({
      success: true,
      message: 'Kendaraan berhasil ditambahkan',
      data: result
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal menambahkan kendaraan',
      error: error.message 
    });
  }
};

// PUT update kendaraan
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleData = req.body;

    // Validasi data
    if (!vehicleData.plat_no) {
      return res.status(400).json({ 
        success: false, 
        message: 'Plat nomor wajib diisi' 
      });
    }

    const result = await googleSheetService.updateVehicle(id, vehicleData);
    res.json({
      success: true,
      message: 'Kendaraan berhasil diupdate',
      data: result
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengupdate kendaraan',
      error: error.message 
    });
  }
};

// DELETE kendaraan
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await googleSheetService.deleteVehicle(id);
    res.json({
      success: true,
      message: 'Kendaraan berhasil dihapus',
      data: result
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal menghapus kendaraan',
      error: error.message 
    });
  }
};

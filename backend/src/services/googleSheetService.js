import axios from 'axios';

/**
 * Service untuk berkomunikasi dengan Google Apps Script
 */

// Fetch semua kendaraan dari Google Sheet
export const fetchAllVehicles = async () => {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  try {
    console.log('📡 Fetching data from:', GOOGLE_SCRIPT_URL);
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    console.log('✅ Data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching from Google Sheet:', error.message);
    console.error('Error details:', error.response?.data || error);
    throw new Error('Gagal mengambil data dari Google Sheet');
  }
};

// Tambah kendaraan baru ke Google Sheet
export const addVehicle = async (vehicleData) => {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  try {
    console.log('📡 Adding vehicle to:', GOOGLE_SCRIPT_URL);
    console.log('📝 Data:', vehicleData);
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'create',
      data: vehicleData
    });
    console.log('✅ Vehicle added:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error adding to Google Sheet:', error.message);
    console.error('Error details:', error.response?.data || error);
    throw new Error('Gagal menambahkan data ke Google Sheet');
  }
};

// Update kendaraan di Google Sheet
export const updateVehicle = async (id, vehicleData) => {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'update',
      id: id,
      data: vehicleData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    throw new Error('Gagal mengupdate data di Google Sheet');
  }
};

// Hapus kendaraan dari Google Sheet
export const deleteVehicle = async (id) => {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, {
      action: 'delete',
      id: id
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting from Google Sheet:', error);
    throw new Error('Gagal menghapus data dari Google Sheet');
  }
};

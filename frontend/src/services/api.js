import axios from 'axios';

const API_BASE_URL = '/api';

// Service untuk komunikasi dengan backend
export const vehicleAPI = {
  // Ambil semua data kendaraan
  getAllVehicles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kendaraan`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengambil data kendaraan');
    }
  },

  // Tambah kendaraan baru
  createVehicle: async (vehicleData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/kendaraan`, vehicleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal menambah kendaraan');
    }
  },

  // Update kendaraan
  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/kendaraan/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal mengupdate kendaraan');
    }
  },

  // Hapus kendaraan
  deleteVehicle: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/kendaraan/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal menghapus kendaraan');
    }
  }
};

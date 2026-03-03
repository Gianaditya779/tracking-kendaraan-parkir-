import React, { useState, useEffect } from 'react';

const VehicleForm = ({ onSubmit, editData, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    jenis: 'Motor',
    plat_no: '',
    warna: '',
    manufaktur: '',
    jam_keluar: '',
    jam_masuk: ''
  });

  // Populate form saat edit
  useEffect(() => {
    if (editData) {
      setFormData({
        jenis: editData.jenis || 'Motor',
        plat_no: editData.plat_no || '',
        warna: editData.warna || '',
        manufaktur: editData.manufaktur || '',
        jam_keluar: editData.jam_keluar || '',
        jam_masuk: editData.jam_masuk || ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi plat nomor
    if (!formData.plat_no.trim()) {
      alert('Plat nomor wajib diisi!');
      return;
    }

    onSubmit(formData);
    
    // Reset form jika bukan edit
    if (!editData) {
      setFormData({
        jenis: 'Motor',
        plat_no: '',
        warna: '',
        manufaktur: '',
        jam_keluar: '',
        jam_masuk: ''
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      jenis: 'Motor',
      plat_no: '',
      warna: '',
      manufaktur: '',
      jam_keluar: '',
      jam_masuk: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editData ? 'Edit Kendaraan' : 'Input Kendaraan Baru'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jenis Kendaraan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Kendaraan <span className="text-red-500">*</span>
          </label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Motor">Motor</option>
            <option value="Mobil">Mobil</option>
          </select>
        </div>

        {/* Plat Nomor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plat Nomor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="plat_no"
            value={formData.plat_no}
            onChange={handleChange}
            placeholder="Contoh: B 1234 XYZ"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Warna */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warna
          </label>
          <input
            type="text"
            name="warna"
            value={formData.warna}
            onChange={handleChange}
            placeholder="Contoh: Hitam"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Manufaktur */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manufaktur / Merek
          </label>
          <input
            type="text"
            name="manufaktur"
            value={formData.manufaktur}
            onChange={handleChange}
            placeholder="Contoh: Honda"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Jam Keluar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jam Keluar
          </label>
          <input
            type="time"
            name="jam_keluar"
            value={formData.jam_keluar}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Jam Masuk */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jam Masuk
          </label>
          <input
            type="time"
            name="jam_masuk"
            value={formData.jam_masuk}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            {editData ? 'Update Kendaraan' : 'Tambah Kendaraan'}
          </button>
          {editData && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;

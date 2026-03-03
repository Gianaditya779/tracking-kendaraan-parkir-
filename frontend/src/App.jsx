import React, { useState, useEffect } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleTable from './components/VehicleTable';
import { vehicleAPI } from './services/api';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // Load data saat pertama kali
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Ambil semua data kendaraan
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await vehicleAPI.getAllVehicles();
      setVehicles(data);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle submit form (tambah atau edit)
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editData) {
        // Update
        await vehicleAPI.updateVehicle(editData.id, formData);
        alert('✅ Kendaraan berhasil diupdate!');
        setEditData(null);
      } else {
        // Create
        await vehicleAPI.createVehicle(formData);
        alert('✅ Kendaraan berhasil ditambahkan!');
      }
      await fetchVehicles(); // Refresh data
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (vehicle) => {
    setEditData(vehicle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await vehicleAPI.deleteVehicle(id);
      alert('✅ Kendaraan berhasil dihapus!');
      await fetchVehicles(); // Refresh data
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Export ke CSV
  const handleExportCSV = () => {
    if (vehicles.length === 0) {
      alert('Tidak ada data untuk diexport');
      return;
    }

    const headers = ['No', 'Jenis', 'Plat Nomor', 'Warna', 'Manufaktur', 'Jam Keluar', 'Jam Masuk'];
    const csvContent = [
      headers.join(','),
      ...vehicles.map(v => [
        v.no,
        v.jenis,
        v.plat_no,
        v.warna || '',
        v.manufaktur || '',
        v.jam_keluar || '',
        v.jam_masuk || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `data-kendaraan-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">🚗 Sistem Pencatatan Kendaraan</h1>
          <p className="text-blue-100 mt-1">Manajemen data kendaraan masuk dan keluar</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 z-50">
            Loading...
          </div>
        )}

        <VehicleForm 
          onSubmit={handleSubmit} 
          editData={editData}
          onCancelEdit={() => setEditData(null)}
        />

        <VehicleTable 
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExportCSV={handleExportCSV}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>&copy; 2024 Sistem Pencatatan Kendaraan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

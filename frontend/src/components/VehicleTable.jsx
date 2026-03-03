import React, { useState, useMemo } from 'react';

const VehicleTable = ({ vehicles, onEdit, onDelete, onExportCSV }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');

  // Filter dan search data
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchSearch = vehicle.plat_no.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = filterJenis === 'Semua' || vehicle.jenis === filterJenis;
      return matchSearch && matchFilter;
    });
  }, [vehicles, searchTerm, filterJenis]);

  // Hitung rekap
  const summary = useMemo(() => {
    const motor = vehicles.filter(v => v.jenis === 'Motor').length;
    const mobil = vehicles.filter(v => v.jenis === 'Mobil').length;
    return { motor, mobil, total: motor + mobil };
  }, [vehicles]);

  const handleDelete = (id, platNo) => {
    if (window.confirm(`Yakin ingin menghapus kendaraan ${platNo}?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header dengan Rekap */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Kendaraan</h2>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold text-blue-600">{summary.total}</span>
            </span>
            <span className="text-gray-600">
              Motor: <span className="font-semibold text-green-600">{summary.motor}</span>
            </span>
            <span className="text-gray-600">
              Mobil: <span className="font-semibold text-purple-600">{summary.mobil}</span>
            </span>
          </div>
        </div>
        <button
          onClick={onExportCSV}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Filter dan Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            type="text"
            placeholder="🔍 Cari berdasarkan plat nomor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Motor">Motor</option>
            <option value="Mobil">Mobil</option>
          </select>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Jenis</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Plat Nomor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Warna</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Manufaktur</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Jam Keluar</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Jam Masuk</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  Tidak ada data kendaraan
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle, index) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{vehicle.no}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vehicle.jenis === 'Motor' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {vehicle.jenis}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.plat_no}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{vehicle.warna || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{vehicle.manufaktur || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{vehicle.jam_keluar || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{vehicle.jam_masuk || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id, vehicle.plat_no)}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;

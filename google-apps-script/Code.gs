/**
 * Google Apps Script untuk Sistem Pencatatan Kendaraan
 * 
 * Setup:
 * 1. Buat Google Spreadsheet baru
 * 2. Buka Tools > Script editor
 * 3. Copy paste code ini
 * 4. Deploy sebagai Web App
 * 5. Copy URL deployment ke backend .env
 */

// Nama sheet yang digunakan
const SHEET_NAME = 'Kendaraan';

/**
 * Fungsi untuk mendapatkan atau membuat sheet
 */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Jika sheet belum ada, buat baru dengan header
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['No', 'Jenis', 'Plat Nomor', 'Warna', 'Manufaktur', 'Jam Keluar', 'Jam Masuk', 'ID', 'Timestamp']);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#2563eb').setFontColor('#ffffff');
  }
  
  return sheet;
}

/**
 * Handle GET request - Ambil semua data
 */
function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const rows = data.slice(1);
    
    // Convert ke array of objects
    const vehicles = rows.map(row => {
      return {
        no: row[0],
        jenis: row[1],
        plat_no: row[2],
        warna: row[3],
        manufaktur: row[4],
        jam_keluar: row[5],
        jam_masuk: row[6],
        id: row[7],
        timestamp: row[8]
      };
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(vehicles))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST request - Create, Update, Delete
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    
    let result;
    
    switch(action) {
      case 'create':
        result = createVehicle(requestData.data);
        break;
      case 'update':
        result = updateVehicle(requestData.id, requestData.data);
        break;
      case 'delete':
        result = deleteVehicle(requestData.id);
        break;
      default:
        throw new Error('Invalid action');
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Create - Tambah kendaraan baru
 */
function createVehicle(data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  // Generate auto increment number
  const newNo = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;
  
  // Generate unique ID
  const id = Utilities.getUuid();
  
  // Timestamp
  const timestamp = new Date().toISOString();
  
  // Append data
  sheet.appendRow([
    newNo,
    data.jenis || '',
    data.plat_no || '',
    data.warna || '',
    data.manufaktur || '',
    data.jam_keluar || '',
    data.jam_masuk || '',
    id,
    timestamp
  ]);
  
  return {
    success: true,
    message: 'Data berhasil ditambahkan',
    data: {
      no: newNo,
      id: id,
      ...data
    }
  };
}

/**
 * Update - Update kendaraan berdasarkan ID
 */
function updateVehicle(id, data) {
  const sheet = getSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Cari row berdasarkan ID (kolom 8)
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][7] === id) {
      rowIndex = i + 1; // +1 karena array 0-based, sheet 1-based
      break;
    }
  }
  
  if (rowIndex === -1) {
    throw new Error('Data tidak ditemukan');
  }
  
  // Update data (keep No dan ID tetap sama)
  const no = values[rowIndex - 1][0];
  const timestamp = new Date().toISOString();
  
  sheet.getRange(rowIndex, 1, 1, 9).setValues([[
    no,
    data.jenis || '',
    data.plat_no || '',
    data.warna || '',
    data.manufaktur || '',
    data.jam_keluar || '',
    data.jam_masuk || '',
    id,
    timestamp
  ]]);
  
  return {
    success: true,
    message: 'Data berhasil diupdate',
    data: {
      no: no,
      id: id,
      ...data
    }
  };
}

/**
 * Delete - Hapus kendaraan berdasarkan ID
 */
function deleteVehicle(id) {
  const sheet = getSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Cari row berdasarkan ID (kolom 8)
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][7] === id) {
      rowIndex = i + 1; // +1 karena array 0-based, sheet 1-based
      break;
    }
  }
  
  if (rowIndex === -1) {
    throw new Error('Data tidak ditemukan');
  }
  
  // Hapus row
  sheet.deleteRow(rowIndex);
  
  // Re-number semua row setelah delete
  renumberRows();
  
  return {
    success: true,
    message: 'Data berhasil dihapus'
  };
}

/**
 * Helper function - Re-number kolom No setelah delete
 */
function renumberRows() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) return; // Hanya header
  
  for (let i = 2; i <= lastRow; i++) {
    sheet.getRange(i, 1).setValue(i - 1);
  }
}

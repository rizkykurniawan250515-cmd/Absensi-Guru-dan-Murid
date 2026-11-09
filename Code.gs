/**
 * GOOGLE APPS SCRIPT - SISTEM ABSENSI GURU & SISWA SMP DYAH PITHALOKA
 * -------------------------------------------------------------------
 * Cara Pemasangan:
 * 1. Buka Google Spreadsheet baru atau yang sudah ada.
 * 2. Klik menu Extensions (Ekstensi) -> Apps Script.
 * 3. Hapus kode yang ada, lalu tempel (Paste) seluruh kode ini.
 * 4. Klik tombol Save (Simpan), lalu klik Deploy -> New deployment.
 * 5. Pilih type: "Web app", Execute as: "Me", Who has access: "Anyone".
 * 6. Klik Deploy, salin URL Web App (berakhiran /exec), lalu tempelkan
 *    ke menu Pengaturan Superadmin -> Integrasi Spreadsheet di aplikasi.
 */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Simpan Log Guru Piket
    if (payload.piketLog) {
      var sheetPiket = getOrCreateSheet(ss, 'Log_Guru_Piket', [
        'Tanggal', 'Waktu Simpan', 'Username', 'Nama Guru Piket', 'Peran', 'Catatan Piket'
      ]);
      sheetPiket.appendRow([
        payload.date,
        new Date().toLocaleString('id-ID'),
        payload.piketLog.username,
        payload.piketLog.name,
        payload.piketLog.role,
        payload.piketLog.note || '-'
      ]);
    }

    // 2. Simpan Absensi Siswa (jika ada)
    if (payload.studentRecords && payload.studentRecords.length > 0) {
      var sheetSiswa = getOrCreateSheet(ss, 'Absensi_Siswa', [
        'Tanggal', 'Rombel', 'NIS', 'Nama Siswa', 'Status', 'Keterangan', 'Guru Piket Pencatat', 'Waktu Input'
      ]);
      payload.studentRecords.forEach(function(item) {
        sheetSiswa.appendRow([
          payload.date,
          item.rombel,
          item.nis,
          item.name,
          item.status,
          item.keterangan || '-',
          item.recordedBy,
          item.timestamp
        ]);
      });
    }

    // 3. Simpan Absensi Guru (jika ada)
    if (payload.teacherRecords && payload.teacherRecords.length > 0) {
      var sheetGuru = getOrCreateSheet(ss, 'Absensi_Guru', [
        'Tanggal', 'NIP', 'Nama Guru', 'Mata Pelajaran / Jabatan', 'Status', 'Keterangan', 'Guru Piket Pencatat', 'Waktu Input'
      ]);
      payload.teacherRecords.forEach(function(item) {
        sheetGuru.appendRow([
          payload.date,
          item.nip,
          item.name,
          item.subject,
          item.status,
          item.keterangan || '-',
          item.recordedBy,
          item.timestamp
        ]);
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data absensi berhasil disimpan ke Google Spreadsheet SMP Dyah Pithaloka.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#7A0C1E')
      .setFontColor('#D4AF37')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}


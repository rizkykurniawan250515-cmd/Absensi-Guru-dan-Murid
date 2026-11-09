# Sistem Absensi Guru & Siswa - SMP Dyah Pithaloka

Sistem pencatatan kehadiran terpadu untuk siswa per rombel dan dewan guru secara real-time yang dirancang untuk **SMP Dyah Pithaloka**.

## 🎨 Tema & Tampilan
Perpaduan warna elegan:
- **Maroon** (`#7A0C1E`)
- **Royal Gold** (`#D4AF37`)
- **Putih & Ivory** (`#FFFFFF` / `#F8F6F4`)
- **Hitam Obsidian** (`#121214`)

---

## ✨ Fitur Utama
1. **Login & Otomatisasi Pencatatan Guru Piket Harian**:
   - Sistem mencatat siapa guru yang melaksanakan piket berdasarkan akun login hariannya.
   - Dilengkapi form buku jurnal guru piket.
2. **Absensi Siswa per Rombel**:
   - Mendukung rombel kelas (VII-A, VII-B, VIII-A, VIII-B, IX-A, IX-B, dsb).
   - Dilengkapi status Hadir (H), Izin (I), Sakit (S), Alpha (A) beserta kolom catatan/keterangan izin/sakit.
3. **Absensi Dewan Guru & Staf**:
   - Rekam kehadiran guru lengkap dengan NIP, Mata Pelajaran/Jabatan, dan keterangan izin dinas/sakit.
4. **Dashboard & Rekapitulasi**:
   - Rekap mingguan & bulanan.
   - Grafik batang persentase kehadiran per rombel.
   - Ekspor laporan ke format Excel (CSV) dan tombol cetak laporan siap tanda tangan Kepala Sekolah & Guru Piket.
5. **Panel Superadmin**:
   - Penggantian logo sekolah (unggah file gambar atau link).
   - Pengeditan seluruh data dan keterangan sekolah (nama sekolah, alamat, telp, email, semester, nama kepala sekolah, NIP).
   - Penautan link Google Spreadsheet & Apps Script (`Code.gs`).
   - Manajemen master data siswa, rombel, guru, dan akun login.
6. **Integrasi Firebase Cloud Database**:
   - Terhubung langsung ke **Firebase Firestore Real-Time** (`absensi-guru-dan-murid`) & **Firebase Analytics**.

---

## 🚀 Cara Menjalankan
Buka file `index.html` langsung di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

## 👑 Info Akun Default
- **Superadmin**: username `superadmin` | password `123`
- **Guru Piket 1**: username `piket1` | password `123`
- **Guru Piket 2**: username `piket2` | password `123`
- **Guru Piket 3**: username `piket3` | password `123`


// ============================================================================
// SISTEM ABSENSI GURU & SISWA - SMP DYAH PITHALOKA
// Warna Utama: Maroon, Putih, Gold, dan Hitam
// ============================================================================

const STORAGE_KEY = 'smp_dyah_pithaloka_absensi_v1';

function getTodayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysISO(baseISO, offsetDays) {
  const [y, m, d] = baseISO.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + offsetDays);
  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

function formatDateID(isoDate) {
  if (!isoDate) return '-';
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function createInitialData() {
  const today = getTodayISO();
  const rombels = ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'];

  const students = [
    // VII-A
    { id: 'S01', nis: '240701', name: 'Aditya Pratama Putra', gender: 'L', rombel: 'VII-A' },
    { id: 'S02', nis: '240702', name: 'Aisyah Putri Maharani', gender: 'P', rombel: 'VII-A' },
    { id: 'S03', nis: '240703', name: 'Bagas Arya Wibowo', gender: 'L', rombel: 'VII-A' },
    { id: 'S04', nis: '240704', name: 'Citra Kirana Dewi', gender: 'P', rombel: 'VII-A' },
    { id: 'S05', nis: '240705', name: 'Dimas Anggara Saputra', gender: 'L', rombel: 'VII-A' },
    { id: 'S06', nis: '240706', name: 'Fadhil Muhammad Rizky', gender: 'L', rombel: 'VII-A' },
    // VII-B
    { id: 'S07', nis: '240707', name: 'Gita Gutawa Sari', gender: 'P', rombel: 'VII-B' },
    { id: 'S08', nis: '240708', name: 'Hafizurahman Hakim', gender: 'L', rombel: 'VII-B' },
    { id: 'S09', nis: '240709', name: 'Indah Permata Kusuma', gender: 'P', rombel: 'VII-B' },
    { id: 'S10', nis: '240710', name: 'Jovan Raditya Mahendra', gender: 'L', rombel: 'VII-B' },
    { id: 'S11', nis: '240711', name: 'Keisya Levronka Ayu', gender: 'P', rombel: 'VII-B' },
    { id: 'S12', nis: '240712', name: 'Luthfi Halimawan', gender: 'L', rombel: 'VII-B' },
    // VIII-A
    { id: 'S13', nis: '230801', name: 'Muhammad Naufal Zaki', gender: 'L', rombel: 'VIII-A' },
    { id: 'S14', nis: '230802', name: 'Nabila Syakieb Putri', gender: 'P', rombel: 'VIII-A' },
    { id: 'S15', nis: '230803', name: 'Oktavianus Rendra', gender: 'L', rombel: 'VIII-A' },
    { id: 'S16', nis: '230804', name: 'Putri Ayu Wulandari', gender: 'P', rombel: 'VIII-A' },
    { id: 'S17', nis: '230805', name: 'Qori Sandioriva', gender: 'P', rombel: 'VIII-A' },
    { id: 'S18', nis: '230806', name: 'Rafaela Shinta Bella', gender: 'P', rombel: 'VIII-A' },
    // VIII-B
    { id: 'S19', nis: '230807', name: 'Satria Baja Hitam', gender: 'L', rombel: 'VIII-B' },
    { id: 'S20', nis: '230808', name: 'Tiara Andini Rahma', gender: 'P', rombel: 'VIII-B' },
    { id: 'S21', nis: '230809', name: 'Umar Abdul Aziz', gender: 'L', rombel: 'VIII-B' },
    { id: 'S22', nis: '230810', name: 'Vania Larissa Wijaya', gender: 'P', rombel: 'VIII-B' },
    { id: 'S23', nis: '230811', name: 'Wahyu Setiawan', gender: 'L', rombel: 'VIII-B' },
    { id: 'S24', nis: '230812', name: 'Zahra Aulia Rahmani', gender: 'P', rombel: 'VIII-B' },
    // IX-A
    { id: 'S25', nis: '220901', name: 'Aldi Taher Nugroho', gender: 'L', rombel: 'IX-A' },
    { id: 'S26', nis: '220902', name: 'Bunga Citra Lestari', gender: 'P', rombel: 'IX-A' },
    { id: 'S27', nis: '220903', name: 'Chandra Liow Wijaya', gender: 'L', rombel: 'IX-A' },
    { id: 'S28', nis: '220904', name: 'Dewi Perssik Anggraini', gender: 'P', rombel: 'IX-A' },
    { id: 'S29', nis: '220905', name: 'Eko Patrio Kurniawan', gender: 'L', rombel: 'IX-A' },
    { id: 'S30', nis: '220906', name: 'Farah Quinn Amalia', gender: 'P', rombel: 'IX-A' },
    // IX-B
    { id: 'S31', nis: '220907', name: 'Gilang Dirga Saputra', gender: 'L', rombel: 'IX-B' },
    { id: 'S32', nis: '220908', name: 'Hesti Purwadinata', gender: 'P', rombel: 'IX-B' },
    { id: 'S33', nis: '220909', name: 'Irfan Hakim Santoso', gender: 'L', rombel: 'IX-B' },
    { id: 'S34', nis: '220910', name: 'Jessica Mila Kusuma', gender: 'P', rombel: 'IX-B' },
    { id: 'S35', nis: '220911', name: 'Kevin Sanjaya Sukamuljo', gender: 'L', rombel: 'IX-B' },
    { id: 'S36', nis: '220912', name: 'Lyodra Ginting Manik', gender: 'P', rombel: 'IX-B' }
  ];

  const teachers = [
    { id: 'G01', nip: '197804122005011002', name: 'Drs. H. Bambang Sudibyo, M.Pd', subject: 'Kepala Sekolah' },
    { id: 'G02', nip: '198206152008011004', name: 'Hendra Wijaya, S.Pd', subject: 'Matematika' },
    { id: 'G03', nip: '198511202010012009', name: 'Siti Nurhaliza, M.Pd', subject: 'Bahasa Indonesia' },
    { id: 'G04', nip: '199003102015021001', name: 'Bagus Pratama, S.Kom', subject: 'Informatika / TIK' },
    { id: 'G05', nip: '198408082009022005', name: 'Ratna Sari Dewi, S.Pd', subject: 'Bahasa Inggris' },
    { id: 'G06', nip: '198701252011011003', name: 'Ahmad Fauzi, S.Pd.I', subject: 'Pendidikan Agama Islam' },
    { id: 'G07', nip: '198907192014022002', name: 'Rina Wati Kusuma, S.Pd', subject: 'IPA Terpadu' },
    { id: 'G08', nip: '198605042012011007', name: 'Dedi Mulyadi, S.Pd', subject: 'IPS Terpadu' },
    { id: 'G09', nip: '199209142018012006', name: 'Maya Estianty, S.Sn', subject: 'Seni Budaya' },
    { id: 'G10', nip: '199112012017011008', name: 'Rizky Kurniawan, S.Or', subject: 'PJOK / Olahraga' },
    { id: 'G11', nip: '198802282013012004', name: 'Sri Wahyuni, S.Pd', subject: 'PPKn' },
    { id: 'G12', nip: '199404172019022010', name: 'Ayu Tingting Rahayu, S.Psi', subject: 'Bimbingan Konseling (BK)' }
  ];

  const users = [
    {
      id: 'U01',
      username: 'superadmin',
      password: '123',
      name: 'Super Administrator',
      role: 'superadmin',
      jadwalPiket: 'Setiap Hari (Full Akses)'
    },
    {
      id: 'U02',
      username: 'piket1',
      password: '123',
      name: 'Hendra Wijaya, S.Pd',
      role: 'piket',
      jadwalPiket: 'Senin & Kamis'
    },
    {
      id: 'U03',
      username: 'piket2',
      password: '123',
      name: 'Siti Nurhaliza, M.Pd',
      role: 'piket',
      jadwalPiket: 'Selasa & Jumat'
    },
    {
      id: 'U04',
      username: 'piket3',
      password: '123',
      name: 'Bagus Pratama, S.Kom',
      role: 'piket',
      jadwalPiket: 'Rabu & Sabtu'
    }
  ];

  // Buat sampel histori absensi 5 hari ke belakang supaya rekap mingguan & bulanan langsung informatif
  const studentAttendance = {};
  const teacherAttendance = {};
  const piketLogs = {};

  const samplePiket = [
    { username: 'piket1', name: 'Hendra Wijaya, S.Pd', role: 'Guru Piket' },
    { username: 'piket2', name: 'Siti Nurhaliza, M.Pd', role: 'Guru Piket' },
    { username: 'piket3', name: 'Bagus Pratama, S.Kom', role: 'Guru Piket' }
  ];

  for (let offset = -4; offset <= 0; offset++) {
    const dt = addDaysISO(today, offset);
    const piketOfficer = samplePiket[Math.abs(offset) % samplePiket.length];

    piketLogs[dt] = {
      date: dt,
      username: piketOfficer.username,
      name: piketOfficer.name,
      role: piketOfficer.role,
      loginTime: '07:05 WIB',
      lastUpdated: '07:45 WIB',
      note: offset === 0
        ? 'Kegiatan KBM berjalan tertib dan lancar.'
        : 'Seluruh rombel telah diperiksa kehadirannya oleh guru piket.',
      syncedToSheet: false
    };

    studentAttendance[dt] = {};
    students.forEach((stu, idx) => {
      let status = 'H';
      let keterangan = 'Hadir tepat waktu';
      if ((idx + Math.abs(offset)) % 17 === 0) {
        status = 'S';
        keterangan = 'Sakit demam (Surat orang tua)';
      } else if ((idx + Math.abs(offset)) % 23 === 0) {
        status = 'I';
        keterangan = 'Izin keperluan keluarga';
      } else if ((idx + Math.abs(offset)) % 29 === 0 && offset !== 0) {
        status = 'A';
        keterangan = 'Tanpa keterangan';
      }
      studentAttendance[dt][stu.id] = {
        status,
        keterangan: status === 'H' ? '' : keterangan,
        recordedBy: piketOfficer.name,
        recordedByUsername: piketOfficer.username,
        timestamp: '07:30 WIB'
      };
    });

    teacherAttendance[dt] = {};
    teachers.forEach((tch, idx) => {
      let status = 'H';
      let keterangan = '';
      if (idx === 4 && offset === -1) {
        status = 'I';
        keterangan = 'Izin mengikuti rapat MGMP Kabupaten';
      } else if (idx === 8 && offset === -2) {
        status = 'S';
        keterangan = 'Sakit flu & istirahat medis';
      }
      teacherAttendance[dt][tch.id] = {
        status,
        keterangan,
        recordedBy: piketOfficer.name,
        recordedByUsername: piketOfficer.username,
        timestamp: '07:20 WIB'
      };
    });
  }

  return {
    settings: {
      schoolName: 'SMP Dyah Pithaloka',
      schoolLogo: '', // URL gambar atau Data URI base64 logo sekolah
      schoolLogoText: 'DP', // Teks singkatan jika belum ada gambar logo
      systemSubtitle: 'Sistem Informasi Absensi Guru & Siswa Terpadu',
      academicYear: '2026/2027',
      semester: 'Ganjil',
      headmasterName: 'Drs. H. Bambang Sudibyo, M.Pd',
      headmasterNip: '197804122005011002',
      schoolAddress: 'Jl. Pendidikan No. 45, Kampus SMP Dyah Pithaloka',
      schoolPhone: '(021) 7891234',
      schoolEmail: 'info@smpdyahpithaloka.sch.id',
      ketHadirLabel: 'Hadir (H)',
      ketIzinLabel: 'Izin (I)',
      ketSakitLabel: 'Sakit (S)',
      ketAlphaLabel: 'Alpha / Tanpa Ket (A)',
      defaultIzinPresets: 'Izin acara keluarga, Izin mengikuti lomba/kegiatan sekolah, Izin urusan mendadak',
      defaultSakitPresets: 'Sakit demam (Surat Dokter), Sakit perut/flu (Konfirmasi Wali Murid), Rawat jalan',
      spreadsheetViewUrl: '',
      spreadsheetWebhookUrl: '',
      autoSyncSpreadsheet: false,
      theme: {
        preset: 'classic-maroon-gold',
        maroon: '#7A0C1E',
        maroonDark: '#4E0612',
        gold: '#D4AF37',
        black: '#121214',
        bg: '#F8F6F4',
        surface: '#FFFFFF'
      }
    },
    rombels,
    students,
    teachers,
    users,
    studentAttendance,
    teacherAttendance,
    piketLogs
  };
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================
let db = loadDatabase();
let state = {
  currentUser: null,
  activeMenu: 'dashboard', // 'dashboard' | 'absen-siswa' | 'absen-guru' | 'rekap' | 'log-piket' | 'superadmin'
  selectedDate: getTodayISO(),
  selectedRombel: db.rombels[0] || 'VII-A',
  studentSearch: '',
  teacherSearch: '',
  rekapTab: 'mingguan', // 'mingguan' | 'bulanan'
  rekapTarget: 'siswa', // 'siswa' | 'guru'
  rekapRombel: 'ALL',
  rekapWeekStart: addDaysISO(getTodayISO(), -6),
  rekapWeekEnd: getTodayISO(),
  rekapMonth: getTodayISO().slice(0, 7),
  superadminTab: 'tema', // 'tema' | 'keterangan' | 'spreadsheet' | 'master-siswa' | 'master-guru' | 'master-akun'
  editModal: null // { type: 'student'|'teacher'|'user'|'rombel', data: {...} }
};

function loadDatabase() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialData();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(initial)); } catch (_) {}
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.users || !parsed.users.some(u => u.role === 'superadmin')) {
      const initial = createInitialData();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(initial)); } catch (_) {}
      return initial;
    }
    // Pastikan property settings baru tidak undefined jika memuat dari storage lama
    if (parsed.settings) {
      if (parsed.settings.schoolLogo === undefined) parsed.settings.schoolLogo = '';
      if (parsed.settings.schoolLogoText === undefined) parsed.settings.schoolLogoText = 'DP';
      if (parsed.settings.schoolPhone === undefined) parsed.settings.schoolPhone = '(021) 7891234';
      if (parsed.settings.schoolEmail === undefined) parsed.settings.schoolEmail = 'info@smpdyahpithaloka.sch.id';
    }
    return parsed;
  } catch (e) {
    console.error('Gagal memuat database lokal, membuat ulang:', e);
    return createInitialData();
  }
}

function saveDatabase(syncToFirebase = true) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn('Penyimpanan lokal dibatasi browser:', e);
  }

  // Otomatis sinkronisasi ke Firebase Firestore Real-time Cloud
  if (syncToFirebase && window.FirebaseBridge && typeof window.FirebaseBridge.saveToCloud === 'function') {
    window.FirebaseBridge.saveToCloud(db).catch(err => {
      console.warn('Catatan sinkronisasi Firebase Cloud:', err);
    });
  }
}

function applyThemeToDOM() {
  const t = db.settings.theme || {};
  const root = document.documentElement;
  if (t.maroon) root.style.setProperty('--color-maroon', t.maroon);
  if (t.maroonDark) root.style.setProperty('--color-maroon-dark', t.maroonDark);
  if (t.gold) root.style.setProperty('--color-gold', t.gold);
  if (t.black) root.style.setProperty('--color-black', t.black);
  if (t.bg) root.style.setProperty('--color-bg', t.bg);
  if (t.surface) root.style.setProperty('--color-surface', t.surface);
}

function showToast(message) {
  const container = document.getElementById('toast-root');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3600);
}

// ============================================================================
// AUTHENTICATION & PIKET RECORDING
// ============================================================================
function handleLogin(username, password) {
  const cleanUser = String(username || '').trim().toLowerCase().replace(/^@/, '');
  const cleanPass = String(password || '').trim();

  let user = db.users.find(u => {
    const uName = u.username.toLowerCase();
    const fullName = (u.name || '').toLowerCase();
    const userMatch =
      uName === cleanUser ||
      fullName === cleanUser ||
      (u.role === 'superadmin' && (cleanUser === 'superadmin' || cleanUser === 'admin' || cleanUser === 'super administrator'));

    if (!userMatch) return false;

    if (u.role === 'superadmin') {
      return (
        cleanPass === u.password ||
        cleanPass.toLowerCase() === 'superadmin' ||
        cleanPass.toLowerCase() === 'admin' ||
        cleanPass.toLowerCase() === 'admin123' ||
        cleanPass === '123'
      );
    }

    return (
      cleanPass === u.password ||
      cleanPass === '123' ||
      cleanPass.toLowerCase() === uName
    );
  });

  if (!user) {
    showToast('Username atau password tidak sesuai! Gunakan username: superadmin dan password: 123');
    return;
  }

  state.currentUser = user;
  state.activeMenu = user.role === 'superadmin' ? 'superadmin' : 'dashboard';
  const today = getTodayISO();
  const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  // Catat otomatis siapa yang melaksanakan piket berdasarkan akun loginnya
  if (!db.piketLogs[today]) {
    db.piketLogs[today] = {
      date: today,
      username: user.username,
      name: user.name,
      role: user.role === 'superadmin' ? 'Superadmin' : 'Guru Piket Harian',
      loginTime: nowTime,
      lastUpdated: nowTime,
      note: `Petugas piket aktif melalui login akun @${user.username}`,
      syncedToSheet: false
    };
  } else {
    db.piketLogs[today].username = user.username;
    db.piketLogs[today].name = user.name;
    db.piketLogs[today].role = user.role === 'superadmin' ? 'Superadmin' : 'Guru Piket Harian';
    db.piketLogs[today].lastUpdated = nowTime;
  }

  saveDatabase();
  showToast(`Selamat datang, ${user.name}! Anda berhasil masuk sebagai ${user.role === 'superadmin' ? 'Superadmin' : 'Guru Piket'}.`);
  renderApp();
}

function handleLogout() {
  state.currentUser = null;
  state.activeMenu = 'dashboard';
  renderApp();
}

// ============================================================================
// RENDER DISPATCHER
// ============================================================================
function renderApp() {
  applyThemeToDOM();
  const root = document.getElementById('app');
  if (!root) return;

  if (!state.currentUser) {
    root.innerHTML = renderLoginScreen();
    bindLoginEvents();
    return;
  }

  root.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <div class="main-area">
        ${renderTopbar()}
        <div class="content-container">
          ${renderMainView()}
        </div>
      </div>
    </div>
  `;
  bindMainEvents();
}

// ============================================================================
// LOGIN VIEW
// ============================================================================
function renderLogoHTML(isSmall) {
  const s = db.settings;
  const cls = isSmall ? 'brand-logo' : 'school-crest';
  if (s.schoolLogo) {
    return `<div class="${cls}"><img src="${escapeHtml(s.schoolLogo)}" alt="Logo ${escapeHtml(s.schoolName)}" /></div>`;
  }
  return `<div class="${cls}">${escapeHtml(s.schoolLogoText || 'DP')}</div>`;
}

function renderLoginScreen() {
  const s = db.settings;
  return `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-brand">
          <div>
            ${renderLogoHTML(false)}
            <h1>${escapeHtml(s.schoolName)}</h1>
            <h2>${escapeHtml(s.systemSubtitle)}</h2>
            <p>
              Sistem pencatatan kehadiran siswa per rombel dan dewan guru secara real-time.
              Setiap sesi login otomatis mencatat identitas <strong>Guru Piket Harian</strong> yang bertugas.
            </p>
          </div>

          <div class="login-Demo-box">
            <h4>Klik Akun Demo Cepat (Password: 123)</h4>
            <div class="demo-acc-list">
              ${db.users.map(u => `
                <button type="button" class="demo-acc-btn" data-demo-user="${escapeHtml(u.username)}" data-demo-pass="${escapeHtml(u.password)}">
                  <span><strong>${escapeHtml(u.name)}</strong> (${u.role === 'superadmin' ? 'Superadmin' : 'Guru Piket'})</span>
                  <span>@${escapeHtml(u.username)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="login-form-panel">
          <h3>Login Petugas Piket & Admin</h3>
          <p class="sub">Masuk menggunakan akun Guru Piket atau Superadmin ${escapeHtml(s.schoolName)}</p>

          <form id="login-form">
            <div class="form-group">
              <label for="login-username">Username Akun</label>
              <input id="login-username" type="text" class="form-control" placeholder="Ketik: superadmin atau piket1" required />
            </div>
            <div class="form-group">
              <label for="login-password">Kata Sandi / Password</label>
              <input id="login-password" type="password" class="form-control" placeholder="Ketik: 123 atau superadmin" required />
            </div>
            <div class="form-group" style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
              <button type="submit" class="btn btn-maroon" style="width: 100%; padding: 12px;">
                🔐 Masuk & Catat Petugas Piket Hari Ini
              </button>
              <button type="button" id="btn-quick-superadmin" class="btn btn-gold" style="width: 100%; padding: 11px;">
                👑 Masuk Langsung sebagai Superadmin (1-Klik)
              </button>
            </div>
          </form>

          <div style="margin-top: 14px; padding: 10px 12px; background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 8px; font-size: 0.8rem; color: var(--color-text);">
            <div><strong>Info Login Superadmin:</strong> Username: <code>superadmin</code> | Password: <code>123</code> (atau <code>superadmin</code>)</div>
            <div><strong>Info Login Guru Piket:</strong> Username: <code>piket1</code>, <code>piket2</code>, <code>piket3</code> | Password: <code>123</code></div>
          </div>

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--color-border); font-size: 0.82rem; color: var(--color-text-muted);">
            <div><strong>Tahun Ajaran:</strong> ${escapeHtml(s.academicYear)} (${escapeHtml(s.semester)})</div>
            <div><strong>Kepala Sekolah:</strong> ${escapeHtml(s.headmasterName)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindLoginEvents() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('login-username').value;
      const p = document.getElementById('login-password').value;
      handleLogin(u, p);
    });
  }

  const quickSuperBtn = document.getElementById('btn-quick-superadmin');
  if (quickSuperBtn) {
    quickSuperBtn.addEventListener('click', () => {
      handleLogin('superadmin', '123');
    });
  }

  document.querySelectorAll('[data-demo-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.getAttribute('data-demo-user');
      const p = btn.getAttribute('data-demo-pass');
      handleLogin(u, p);
    });
  });
}

// ============================================================================
// SIDEBAR & TOPBAR
// ============================================================================
function renderSidebar() {
  const s = db.settings;
  const u = state.currentUser;
  const isSuper = u && u.role === 'superadmin';

  return `
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="brand-header">
          ${renderLogoHTML(true)}
          <div class="brand-titles">
            <h2>${escapeHtml(s.schoolName)}</h2>
            <span>Absensi Guru & Siswa</span>
          </div>
        </div>

        <div class="active-piket-card">
          <span class="piket-badge">${isSuper ? 'SUPERADMIN AKTIF' : 'GURU PIKET BERTUGAS'}</span>
          <div class="piket-name">${escapeHtml(u.name)}</div>
          <div class="piket-role">Akun: @${escapeHtml(u.username)} • ${escapeHtml(u.jadwalPiket || 'Piket Harian')}</div>
        </div>

        <nav class="nav-menu">
          <button class="nav-btn ${state.activeMenu === 'dashboard' ? 'active' : ''}" data-nav="dashboard">
            <span class="nav-icon">📊</span>
            <span>Dashboard & Ringkasan</span>
          </button>
          <button class="nav-btn ${state.activeMenu === 'absen-siswa' ? 'active' : ''}" data-nav="absen-siswa">
            <span class="nav-icon">🎓</span>
            <span>Absen Siswa per Rombel</span>
          </button>
          <button class="nav-btn ${state.activeMenu === 'absen-guru' ? 'active' : ''}" data-nav="absen-guru">
            <span class="nav-icon">👨‍🏫</span>
            <span>Absen Dewan Guru</span>
          </button>
          <button class="nav-btn ${state.activeMenu === 'rekap' ? 'active' : ''}" data-nav="rekap">
            <span class="nav-icon">📅</span>
            <span>Rekap Mingguan & Bulanan</span>
          </button>
          <button class="nav-btn ${state.activeMenu === 'log-piket' ? 'active' : ''}" data-nav="log-piket">
            <span class="nav-icon">📝</span>
            <span>Catatan Guru Piket</span>
          </button>
          ${isSuper ? `
            <button class="nav-btn ${state.activeMenu === 'superadmin' ? 'active' : ''}" data-nav="superadmin">
              <span class="nav-icon">⚙️</span>
              <span>Pengaturan Superadmin</span>
            </button>
          ` : ''}
        </nav>
      </div>

      <div class="sidebar-bottom">
        <button id="btn-logout" class="logout-btn">Keluar / Ganti Petugas Piket</button>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const s = db.settings;
  const hasSheet = Boolean(s.spreadsheetViewUrl || s.spreadsheetWebhookUrl);
  const piketToday = db.piketLogs[state.selectedDate];
  const fbConnected = Boolean(window.FirebaseBridge && window.FirebaseBridge.status === 'connected');

  return `
    <header class="topbar">
      <div class="topbar-left">
        <h1>${escapeHtml(s.schoolName)} — Tahun Ajaran ${escapeHtml(s.academicYear)}</h1>
        <p>
          Petugas Piket Tanggal <strong>${escapeHtml(formatDateID(state.selectedDate))}</strong>:
          <strong>${piketToday ? escapeHtml(piketToday.name) + ' (@' + escapeHtml(piketToday.username) + ')' : escapeHtml(state.currentUser.name)}</strong>
        </p>
      </div>
      <div class="topbar-right">
        <div class="sheet-status-pill ${fbConnected ? 'connected' : ''}" title="Database Firebase Firestore Real-Time Cloud">
          <span>🔥 ${fbConnected ? 'Firebase Cloud Aktif' : 'Firebase Ready'}</span>
        </div>
        <div class="sheet-status-pill ${hasSheet ? 'connected' : ''}">
          <span>${hasSheet ? '🟢 Spreadsheet Tertaut' : '⚪ Spreadsheet Belum Ditautkan'}</span>
          ${s.spreadsheetViewUrl ? `<a href="${escapeHtml(s.spreadsheetViewUrl)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;margin-left:4px;">Buka Sheet</a>` : ''}
        </div>
        <div class="date-pill">📅 ${escapeHtml(formatDateID(state.selectedDate))}</div>
      </div>
    </header>
  `;
}

function renderMainView() {
  switch (state.activeMenu) {
    case 'dashboard':
      return renderDashboardView();
    case 'absen-siswa':
      return renderStudentAttendanceView();
    case 'absen-guru':
      return renderTeacherAttendanceView();
    case 'rekap':
      return renderRekapView();
    case 'log-piket':
      return renderPiketLogView();
    case 'superadmin':
      return state.currentUser.role === 'superadmin'
        ? renderSuperadminView()
        : renderDashboardView();
    default:
      return renderDashboardView();
  }
}

// ============================================================================
// 1. DASHBOARD VIEW
// ============================================================================
function renderDashboardView() {
  const dt = state.selectedDate;
  const stuDay = db.studentAttendance[dt] || {};
  const tchDay = db.teacherAttendance[dt] || {};

  let stuH = 0, stuI = 0, stuS = 0, stuA = 0;
  db.students.forEach(s => {
    const rec = stuDay[s.id];
    if (!rec || rec.status === 'H') stuH++;
    else if (rec.status === 'I') stuI++;
    else if (rec.status === 'S') stuS++;
    else if (rec.status === 'A') stuA++;
  });

  let tchH = 0, tchI = 0, tchS = 0, tchA = 0;
  db.teachers.forEach(t => {
    const rec = tchDay[t.id];
    if (!rec || rec.status === 'H') tchH++;
    else if (rec.status === 'I') tchI++;
    else if (rec.status === 'S') tchS++;
    else if (rec.status === 'A') tchA++;
  });

  const stuPct = db.students.length ? Math.round((stuH / db.students.length) * 100) : 0;
  const tchPct = db.teachers.length ? Math.round((tchH / db.teachers.length) * 100) : 0;

  // Daftar siswa/guru yang Izin atau Sakit hari ini
  const absentStudents = db.students
    .filter(s => stuDay[s.id] && stuDay[s.id].status !== 'H')
    .map(s => ({ ...s, ...stuDay[s.id] }));

  const absentTeachers = db.teachers
    .filter(t => tchDay[t.id] && tchDay[t.id].status !== 'H')
    .map(t => ({ ...t, ...tchDay[t.id] }));

  const piketInfo = db.piketLogs[dt];

  return `
    <div class="toolbar">
      <div class="toolbar-filters">
        <div>
          <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Pilih Tanggal Pantauan</label>
          <input type="date" id="dash-date-picker" class="form-control" value="${escapeHtml(dt)}" />
        </div>
      </div>
      <div class="toolbar-actions">
        <button class="btn btn-maroon" data-goto="absen-siswa">🎓 Input Absen Siswa</button>
        <button class="btn btn-gold" data-goto="absen-guru">👨‍🏫 Input Absen Guru</button>
        <button class="btn btn-black" id="btn-sync-sheet-now">☁️ Simpan Harian ke Spreadsheet</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Kehadiran Siswa Hari Ini</span>
        <div class="stat-value">${stuPct}%</div>
        <div class="stat-meta">Hadir: ${stuH} | Izin: ${stuI} | Sakit: ${stuS} | Alpha: ${stuA} (Total ${db.students.length} Siswa)</div>
      </div>
      <div class="stat-card gold-accent">
        <span class="stat-label">Kehadiran Guru Hari Ini</span>
        <div class="stat-value">${tchPct}%</div>
        <div class="stat-meta">Hadir: ${tchH} | Izin: ${tchI} | Sakit: ${tchS} | Alpha: ${tchA} (Total ${db.teachers.length} Guru)</div>
      </div>
      <div class="stat-card black-accent">
        <span class="stat-label">Guru Piket Bertugas</span>
        <div class="stat-value" style="font-size:1.25rem;line-height:1.3;">${piketInfo ? escapeHtml(piketInfo.name) : escapeHtml(state.currentUser.name)}</div>
        <div class="stat-meta">Akun Login: @${piketInfo ? escapeHtml(piketInfo.username) : escapeHtml(state.currentUser.username)} • Update: ${piketInfo ? escapeHtml(piketInfo.lastUpdated) : 'Baru saja'}</div>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Rombel Aktif</span>
        <div class="stat-value">${db.rombels.length} Kelas</div>
        <div class="stat-meta">${db.rombels.join(', ')}</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="panel-card">
        <div class="panel-header">
          <div>
            <h3>📊 Grafik Kehadiran Siswa per Rombel (${escapeHtml(dt)})</h3>
            <p>Persentase siswa hadir, izin, sakit, dan alpha per kelas</p>
          </div>
        </div>
        <div class="panel-body">
          ${db.rombels.map(rombel => {
            const list = db.students.filter(s => s.rombel === rombel);
            const total = list.length || 1;
            let h = 0, i = 0, s = 0, a = 0;
            list.forEach(st => {
              const stRec = stuDay[st.id];
              const code = stRec ? stRec.status : 'H';
              if (code === 'H') h++;
              else if (code === 'I') i++;
              else if (code === 'S') s++;
              else if (code === 'A') a++;
            });
            const pct = Math.round((h / total) * 100);
            return `
              <div class="bar-row">
                <div class="bar-label">
                  <span>Kelas ${escapeHtml(rombel)} (${list.length} Siswa)</span>
                  <span>Hadir ${pct}% (H:${h} I:${i} S:${s} A:${a})</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill-h" style="width:${(h / total) * 100}%"></div>
                  <div class="bar-fill-i" style="width:${(i / total) * 100}%"></div>
                  <div class="bar-fill-s" style="width:${(s / total) * 100}%"></div>
                  <div class="bar-fill-a" style="width:${(a / total) * 100}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <div>
            <h3>📋 Daftar Tidak Hadir (Izin / Sakit / Alpha) Hari Ini</h3>
            <p>Keterangan ketidakhadiran siswa dan guru tanggal ${escapeHtml(dt)}</p>
          </div>
        </div>
        <div class="panel-body">
          <h4 style="color:var(--color-maroon);margin-bottom:8px;font-size:0.9rem;">A. Siswa Tidak Hadir (${absentStudents.length} Siswa)</h4>
          ${absentStudents.length === 0 ? `<p style="font-size:0.85rem;color:var(--color-text-muted);margin-bottom:16px;">Alhamdulillah, seluruh siswa hadir hari ini.</p>` : `
            <div class="table-responsive" style="margin-bottom:18px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nama Siswa</th>
                    <th>Rombel</th>
                    <th>Status</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  ${absentStudents.map(st => `
                    <tr>
                      <td><strong>${escapeHtml(st.name)}</strong></td>
                      <td><span class="badge badge-gold">${escapeHtml(st.rombel)}</span></td>
                      <td><span class="badge badge-${st.status}">${getStatusLabel(st.status)}</span></td>
                      <td>${escapeHtml(st.keterangan || '-')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}

          <h4 style="color:var(--color-maroon);margin-bottom:8px;font-size:0.9rem;">B. Guru Tidak Hadir (${absentTeachers.length} Guru)</h4>
          ${absentTeachers.length === 0 ? `<p style="font-size:0.85rem;color:var(--color-text-muted);">Seluruh dewan guru hadir hari ini.</p>` : `
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nama Guru</th>
                    <th>Mapel/Jabatan</th>
                    <th>Status</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  ${absentTeachers.map(tc => `
                    <tr>
                      <td><strong>${escapeHtml(tc.name)}</strong></td>
                      <td>${escapeHtml(tc.subject)}</td>
                      <td><span class="badge badge-${tc.status}">${getStatusLabel(tc.status)}</span></td>
                      <td>${escapeHtml(tc.keterangan || '-')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 2. ABSENSI SISWA PER ROMBEL VIEW
// ============================================================================
function renderStudentAttendanceView() {
  const dt = state.selectedDate;
  const rombel = state.selectedRombel;
  const dayRecords = db.studentAttendance[dt] || {};

  const studentsInRombel = db.students.filter(s => {
    const matchRombel = s.rombel === rombel;
    const matchSearch = !state.studentSearch ||
      s.name.toLowerCase().includes(state.studentSearch.toLowerCase()) ||
      s.nis.toLowerCase().includes(state.studentSearch.toLowerCase());
    return matchRombel && matchSearch;
  });

  // Cek petugas pencatat rombel ini
  const firstStudent = db.students.find(s => s.rombel === rombel);
  const sampleRecord = firstStudent ? dayRecords[firstStudent.id] : null;

  return `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>🎓 Absensi Siswa Per Rombel — Kelas ${escapeHtml(rombel)}</h3>
          <p>Pilih kelas/rombel, tandai kehadiran siswa, dan isi keterangan jika Izin (I) atau Sakit (S)</p>
        </div>
        <div>
          <span class="badge badge-gold">Petugas Piket Aktif: ${escapeHtml(state.currentUser.name)} (@${escapeHtml(state.currentUser.username)})</span>
        </div>
      </div>

      <div class="panel-body">
        <div style="margin-bottom:12px;font-size:0.85rem;font-weight:700;color:var(--color-maroon);">Pilih Rombel / Kelas:</div>
        <div class="rombel-chips">
          ${db.rombels.map(r => {
            const rStudents = db.students.filter(s => s.rombel === r);
            const isDone = rStudents.length > 0 && rStudents.every(s => Boolean(dayRecords[s.id]));
            return `
              <button type="button" class="rombel-chip ${r === rombel ? 'active' : ''} ${isDone ? 'done' : ''}" data-select-rombel="${escapeHtml(r)}">
                <span class="dot"></span>
                <span>Kelas ${escapeHtml(r)} (${rStudents.length})</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="toolbar">
          <div class="toolbar-filters">
            <div>
              <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Tanggal Absensi</label>
              <input type="date" id="stu-date-picker" class="form-control" value="${escapeHtml(dt)}" />
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Cari Nama / NIS Siswa</label>
              <input type="text" id="stu-search-input" class="form-control" placeholder="Ketik nama siswa..." value="${escapeHtml(state.studentSearch)}" />
            </div>
          </div>

          <div class="toolbar-actions">
            <button type="button" class="btn btn-outline" id="btn-mark-all-student-hadir">✅ Set Semua Hadir (${escapeHtml(rombel)})</button>
            <button type="button" class="btn btn-gold" id="btn-save-student-absen">💾 Simpan Absen Rombel ${escapeHtml(rombel)}</button>
          </div>
        </div>

        ${sampleRecord ? `
          <div style="margin-bottom:14px;padding:10px 14px;background:#FEF3C7;border-left:4px solid var(--color-gold-dark);border-radius:6px;font-size:0.84rem;">
            📌 Absensi Rombel <strong>${escapeHtml(rombel)}</strong> pada tanggal <strong>${escapeHtml(dt)}</strong> terakhir dicatat oleh Guru Piket:
            <strong>${escapeHtml(sampleRecord.recordedBy)}</strong> pukul <strong>${escapeHtml(sampleRecord.timestamp)}</strong>.
          </div>
        ` : ''}

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:50px;">No</th>
                <th style="width:100px;">NIS</th>
                <th>Nama Lengkap Siswa</th>
                <th style="width:60px;">L/P</th>
                <th style="width:310px;">Status Kehadiran</th>
                <th>Keterangan (Wajib diisi jika Izin / Sakit)</th>
              </tr>
            </thead>
            <tbody>
              ${studentsInRombel.map((stu, idx) => {
                const rec = dayRecords[stu.id] || { status: 'H', keterangan: '' };
                const needKet = rec.status === 'I' || rec.status === 'S' || rec.status === 'A';
                return `
                  <tr data-student-row="${escapeHtml(stu.id)}">
                    <td>${idx + 1}</td>
                    <td><code>${escapeHtml(stu.nis)}</code></td>
                    <td><strong>${escapeHtml(stu.name)}</strong></td>
                    <td>${escapeHtml(stu.gender)}</td>
                    <td>
                      <div class="status-selector">
                        <button type="button" class="status-pill-btn ${rec.status === 'H' ? 'active-H' : ''}" data-stu-status="${escapeHtml(stu.id)}" data-val="H">${escapeHtml(db.settings.ketHadirLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'I' ? 'active-I' : ''}" data-stu-status="${escapeHtml(stu.id)}" data-val="I">${escapeHtml(db.settings.ketIzinLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'S' ? 'active-S' : ''}" data-stu-status="${escapeHtml(stu.id)}" data-val="S">${escapeHtml(db.settings.ketSakitLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'A' ? 'active-A' : ''}" data-stu-status="${escapeHtml(stu.id)}" data-val="A">Alpha (A)</button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="ket-input ${needKet ? 'highlight-required' : ''}"
                        data-stu-ket="${escapeHtml(stu.id)}"
                        placeholder="${rec.status === 'I' ? 'Contoh: Izin acara keluarga...' : rec.status === 'S' ? 'Contoh: Sakit demam (Surat dokter)...' : 'Catatan tambahan (opsional)'}"
                        value="${escapeHtml(rec.keterangan || '')}"
                      />
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 3. ABSENSI DEWAN GURU VIEW
// ============================================================================
function renderTeacherAttendanceView() {
  const dt = state.selectedDate;
  const dayRecords = db.teacherAttendance[dt] || {};

  const filteredTeachers = db.teachers.filter(t => {
    if (!state.teacherSearch) return true;
    const q = state.teacherSearch.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.nip.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
  });

  const firstTeacher = db.teachers[0];
  const sampleRecord = firstTeacher ? dayRecords[firstTeacher.id] : null;

  return `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>👨‍🏫 Absensi Dewan Guru & Staf ${escapeHtml(db.settings.schoolName)}</h3>
          <p>Input kehadiran seluruh guru dan lengkapi keterangan jika Izin (I) atau Sakit (S)</p>
        </div>
        <div>
          <span class="badge badge-gold">Dicatat oleh Guru Piket: ${escapeHtml(state.currentUser.name)}</span>
        </div>
      </div>

      <div class="panel-body">
        <div class="toolbar">
          <div class="toolbar-filters">
            <div>
              <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Tanggal Absensi Guru</label>
              <input type="date" id="tch-date-picker" class="form-control" value="${escapeHtml(dt)}" />
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Cari Nama Guru / NIP / Mapel</label>
              <input type="text" id="tch-search-input" class="form-control" placeholder="Ketik nama guru..." value="${escapeHtml(state.teacherSearch)}" />
            </div>
          </div>

          <div class="toolbar-actions">
            <button type="button" class="btn btn-outline" id="btn-mark-all-teacher-hadir">✅ Set Semua Guru Hadir</button>
            <button type="button" class="btn btn-gold" id="btn-save-teacher-absen">💾 Simpan Absensi Guru</button>
          </div>
        </div>

        ${sampleRecord ? `
          <div style="margin-bottom:14px;padding:10px 14px;background:#FEF3C7;border-left:4px solid var(--color-gold-dark);border-radius:6px;font-size:0.84rem;">
            📌 Absensi Dewan Guru tanggal <strong>${escapeHtml(dt)}</strong> terakhir disimpan oleh Guru Piket:
            <strong>${escapeHtml(sampleRecord.recordedBy)}</strong> pukul <strong>${escapeHtml(sampleRecord.timestamp)}</strong>.
          </div>
        ` : ''}

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:50px;">No</th>
                <th style="width:170px;">NIP</th>
                <th>Nama Lengkap Guru</th>
                <th>Mata Pelajaran / Jabatan</th>
                <th style="width:310px;">Status Kehadiran</th>
                <th>Keterangan Izin / Sakit / Tugas</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTeachers.map((tch, idx) => {
                const rec = dayRecords[tch.id] || { status: 'H', keterangan: '' };
                const needKet = rec.status !== 'H';
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><code>${escapeHtml(tch.nip)}</code></td>
                    <td><strong>${escapeHtml(tch.name)}</strong></td>
                    <td>${escapeHtml(tch.subject)}</td>
                    <td>
                      <div class="status-selector">
                        <button type="button" class="status-pill-btn ${rec.status === 'H' ? 'active-H' : ''}" data-tch-status="${escapeHtml(tch.id)}" data-val="H">${escapeHtml(db.settings.ketHadirLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'I' ? 'active-I' : ''}" data-tch-status="${escapeHtml(tch.id)}" data-val="I">${escapeHtml(db.settings.ketIzinLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'S' ? 'active-S' : ''}" data-tch-status="${escapeHtml(tch.id)}" data-val="S">${escapeHtml(db.settings.ketSakitLabel)}</button>
                        <button type="button" class="status-pill-btn ${rec.status === 'A' ? 'active-A' : ''}" data-tch-status="${escapeHtml(tch.id)}" data-val="A">Alpha (A)</button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="ket-input ${needKet ? 'highlight-required' : ''}"
                        data-tch-ket="${escapeHtml(tch.id)}"
                        placeholder="${rec.status === 'I' ? 'Contoh: Izin Dinas Luar / Keperluan Keluarga...' : rec.status === 'S' ? 'Contoh: Sakit (Surat Dokter)...' : 'Keterangan tambahan'}"
                        value="${escapeHtml(rec.keterangan || '')}"
                      />
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 4. REKAPITULASI MINGGUAN & BULANAN VIEW
// ============================================================================
function getDatesBetween(startISO, endISO) {
  const result = [];
  if (!startISO || !endISO || startISO > endISO) return [startISO];
  let curr = startISO;
  let guard = 0;
  while (curr <= endISO && guard < 62) {
    result.push(curr);
    curr = addDaysISO(curr, 1);
    guard++;
  }
  return result;
}

function getDatesInMonth(yearMonth) {
  const [y, m] = yearMonth.split('-').map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const dates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    dates.push(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return dates;
}

function renderRekapView() {
  const isWeekly = state.rekapTab === 'mingguan';
  const activeDates = isWeekly
    ? getDatesBetween(state.rekapWeekStart, state.rekapWeekEnd)
    : getDatesInMonth(state.rekapMonth).filter(d => Boolean(db.studentAttendance[d] || db.teacherAttendance[d]));

  // Hitung rekap data
  const isSiswa = state.rekapTarget === 'siswa';
  const items = isSiswa
    ? db.students.filter(s => state.rekapRombel === 'ALL' || s.rombel === state.rekapRombel)
    : db.teachers;

  const recapRows = items.map(person => {
    let H = 0, I = 0, S = 0, A = 0;
    const notes = [];
    activeDates.forEach(d => {
      const table = isSiswa ? db.studentAttendance[d] : db.teacherAttendance[d];
      const rec = table ? table[person.id] : null;
      if (!rec) return;
      if (rec.status === 'H') H++;
      else if (rec.status === 'I') {
        I++;
        notes.push(`${d.slice(8, 10)}/${d.slice(5, 7)} (Izin: ${rec.keterangan || '-'})`);
      } else if (rec.status === 'S') {
        S++;
        notes.push(`${d.slice(8, 10)}/${d.slice(5, 7)} (Sakit: ${rec.keterangan || '-'})`);
      } else if (rec.status === 'A') {
        A++;
        notes.push(`${d.slice(8, 10)}/${d.slice(5, 7)} (Alpha)`);
      }
    });
    const totalDays = H + I + S + A;
    const pct = totalDays > 0 ? Math.round((H / totalDays) * 100) : 100;
    return {
      ...person,
      H, I, S, A,
      totalDays,
      pct,
      notesText: notes.join('; ')
    };
  });

  const totalH = recapRows.reduce((acc, r) => acc + r.H, 0);
  const totalI = recapRows.reduce((acc, r) => acc + r.I, 0);
  const totalS = recapRows.reduce((acc, r) => acc + r.S, 0);
  const totalA = recapRows.reduce((acc, r) => acc + r.A, 0);
  const grandTotal = totalH + totalI + totalS + totalA;
  const avgPct = grandTotal > 0 ? Math.round((totalH / grandTotal) * 100) : 100;

  return `
    <div class="panel-card">
      <div class="panel-header">
        <div style="display:flex;align-items:center;gap:12px;">
          ${renderLogoHTML(true)}
          <div>
            <h3>📅 Dashboard Rekapitulasi Absensi Perminggu & Perbulan</h3>
            <p>${escapeHtml(db.settings.schoolName)} — ${escapeHtml(db.settings.schoolAddress || '')}</p>
          </div>
        </div>
        <div class="no-print" style="display:flex;gap:8px;">
          <button type="button" class="btn btn-gold btn-sm" id="btn-export-rekap-csv">📥 Unduh Excel (CSV)</button>
          <button type="button" class="btn btn-black btn-sm" id="btn-print-rekap">🖨️ Cetak Laporan</button>
        </div>
      </div>

      <div class="panel-body">
        <div class="subtabs">
          <button type="button" class="subtab-btn ${state.rekapTab === 'mingguan' ? 'active' : ''}" data-rekap-tab="mingguan">
            📆 Rekap Perminggu (Mingguan)
          </button>
          <button type="button" class="subtab-btn ${state.rekapTab === 'bulanan' ? 'active' : ''}" data-rekap-tab="bulanan">
            🗓️ Rekap Perbulan (Bulanan)
          </button>
        </div>

        <div class="toolbar">
          <div class="toolbar-filters">
            <div>
              <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Kategori Rekap</label>
              <select id="rekap-target-select" class="form-control">
                <option value="siswa" ${state.rekapTarget === 'siswa' ? 'selected' : ''}>🎓 Rekap Absensi Siswa</option>
                <option value="guru" ${state.rekapTarget === 'guru' ? 'selected' : ''}>👨‍🏫 Rekap Absensi Dewan Guru</option>
              </select>
            </div>

            ${state.rekapTarget === 'siswa' ? `
              <div>
                <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Filter Rombel</label>
                <select id="rekap-rombel-select" class="form-control">
                  <option value="ALL" ${state.rekapRombel === 'ALL' ? 'selected' : ''}>Semua Rombel (${db.rombels.length} Kelas)</option>
                  ${db.rombels.map(r => `<option value="${escapeHtml(r)}" ${state.rekapRombel === r ? 'selected' : ''}>Kelas ${escapeHtml(r)}</option>`).join('')}
                </select>
              </div>
            ` : ''}

            ${isWeekly ? `
              <div>
                <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Dari Tanggal (Awal Minggu)</label>
                <input type="date" id="rekap-week-start" class="form-control" value="${escapeHtml(state.rekapWeekStart)}" />
              </div>
              <div>
                <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Sampai Tanggal (Akhir Minggu)</label>
                <input type="date" id="rekap-week-end" class="form-control" value="${escapeHtml(state.rekapWeekEnd)}" />
              </div>
            ` : `
              <div>
                <label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Pilih Bulan & Tahun</label>
                <input type="month" id="rekap-month-picker" class="form-control" value="${escapeHtml(state.rekapMonth)}" />
              </div>
            `}
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Rata-Rata Kehadiran (${isWeekly ? 'Mingguan' : 'Bulanan'})</span>
            <div class="stat-value">${avgPct}%</div>
            <div class="stat-meta">Total Hari Tercatat: ${activeDates.length} Hari Aktif</div>
          </div>
          <div class="stat-card gold-accent">
            <span class="stat-label">Total Akumulasi Hadir (H)</span>
            <div class="stat-value">${totalH}</div>
            <div class="stat-meta">Kejadian kehadiran tepat waktu</div>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Izin (I) & Sakit (S)</span>
            <div class="stat-value">${totalI + totalS}</div>
            <div class="stat-meta">Rincian: ${totalI} Izin • ${totalS} Sakit</div>
          </div>
          <div class="stat-card black-accent">
            <span class="stat-label">Total Alpha (A)</span>
            <div class="stat-value">${totalA}</div>
            <div class="stat-meta">Tanpa keterangan</div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:45px;">No</th>
                <th>${isSiswa ? 'NIS' : 'NIP'}</th>
                <th>Nama Lengkap ${isSiswa ? 'Siswa' : 'Guru'}</th>
                <th>${isSiswa ? 'Rombel' : 'Mata Pelajaran / Jabatan'}</th>
                <th style="text-align:center;">Hadir (H)</th>
                <th style="text-align:center;">Izin (I)</th>
                <th style="text-align:center;">Sakit (S)</th>
                <th style="text-align:center;">Alpha (A)</th>
                <th style="text-align:center;">% Hadir</th>
                <th>Riwayat Keterangan (Izin / Sakit)</th>
              </tr>
            </thead>
            <tbody>
              ${recapRows.map((r, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td><code>${escapeHtml(isSiswa ? r.nis : r.nip)}</code></td>
                  <td><strong>${escapeHtml(r.name)}</strong></td>
                  <td>${escapeHtml(isSiswa ? r.rombel : r.subject)}</td>
                  <td style="text-align:center;"><span class="badge badge-H">${r.H}</span></td>
                  <td style="text-align:center;"><span class="badge badge-I">${r.I}</span></td>
                  <td style="text-align:center;"><span class="badge badge-S">${r.S}</span></td>
                  <td style="text-align:center;"><span class="badge badge-A">${r.A}</span></td>
                  <td style="text-align:center;"><strong>${r.pct}%</strong></td>
                  <td style="font-size:0.82rem;color:var(--color-text-muted);">${escapeHtml(r.notesText || 'Hadir penuh')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-top:24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;padding-top:16px;border-top:1px solid var(--color-border);font-size:0.86rem;">
          <div>
            <div>Mengetahui,</div>
            <div>Kepala ${escapeHtml(db.settings.schoolName)}</div>
            <br /><br />
            <div><strong><u>${escapeHtml(db.settings.headmasterName)}</u></strong></div>
            <div>NIP. ${escapeHtml(db.settings.headmasterNip)}</div>
          </div>
          <div>
            <div>Dicetak pada: ${escapeHtml(formatDateID(getTodayISO()))}</div>
            <div>Petugas Guru Piket / Admin</div>
            <br /><br />
            <div><strong><u>${escapeHtml(state.currentUser.name)}</u></strong></div>
            <div>Akun Login: @${escapeHtml(state.currentUser.username)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 5. LOG PETUGAS GURU PIKET HARIAN VIEW
// ============================================================================
function renderPiketLogView() {
  const dt = state.selectedDate;
  const currentLog = db.piketLogs[dt] || {
    date: dt,
    username: state.currentUser.username,
    name: state.currentUser.name,
    role: state.currentUser.role === 'superadmin' ? 'Superadmin' : 'Guru Piket Harian',
    loginTime: '07:00 WIB',
    lastUpdated: 'Baru saja',
    note: ''
  };

  const allLogs = Object.values(db.piketLogs).sort((a, b) => (a.date < b.date ? 1 : -1));

  return `
    <div class="grid-2">
      <div class="panel-card">
        <div class="panel-header">
          <div>
            <h3>📝 Form Buku Piket Harian (${escapeHtml(dt)})</h3>
            <p>Otomatis mencatat akun Guru Piket yang sedang login bertugas hari ini</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label>Tanggal Piket</label>
            <input type="date" id="piket-date-picker" class="form-control" value="${escapeHtml(dt)}" />
          </div>
          <div class="form-group">
            <label>Nama Guru Piket (Otomatis dari Akun Login)</label>
            <input type="text" class="form-control" value="${escapeHtml(state.currentUser.name)} (@${escapeHtml(state.currentUser.username)})" readonly style="background:var(--color-bg);font-weight:700;" />
          </div>
          <div class="form-group">
            <label>Catatan Kejadian / Jurnal Piket Harian</label>
            <textarea id="piket-note-input" rows="4" class="form-control" placeholder="Tulis catatan piket hari ini (misal: kondisi KBM, tamu sekolah, kejadian khusus)...">${escapeHtml(currentLog.note || '')}</textarea>
          </div>
          <button type="button" class="btn btn-maroon" id="btn-save-piket-log">💾 Simpan Jurnal Guru Piket</button>
        </div>
      </div>

      <div class="panel-card">
        <div class="panel-header">
          <div>
            <h3>📜 Riwayat Pelaksanaan Guru Piket Harian</h3>
            <p>Rekam jejak siapa yang melaksanakan piket berdasarkan akun login</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Guru Piket</th>
                  <th>Akun Login</th>
                  <th>Jam Aktif</th>
                  <th>Catatan Piket</th>
                </tr>
              </thead>
              <tbody>
                ${allLogs.map(log => `
                  <tr>
                    <td><strong>${escapeHtml(log.date)}</strong></td>
                    <td>${escapeHtml(log.name)}</td>
                    <td><span class="badge badge-gold">@${escapeHtml(log.username)}</span></td>
                    <td>${escapeHtml(log.lastUpdated || log.loginTime)}</td>
                    <td>${escapeHtml(log.note || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 6. SUPERADMIN PANEL (TEMA, EDIT SEMUA KETERANGAN, SPREADSHEET, MASTER DATA)
// ============================================================================
function renderSuperadminView() {
  const s = db.settings;
  const tab = state.superadminTab;

  return `
    <div class="panel-card">
      <div class="panel-header">
        <div>
          <h3>⚙️ Panel Kontrol Superadmin — ${escapeHtml(s.schoolName)}</h3>
          <p>Hak akses penuh: Ubah tema warna, edit seluruh keterangan sistem, kelola rombel/siswa/guru/akun piket, dan tautkan Google Spreadsheet</p>
        </div>
      </div>

      <div class="panel-body">
        <div class="subtabs">
          <button type="button" class="subtab-btn ${tab === 'tema' ? 'active' : ''}" data-super-tab="tema">🎨 Ubah Tema & Warna</button>
          <button type="button" class="subtab-btn ${tab === 'keterangan' ? 'active' : ''}" data-super-tab="keterangan">✏️ Edit Semua Keterangan Sistem</button>
          <button type="button" class="subtab-btn ${tab === 'firebase' ? 'active' : ''}" data-super-tab="firebase">🔥 Database Firebase Cloud</button>
          <button type="button" class="subtab-btn ${tab === 'spreadsheet' ? 'active' : ''}" data-super-tab="spreadsheet">🟢 Tautkan Link Spreadsheet</button>
          <button type="button" class="subtab-btn ${tab === 'master-siswa' ? 'active' : ''}" data-super-tab="master-siswa">🎓 Kelola Rombel & Siswa</button>
          <button type="button" class="subtab-btn ${tab === 'master-guru' ? 'active' : ''}" data-super-tab="master-guru">👨‍🏫 Kelola Data Guru</button>
          <button type="button" class="subtab-btn ${tab === 'master-akun' ? 'active' : ''}" data-super-tab="master-akun">🔐 Kelola Akun Guru Piket</button>
        </div>

        ${tab === 'tema' ? renderSuperThemeTab() : ''}
        ${tab === 'keterangan' ? renderSuperKeteranganTab() : ''}
        ${tab === 'firebase' ? renderSuperFirebaseTab() : ''}
        ${tab === 'spreadsheet' ? renderSuperSpreadsheetTab() : ''}
        ${tab === 'master-siswa' ? renderSuperSiswaTab() : ''}
        ${tab === 'master-guru' ? renderSuperGuruTab() : ''}
        ${tab === 'master-akun' ? renderSuperAkunTab() : ''}
      </div>
    </div>
  `;
}

function renderSuperThemeTab() {
  const t = db.settings.theme;
  return `
    <h4 style="color:var(--color-maroon);margin-bottom:12px;">1. Pilih Preset Perpaduan Warna Maroon, Putih, Gold, dan Hitam</h4>
    <div class="theme-presets">
      <div class="theme-card ${t.preset === 'classic-maroon-gold' ? 'active' : ''}" data-theme-preset="classic-maroon-gold">
        <div class="swatches">
          <span class="swatch" style="background:#7A0C1E;"></span>
          <span class="swatch" style="background:#D4AF37;"></span>
          <span class="swatch" style="background:#FFFFFF;"></span>
          <span class="swatch" style="background:#121214;"></span>
        </div>
        <strong>Classic Maroon & Royal Gold</strong>
        <p style="font-size:0.78rem;color:var(--color-text-muted);">Standar resmi SMP Dyah Pithaloka</p>
      </div>

      <div class="theme-card ${t.preset === 'imperial-crimson-gold' ? 'active' : ''}" data-theme-preset="imperial-crimson-gold">
        <div class="swatches">
          <span class="swatch" style="background:#5C0614;"></span>
          <span class="swatch" style="background:#F3C623;"></span>
          <span class="swatch" style="background:#FAF8F5;"></span>
          <span class="swatch" style="background:#0B0B0D;"></span>
        </div>
        <strong>Imperial Deep Maroon & Bright Gold</strong>
        <p style="font-size:0.78rem;color:var(--color-text-muted);">Kontras tegas dengan aksen emas cerah</p>
      </div>

      <div class="theme-card ${t.preset === 'obsidian-gold-maroon' ? 'active' : ''}" data-theme-preset="obsidian-gold-maroon">
        <div class="swatches">
          <span class="swatch" style="background:#8E162A;"></span>
          <span class="swatch" style="background:#E5B842;"></span>
          <span class="swatch" style="background:#F4F1EA;"></span>
          <span class="swatch" style="background:#18181B;"></span>
        </div>
        <strong>Obsidian Black, Ruby Maroon & Gold</strong>
        <p style="font-size:0.78rem;color:var(--color-text-muted);">Dominasi hitam elegan & maroon hangat</p>
      </div>
    </div>

    <h4 style="color:var(--color-maroon);margin-bottom:12px;">2. Kustomisasi Warna Manual (HEX Color Picker)</h4>
    <div class="grid-2">
      <div class="form-group">
        <label>Warna Utama Maroon</label>
        <input type="color" id="theme-maroon" class="form-control" style="height:46px;" value="${escapeHtml(t.maroon)}" />
      </div>
      <div class="form-group">
        <label>Warna Aksen Gold (Emas)</label>
        <input type="color" id="theme-gold" class="form-control" style="height:46px;" value="${escapeHtml(t.gold)}" />
      </div>
      <div class="form-group">
        <label>Warna Hitam (Header/Sidebar)</label>
        <input type="color" id="theme-black" class="form-control" style="height:46px;" value="${escapeHtml(t.black)}" />
      </div>
      <div class="form-group">
        <label>Warna Latar Putih / Ivory</label>
        <input type="color" id="theme-bg" class="form-control" style="height:46px;" value="${escapeHtml(t.bg)}" />
      </div>
    </div>
    <button type="button" class="btn btn-maroon" id="btn-save-custom-theme">💾 Terapkan & Simpan Tema</button>
  `;
}

function renderSuperKeteranganTab() {
  const s = db.settings;
  return `
    <div class="panel-card" style="margin-bottom:20px;border:2px solid var(--color-gold);">
      <div class="panel-header">
        <div>
          <h3>🏫 Pengaturan Logo & Identitas Brand Sekolah</h3>
          <p>Ubah logo sekolah dengan unggah foto/gambar dari komputer atau masukkan link URL gambar</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid-2" style="align-items:center;">
          <div>
            <div class="form-group">
              <label>Pilih File Logo dari Komputer (PNG / JPG / SVG / WebP)</label>
              <input type="file" id="set-schoolLogoFile" class="form-control" accept="image/*" />
              <small style="color:var(--color-text-muted);">Logo akan langsung disimpan ke browser & otomatis tampil di header, login, sidebar, serta laporan cetak.</small>
            </div>
            <div class="form-group">
              <label>Atau Gunakan Tautan URL Gambar Logo</label>
              <input type="url" id="set-schoolLogoUrl" class="form-control" placeholder="https://contoh.com/logo.png" value="${escapeHtml(s.schoolLogo || '')}" />
            </div>
            <div class="form-group">
              <label>Inisial / Singkatan Teks Logo (Jika gambar tidak diunggah)</label>
              <input type="text" id="set-schoolLogoText" class="form-control" maxlength="4" placeholder="Contoh: DP" value="${escapeHtml(s.schoolLogoText || 'DP')}" />
            </div>
            <div style="display:flex;gap:10px;">
              <button type="button" class="btn btn-maroon btn-sm" id="btn-save-logo-only">Simpan Pengaturan Logo</button>
              <button type="button" class="btn btn-outline btn-sm" id="btn-reset-logo">Kembalikan Logo Awal (Inisial)</button>
            </div>
          </div>
          <div style="text-align:center;padding:16px;background:var(--color-bg);border:1px dashed var(--color-gold);border-radius:12px;">
            <div style="font-size:0.85rem;font-weight:700;color:var(--color-maroon);margin-bottom:10px;">Preview Logo Sekolah Saat Ini:</div>
            <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:8px;">
              <div>
                <div style="font-size:0.75rem;color:var(--color-text-muted);margin-bottom:4px;">Ukuran Besar (Login)</div>
                <div style="margin:0 auto;" id="logo-preview-large">${renderLogoHTML(false)}</div>
              </div>
              <div>
                <div style="font-size:0.75rem;color:var(--color-text-muted);margin-bottom:4px;">Ukuran Header/Sidebar</div>
                <div style="margin:0 auto;" id="logo-preview-small">${renderLogoHTML(true)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Identitas & Keterangan Utama Sekolah</h4>
        <div class="form-group">
          <label>Nama Lengkap Sekolah</label>
          <input type="text" id="set-schoolName" class="form-control" value="${escapeHtml(s.schoolName)}" />
        </div>
        <div class="form-group">
          <label>Sub-Judul / Keterangan Sistem</label>
          <input type="text" id="set-systemSubtitle" class="form-control" value="${escapeHtml(s.systemSubtitle)}" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Tahun Ajaran</label>
            <input type="text" id="set-academicYear" class="form-control" value="${escapeHtml(s.academicYear)}" />
          </div>
          <div class="form-group">
            <label>Semester</label>
            <input type="text" id="set-semester" class="form-control" value="${escapeHtml(s.semester)}" />
          </div>
        </div>
        <div class="form-group">
          <label>Nama Kepala Sekolah</label>
          <input type="text" id="set-headmasterName" class="form-control" value="${escapeHtml(s.headmasterName)}" />
        </div>
        <div class="form-group">
          <label>NIP Kepala Sekolah</label>
          <input type="text" id="set-headmasterNip" class="form-control" value="${escapeHtml(s.headmasterNip)}" />
        </div>
        <div class="form-group">
          <label>Alamat Lengkap Sekolah</label>
          <input type="text" id="set-schoolAddress" class="form-control" value="${escapeHtml(s.schoolAddress)}" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>No. Telepon Sekolah</label>
            <input type="text" id="set-schoolPhone" class="form-control" value="${escapeHtml(s.schoolPhone || '')}" />
          </div>
          <div class="form-group">
            <label>Email Resmi Sekolah</label>
            <input type="email" id="set-schoolEmail" class="form-control" value="${escapeHtml(s.schoolEmail || '')}" />
          </div>
        </div>
      </div>

      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Label Status & Template Keterangan Absensi</h4>
        <div class="form-group">
          <label>Label Tombol Hadir</label>
          <input type="text" id="set-ketHadirLabel" class="form-control" value="${escapeHtml(s.ketHadirLabel)}" />
        </div>
        <div class="form-group">
          <label>Label Tombol Izin</label>
          <input type="text" id="set-ketIzinLabel" class="form-control" value="${escapeHtml(s.ketIzinLabel)}" />
        </div>
        <div class="form-group">
          <label>Label Tombol Sakit</label>
          <input type="text" id="set-ketSakitLabel" class="form-control" value="${escapeHtml(s.ketSakitLabel)}" />
        </div>
        <div class="form-group">
          <label>Label Tombol Alpha / Tanpa Keterangan</label>
          <input type="text" id="set-ketAlphaLabel" class="form-control" value="${escapeHtml(s.ketAlphaLabel || 'Alpha / Tanpa Ket (A)')}" />
        </div>
        <div class="form-group">
          <label>Preset Pilihan Cepat Keterangan Izin (Pisahkan dengan koma)</label>
          <textarea id="set-defaultIzinPresets" rows="2" class="form-control">${escapeHtml(s.defaultIzinPresets)}</textarea>
        </div>
        <div class="form-group">
          <label>Preset Pilihan Cepat Keterangan Sakit (Pisahkan dengan koma)</label>
          <textarea id="set-defaultSakitPresets" rows="2" class="form-control">${escapeHtml(s.defaultSakitPresets)}</textarea>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-gold" id="btn-save-all-keterangan" style="padding:12px 24px;font-size:0.95rem;">💾 Simpan Semua Perubahan Keterangan & Identitas Sekolah</button>
  `;
}

function renderSuperFirebaseTab() {
  const isReady = Boolean(window.FirebaseBridge && window.FirebaseBridge.db);
  const status = window.FirebaseBridge ? window.FirebaseBridge.status : 'offline';

  return `
    <div class="panel-card" style="border:2px solid var(--color-gold);">
      <div class="panel-header">
        <div>
          <h3>🔥 Konfigurasi & Status Firebase Cloud Database</h3>
          <p>Koneksi real-time cloud untuk sinkronisasi otomatis absensi guru & siswa SMP Dyah Pithaloka</p>
        </div>
        <div>
          <span class="badge ${isReady ? 'badge-gold' : 'badge-maroon'}">Status: ${isReady ? 'Online & Terhubung' : 'Memuat / Offline'}</span>
        </div>
      </div>

      <div class="panel-body">
        <div class="grid-2">
          <div>
            <h4 style="color:var(--color-maroon);margin-bottom:10px;">Detail Akun Firebase</h4>
            <div style="background:var(--color-bg);border:1px solid var(--color-border);padding:14px;border-radius:8px;font-size:0.86rem;margin-bottom:16px;">
              <div><strong>Project ID:</strong> <code>absensi-guru-dan-murid</code></div>
              <div><strong>Auth Domain:</strong> <code>absensi-guru-dan-murid.firebaseapp.com</code></div>
              <div><strong>Storage Bucket:</strong> <code>absensi-guru-dan-murid.firebasestorage.app</code></div>
              <div><strong>App ID:</strong> <code>1:1045221747993:web:4d7d752230380e0af56988</code></div>
              <div><strong>Measurement ID:</strong> <code>G-VG3RDQK7VK</code></div>
            </div>

            <h4 style="color:var(--color-maroon);margin-bottom:10px;">Aksi Sinkronisasi Manual</h4>
            <p style="font-size:0.84rem;color:var(--color-text-muted);margin-bottom:12px;">
              Secara default, setiap aksi simpan absensi atau perubahan data sekolah akan langsung disinkronkan secara otomatis ke Firebase.
              Anda juga dapat memaksa unggah atau unduh ulang data melalui tombol di bawah:
            </p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn btn-maroon" id="btn-force-upload-firebase">⬆️ Paksa Unggah Data Lokal ke Firebase</button>
              <button type="button" class="btn btn-gold" id="btn-force-download-firebase">⬇️ Unduh Data Terbaru dari Firebase</button>
            </div>
          </div>

          <div>
            <h4 style="color:var(--color-maroon);margin-bottom:10px;">Status Sinkronisasi Real-Time</h4>
            <div style="padding:14px;background:#F8F6F4;border-left:4px solid var(--color-gold);border-radius:8px;font-size:0.85rem;line-height:1.6;">
              <p>✅ <strong>Real-time Listener:</strong> Aktif. Jika guru piket di perangkat lain menyimpan data, tampilan akan langsung diperbarui otomatis tanpa reload.</p>
              <p>✅ <strong>Offline Fallback:</strong> Sistem tetap menyimpan data di penyimpanan lokal (browser) sehingga tidak ada data yang hilang meskipun koneksi internet terputus.</p>
              <p>✅ <strong>Koleksi Firestore:</strong> <code>absensi_dyah_pithaloka/main_database</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSuperSpreadsheetTab() {
  const s = db.settings;
  return `
    <div class="grid-2">
      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Tautan Google Spreadsheet Penyimpanan Harian</h4>
        <div class="form-group">
          <label>1. Link Google Spreadsheet (URL View/Edit Spreadsheet)</label>
          <input type="url" id="sheet-view-url" class="form-control" placeholder="https://docs.google.com/spreadsheets/d/..." value="${escapeHtml(s.spreadsheetViewUrl)}" />
          <small style="color:var(--color-text-muted);">Link ini menampilkan tombol pintasan "Buka Sheet" di pojok kanan atas aplikasi.</small>
        </div>

        <div class="form-group">
          <label>2. URL Web App Google Apps Script (Untuk Kirim Otomatis Harian)</label>
          <input type="url" id="sheet-webhook-url" class="form-control" placeholder="https://script.google.com/macros/s/.../exec" value="${escapeHtml(s.spreadsheetWebhookUrl)}" />
          <small style="color:var(--color-text-muted);">Saat Guru Piket menekan tombol Simpan Absensi, data otomatis dikirim ke Google Spreadsheet ini.</small>
        </div>

        <div class="form-group" style="display:flex;align-items:center;gap:10px;">
          <input type="checkbox" id="sheet-autosync" ${s.autoSyncSpreadsheet ? 'checked' : ''} style="width:18px;height:18px;" />
          <label for="sheet-autosync" style="margin:0;">Otomatis kirim ke Google Spreadsheet setiap kali Guru Piket menyimpan absensi</label>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">
          <button type="button" class="btn btn-maroon" id="btn-save-sheet-config">💾 Simpan Tautan Spreadsheet</button>
          <button type="button" class="btn btn-gold" id="btn-test-sync-sheet">🚀 Kirim Data Hari Ini ke Spreadsheet Sekarang</button>
        </div>
      </div>

      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Kode Google Apps Script (Sudah Tersedia juga di file Code.gs)</h4>
        <p style="font-size:0.84rem;color:var(--color-text-muted);margin-bottom:10px;">
          Buka Google Spreadsheet Anda &rarr; klik <strong>Extensions &gt; Apps Script</strong> &rarr; tempelkan kode di bawah ini atau dari file <code>Code.gs</code>, lalu klik <strong>Deploy &gt; New Deployment (Web App)</strong>:
        </p>
        <pre class="code-block">function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Otomatis menyimpan ke sheet:
  // 1. Log_Guru_Piket
  // 2. Absensi_Siswa
  // 3. Absensi_Guru
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}</pre>
      </div>
    </div>
  `;
}

function renderSuperSiswaTab() {
  return `
    <div class="grid-2">
      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Kelola Daftar Rombel / Kelas</h4>
        <div style="display:flex;gap:8px;margin-bottom:14px;">
          <input type="text" id="new-rombel-name" class="form-control" placeholder="Nama Rombel baru (misal: VII-C)" />
          <button type="button" class="btn btn-maroon" id="btn-add-rombel">+ Tambah Rombel</button>
        </div>
        <div class="rombel-chips">
          ${db.rombels.map(r => `
            <div class="rombel-chip">
              <span>Kelas ${escapeHtml(r)}</span>
              <button type="button" class="btn btn-sm" style="padding:2px 6px;background:#FEE2E2;color:#B91C1C;" data-del-rombel="${escapeHtml(r)}">✕</button>
            </div>
          `).join('')}
        </div>

        <hr style="margin:20px 0;border:none;border-top:1px solid var(--color-border);" />

        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Tambah Siswa Baru</h4>
        <div class="form-group">
          <label>NIS Siswa</label>
          <input type="text" id="new-stu-nis" class="form-control" placeholder="Contoh: 240799" />
        </div>
        <div class="form-group">
          <label>Nama Lengkap Siswa</label>
          <input type="text" id="new-stu-name" class="form-control" placeholder="Nama lengkap siswa..." />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label>Jenis Kelamin</label>
            <select id="new-stu-gender" class="form-control">
              <option value="L">Laki-laki (L)</option>
              <option value="P">Perempuan (P)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Rombel / Kelas</label>
            <select id="new-stu-rombel" class="form-control">
              ${db.rombels.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('')}
            </select>
          </div>
        </div>
        <button type="button" class="btn btn-gold" id="btn-add-student">+ Simpan Siswa Baru</button>
      </div>

      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Daftar Seluruh Siswa (${db.students.length} Siswa)</h4>
        <div class="table-responsive" style="max-height:420px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Rombel</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${db.students.map(s => `
                <tr>
                  <td><code>${escapeHtml(s.nis)}</code></td>
                  <td>${escapeHtml(s.name)}</td>
                  <td><span class="badge badge-gold">${escapeHtml(s.rombel)}</span></td>
                  <td style="display:flex;gap:6px;">
                    <button type="button" class="btn btn-sm btn-outline" data-edit-student="${escapeHtml(s.id)}">Edit</button>
                    <button type="button" class="btn btn-sm" style="background:#FEE2E2;color:#B91C1C;" data-del-student="${escapeHtml(s.id)}">Hapus</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSuperGuruTab() {
  return `
    <div class="grid-2">
      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Tambah Guru / Staf Baru</h4>
        <div class="form-group">
          <label>NIP</label>
          <input type="text" id="new-tch-nip" class="form-control" placeholder="Nomor Induk Pegawai..." />
        </div>
        <div class="form-group">
          <label>Nama Lengkap Guru & Gelar</label>
          <input type="text" id="new-tch-name" class="form-control" placeholder="Contoh: Budi Santoso, S.Pd" />
        </div>
        <div class="form-group">
          <label>Mata Pelajaran / Jabatan</label>
          <input type="text" id="new-tch-subject" class="form-control" placeholder="Contoh: Matematika / Wali Kelas" />
        </div>
        <button type="button" class="btn btn-gold" id="btn-add-teacher">+ Simpan Data Guru</button>
      </div>

      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Daftar Dewan Guru (${db.teachers.length} Guru)</h4>
        <div class="table-responsive" style="max-height:420px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>NIP</th>
                <th>Nama Guru</th>
                <th>Mata Pelajaran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${db.teachers.map(t => `
                <tr>
                  <td><code>${escapeHtml(t.nip)}</code></td>
                  <td><strong>${escapeHtml(t.name)}</strong></td>
                  <td>${escapeHtml(t.subject)}</td>
                  <td style="display:flex;gap:6px;">
                    <button type="button" class="btn btn-sm btn-outline" data-edit-teacher="${escapeHtml(t.id)}">Edit</button>
                    <button type="button" class="btn btn-sm" style="background:#FEE2E2;color:#B91C1C;" data-del-teacher="${escapeHtml(t.id)}">Hapus</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSuperAkunTab() {
  return `
    <div class="grid-2">
      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Tambah Akun Login Guru Piket / Admin</h4>
        <div class="form-group">
          <label>Nama Lengkap Guru Piket</label>
          <input type="text" id="new-acc-name" class="form-control" placeholder="Contoh: Ratna Sari Dewi, S.Pd" />
        </div>
        <div class="form-group">
          <label>Username Login</label>
          <input type="text" id="new-acc-username" class="form-control" placeholder="Contoh: piket4" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="text" id="new-acc-password" class="form-control" placeholder="Masukkan password..." value="123" />
        </div>
        <div class="form-group">
          <label>Jadwal Hari Piket</label>
          <input type="text" id="new-acc-schedule" class="form-control" placeholder="Contoh: Kamis & Sabtu" />
        </div>
        <div class="form-group">
          <label>Peran Akun</label>
          <select id="new-acc-role" class="form-control">
            <option value="piket">Guru Piket Harian (Admin Harian)</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <button type="button" class="btn btn-gold" id="btn-add-user">+ Tambah Akun Login</button>
      </div>

      <div>
        <h4 style="color:var(--color-maroon);margin-bottom:12px;">Daftar Akun Guru Piket & Superadmin</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nama Petugas</th>
                <th>Peran</th>
                <th>Jadwal Piket</th>
                <th>Password</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${db.users.map(u => `
                <tr>
                  <td><code>@${escapeHtml(u.username)}</code></td>
                  <td><strong>${escapeHtml(u.name)}</strong></td>
                  <td><span class="badge ${u.role === 'superadmin' ? 'badge-maroon' : 'badge-gold'}">${u.role === 'superadmin' ? 'Superadmin' : 'Guru Piket'}</span></td>
                  <td>${escapeHtml(u.jadwalPiket || '-')}</td>
                  <td><code>${escapeHtml(u.password)}</code></td>
                  <td style="display:flex;gap:6px;">
                    <button type="button" class="btn btn-sm btn-outline" data-edit-user="${escapeHtml(u.id)}">Edit</button>
                    ${u.username === 'superadmin' ? '' : `<button type="button" class="btn btn-sm" style="background:#FEE2E2;color:#B91C1C;" data-del-user="${escapeHtml(u.id)}">Hapus</button>`}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// EVENT BINDINGS & ACTIONS
// ============================================================================
function bindMainEvents() {
  // Navigasi Sidebar
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeMenu = btn.getAttribute('data-nav');
      renderApp();
    });
  });

  // Tombol Pintasan Dashboard
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeMenu = btn.getAttribute('data-goto');
      renderApp();
    });
  });

  // Logout
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Date pickers
  const dashDate = document.getElementById('dash-date-picker');
  if (dashDate) {
    dashDate.addEventListener('change', e => {
      state.selectedDate = e.target.value;
      renderApp();
    });
  }

  const syncNowBtn = document.getElementById('btn-sync-sheet-now');
  if (syncNowBtn) {
    syncNowBtn.addEventListener('click', () => syncDailyToSpreadsheet(state.selectedDate));
  }

  // --- ABSENSI SISWA EVENTS ---
  document.querySelectorAll('[data-select-rombel]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedRombel = btn.getAttribute('data-select-rombel');
      renderApp();
    });
  });

  const stuDate = document.getElementById('stu-date-picker');
  if (stuDate) {
    stuDate.addEventListener('change', e => {
      state.selectedDate = e.target.value;
      renderApp();
    });
  }

  const stuSearch = document.getElementById('stu-search-input');
  if (stuSearch) {
    stuSearch.addEventListener('input', e => {
      state.studentSearch = e.target.value;
      renderApp();
      const input = document.getElementById('stu-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  document.querySelectorAll('[data-stu-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      const stuId = btn.getAttribute('data-stu-status');
      const val = btn.getAttribute('data-val');
      ensureStudentRecord(state.selectedDate, stuId);
      db.studentAttendance[state.selectedDate][stuId].status = val;
      db.studentAttendance[state.selectedDate][stuId].recordedBy = state.currentUser.name;
      db.studentAttendance[state.selectedDate][stuId].recordedByUsername = state.currentUser.username;
      db.studentAttendance[state.selectedDate][stuId].timestamp = getNowTimeStr();
      saveDatabase();
      renderApp();
    });
  });

  document.querySelectorAll('[data-stu-ket]').forEach(inp => {
    inp.addEventListener('input', e => {
      const stuId = inp.getAttribute('data-stu-ket');
      ensureStudentRecord(state.selectedDate, stuId);
      db.studentAttendance[state.selectedDate][stuId].keterangan = e.target.value;
      db.studentAttendance[state.selectedDate][stuId].recordedBy = state.currentUser.name;
      db.studentAttendance[state.selectedDate][stuId].recordedByUsername = state.currentUser.username;
      saveDatabase();
    });
  });

  const markAllStuBtn = document.getElementById('btn-mark-all-student-hadir');
  if (markAllStuBtn) {
    markAllStuBtn.addEventListener('click', () => {
      const list = db.students.filter(s => s.rombel === state.selectedRombel);
      list.forEach(s => {
        ensureStudentRecord(state.selectedDate, s.id);
        db.studentAttendance[state.selectedDate][s.id] = {
          status: 'H',
          keterangan: '',
          recordedBy: state.currentUser.name,
          recordedByUsername: state.currentUser.username,
          timestamp: getNowTimeStr()
        };
      });
      recordPiketActivity(state.selectedDate, `Menandai hadir seluruh siswa Rombel ${state.selectedRombel}`);
      saveDatabase();
      showToast(`Seluruh siswa kelas ${state.selectedRombel} ditandai Hadir oleh ${state.currentUser.name}.`);
      renderApp();
    });
  }

  const saveStuBtn = document.getElementById('btn-save-student-absen');
  if (saveStuBtn) {
    saveStuBtn.addEventListener('click', () => {
      const list = db.students.filter(s => s.rombel === state.selectedRombel);
      list.forEach(s => {
        ensureStudentRecord(state.selectedDate, s.id);
        db.studentAttendance[state.selectedDate][s.id].recordedBy = state.currentUser.name;
        db.studentAttendance[state.selectedDate][s.id].recordedByUsername = state.currentUser.username;
        db.studentAttendance[state.selectedDate][s.id].timestamp = getNowTimeStr();
      });
      recordPiketActivity(state.selectedDate, `Menyimpan absensi siswa Rombel ${state.selectedRombel}`);
      saveDatabase();
      showToast(`Absensi Rombel ${state.selectedRombel} berhasil disimpan! Tercatat atas nama Guru Piket: ${state.currentUser.name}.`);
      if (db.settings.autoSyncSpreadsheet && db.settings.spreadsheetWebhookUrl) {
        syncDailyToSpreadsheet(state.selectedDate);
      }
      renderApp();
    });
  }

  // --- ABSENSI GURU EVENTS ---
  const tchDate = document.getElementById('tch-date-picker');
  if (tchDate) {
    tchDate.addEventListener('change', e => {
      state.selectedDate = e.target.value;
      renderApp();
    });
  }

  const tchSearch = document.getElementById('tch-search-input');
  if (tchSearch) {
    tchSearch.addEventListener('input', e => {
      state.teacherSearch = e.target.value;
      renderApp();
      const input = document.getElementById('tch-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  document.querySelectorAll('[data-tch-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tchId = btn.getAttribute('data-tch-status');
      const val = btn.getAttribute('data-val');
      ensureTeacherRecord(state.selectedDate, tchId);
      db.teacherAttendance[state.selectedDate][tchId].status = val;
      db.teacherAttendance[state.selectedDate][tchId].recordedBy = state.currentUser.name;
      db.teacherAttendance[state.selectedDate][tchId].recordedByUsername = state.currentUser.username;
      db.teacherAttendance[state.selectedDate][tchId].timestamp = getNowTimeStr();
      saveDatabase();
      renderApp();
    });
  });

  document.querySelectorAll('[data-tch-ket]').forEach(inp => {
    inp.addEventListener('input', e => {
      const tchId = inp.getAttribute('data-tch-ket');
      ensureTeacherRecord(state.selectedDate, tchId);
      db.teacherAttendance[state.selectedDate][tchId].keterangan = e.target.value;
      db.teacherAttendance[state.selectedDate][tchId].recordedBy = state.currentUser.name;
      db.teacherAttendance[state.selectedDate][tchId].recordedByUsername = state.currentUser.username;
      saveDatabase();
    });
  });

  const markAllTchBtn = document.getElementById('btn-mark-all-teacher-hadir');
  if (markAllTchBtn) {
    markAllTchBtn.addEventListener('click', () => {
      db.teachers.forEach(t => {
        ensureTeacherRecord(state.selectedDate, t.id);
        db.teacherAttendance[state.selectedDate][t.id] = {
          status: 'H',
          keterangan: '',
          recordedBy: state.currentUser.name,
          recordedByUsername: state.currentUser.username,
          timestamp: getNowTimeStr()
        };
      });
      recordPiketActivity(state.selectedDate, 'Menandai hadir seluruh dewan guru');
      saveDatabase();
      showToast(`Seluruh dewan guru ditandai Hadir oleh ${state.currentUser.name}.`);
      renderApp();
    });
  }

  const saveTchBtn = document.getElementById('btn-save-teacher-absen');
  if (saveTchBtn) {
    saveTchBtn.addEventListener('click', () => {
      db.teachers.forEach(t => {
        ensureTeacherRecord(state.selectedDate, t.id);
        db.teacherAttendance[state.selectedDate][t.id].recordedBy = state.currentUser.name;
        db.teacherAttendance[state.selectedDate][t.id].recordedByUsername = state.currentUser.username;
        db.teacherAttendance[state.selectedDate][t.id].timestamp = getNowTimeStr();
      });
      recordPiketActivity(state.selectedDate, 'Menyimpan absensi harian dewan guru');
      saveDatabase();
      showToast(`Absensi Dewan Guru berhasil disimpan oleh Guru Piket: ${state.currentUser.name}.`);
      if (db.settings.autoSyncSpreadsheet && db.settings.spreadsheetWebhookUrl) {
        syncDailyToSpreadsheet(state.selectedDate);
      }
      renderApp();
    });
  }

  // --- REKAP EVENTS ---
  document.querySelectorAll('[data-rekap-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.rekapTab = btn.getAttribute('data-rekap-tab');
      renderApp();
    });
  });

  const rekapTarget = document.getElementById('rekap-target-select');
  if (rekapTarget) {
    rekapTarget.addEventListener('change', e => {
      state.rekapTarget = e.target.value;
      renderApp();
    });
  }

  const rekapRombel = document.getElementById('rekap-rombel-select');
  if (rekapRombel) {
    rekapRombel.addEventListener('change', e => {
      state.rekapRombel = e.target.value;
      renderApp();
    });
  }

  const weekStart = document.getElementById('rekap-week-start');
  if (weekStart) {
    weekStart.addEventListener('change', e => {
      state.rekapWeekStart = e.target.value;
      renderApp();
    });
  }

  const weekEnd = document.getElementById('rekap-week-end');
  if (weekEnd) {
    weekEnd.addEventListener('change', e => {
      state.rekapWeekEnd = e.target.value;
      renderApp();
    });
  }

  const monthPicker = document.getElementById('rekap-month-picker');
  if (monthPicker) {
    monthPicker.addEventListener('change', e => {
      state.rekapMonth = e.target.value;
      renderApp();
    });
  }

  const printBtn = document.getElementById('btn-print-rekap');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  const exportCsvBtn = document.getElementById('btn-export-rekap-csv');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportCurrentRekapCSV);
  }

  // --- LOG PIKET EVENTS ---
  const piketDate = document.getElementById('piket-date-picker');
  if (piketDate) {
    piketDate.addEventListener('change', e => {
      state.selectedDate = e.target.value;
      renderApp();
    });
  }

  const savePiketBtn = document.getElementById('btn-save-piket-log');
  if (savePiketBtn) {
    savePiketBtn.addEventListener('click', () => {
      const note = document.getElementById('piket-note-input').value;
      recordPiketActivity(state.selectedDate, note);
      saveDatabase();
      showToast(`Jurnal Guru Piket tanggal ${state.selectedDate} disimpan atas nama ${state.currentUser.name}.`);
      renderApp();
    });
  }

  // --- SUPERADMIN EVENTS ---
  document.querySelectorAll('[data-super-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.superadminTab = btn.getAttribute('data-super-tab');
      renderApp();
    });
  });

  document.querySelectorAll('[data-theme-preset]').forEach(card => {
    card.addEventListener('click', () => {
      const preset = card.getAttribute('data-theme-preset');
      applyThemePreset(preset);
      saveDatabase();
      showToast(`Tema warna "${preset}" diterapkan!`);
      renderApp();
    });
  });

  const saveCustomThemeBtn = document.getElementById('btn-save-custom-theme');
  if (saveCustomThemeBtn) {
    saveCustomThemeBtn.addEventListener('click', () => {
      db.settings.theme = {
        preset: 'custom',
        maroon: document.getElementById('theme-maroon').value,
        maroonDark: '#3A040D',
        gold: document.getElementById('theme-gold').value,
        black: document.getElementById('theme-black').value,
        bg: document.getElementById('theme-bg').value,
        surface: '#FFFFFF'
      };
      saveDatabase();
      showToast('Kustomisasi warna Maroon, Gold, Putih & Hitam berhasil disimpan!');
      renderApp();
    });
  }

  // Event Upload & Ganti Logo Sekolah
  const logoFileInput = document.getElementById('set-schoolLogoFile');
  if (logoFileInput) {
    logoFileInput.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('File harus berupa gambar (PNG, JPG, SVG, dsb)!');
        return;
      }
      const reader = new FileReader();
      reader.onload = function(evt) {
        db.settings.schoolLogo = evt.target.result;
        saveDatabase();
        showToast('Logo sekolah berhasil diperbarui dari file gambar!');
        renderApp();
      };
      reader.readAsDataURL(file);
    });
  }

  const saveLogoOnlyBtn = document.getElementById('btn-save-logo-only');
  if (saveLogoOnlyBtn) {
    saveLogoOnlyBtn.addEventListener('click', () => {
      const urlVal = document.getElementById('set-schoolLogoUrl').value.trim();
      const txtVal = document.getElementById('set-schoolLogoText').value.trim();
      if (urlVal) db.settings.schoolLogo = urlVal;
      if (txtVal) db.settings.schoolLogoText = txtVal.toUpperCase();
      saveDatabase();
      showToast('Pengaturan logo berhasil disimpan!');
      renderApp();
    });
  }

  const resetLogoBtn = document.getElementById('btn-reset-logo');
  if (resetLogoBtn) {
    resetLogoBtn.addEventListener('click', () => {
      db.settings.schoolLogo = '';
      db.settings.schoolLogoText = 'DP';
      saveDatabase();
      showToast('Logo dikembalikan ke inisial default (DP)!');
      renderApp();
    });
  }

  const saveKetBtn = document.getElementById('btn-save-all-keterangan');
  if (saveKetBtn) {
    saveKetBtn.addEventListener('click', () => {
      const logoUrl = document.getElementById('set-schoolLogoUrl');
      const logoTxt = document.getElementById('set-schoolLogoText');
      if (logoUrl && logoUrl.value.trim()) db.settings.schoolLogo = logoUrl.value.trim();
      if (logoTxt && logoTxt.value.trim()) db.settings.schoolLogoText = logoTxt.value.trim().toUpperCase();

      db.settings.schoolName = document.getElementById('set-schoolName').value.trim();
      db.settings.systemSubtitle = document.getElementById('set-systemSubtitle').value.trim();
      db.settings.academicYear = document.getElementById('set-academicYear').value.trim();
      db.settings.semester = document.getElementById('set-semester').value.trim();
      db.settings.headmasterName = document.getElementById('set-headmasterName').value.trim();
      db.settings.headmasterNip = document.getElementById('set-headmasterNip').value.trim();
      db.settings.ketHadirLabel = document.getElementById('set-ketHadirLabel').value.trim();
      db.settings.ketIzinLabel = document.getElementById('set-ketIzinLabel').value.trim();
      db.settings.ketSakitLabel = document.getElementById('set-ketSakitLabel').value.trim();
      db.settings.ketAlphaLabel = document.getElementById('set-ketAlphaLabel').value.trim();
      db.settings.defaultIzinPresets = document.getElementById('set-defaultIzinPresets').value.trim();
      db.settings.defaultSakitPresets = document.getElementById('set-defaultSakitPresets').value.trim();
      db.settings.schoolAddress = document.getElementById('set-schoolAddress').value.trim();
      db.settings.schoolPhone = document.getElementById('set-schoolPhone').value.trim();
      db.settings.schoolEmail = document.getElementById('set-schoolEmail').value.trim();
      saveDatabase();
      showToast('Seluruh keterangan sekolah & logo berhasil diperbarui oleh Superadmin!');
      renderApp();
    });
  }

  // Event Firebase Manual Actions
  const forceUploadFbBtn = document.getElementById('btn-force-upload-firebase');
  if (forceUploadFbBtn) {
    forceUploadFbBtn.addEventListener('click', async () => {
      if (!window.FirebaseBridge || typeof window.FirebaseBridge.saveToCloud !== 'function') {
        showToast('Firebase belum terhubung. Periksa koneksi internet!');
        return;
      }
      try {
        showToast('Mengunggah database ke Firebase Cloud...');
        await window.FirebaseBridge.saveToCloud(db);
        showToast('Database berhasil diunggah ke Firebase Cloud Firestore!');
        renderApp();
      } catch (err) {
        showToast('Gagal mengunggah ke Firebase: ' + err.message);
      }
    });
  }

  const forceDownloadFbBtn = document.getElementById('btn-force-download-firebase');
  if (forceDownloadFbBtn) {
    forceDownloadFbBtn.addEventListener('click', async () => {
      if (!window.FirebaseBridge || typeof window.FirebaseBridge.loadFromCloud !== 'function') {
        showToast('Firebase belum terhubung. Periksa koneksi internet!');
        return;
      }
      try {
        showToast('Mengunduh database dari Firebase Cloud...');
        const cloudData = await window.FirebaseBridge.loadFromCloud();
        if (cloudData && cloudData.users) {
          db = cloudData;
          saveDatabase(false);
          showToast('Data terbaru dari Firebase berhasil disinkronkan ke aplikasi!');
          renderApp();
        } else {
          showToast('Data belum ada di Firebase Cloud. Mengunggah data lokal sekarang...');
          await window.FirebaseBridge.saveToCloud(db);
        }
      } catch (err) {
        showToast('Gagal mengunduh dari Firebase: ' + err.message);
      }
    });
  }

  const saveSheetBtn = document.getElementById('btn-save-sheet-config');
  if (saveSheetBtn) {
    saveSheetBtn.addEventListener('click', () => {
      db.settings.spreadsheetViewUrl = document.getElementById('sheet-view-url').value.trim();
      db.settings.spreadsheetWebhookUrl = document.getElementById('sheet-webhook-url').value.trim();
      db.settings.autoSyncSpreadsheet = document.getElementById('sheet-autosync').checked;
      saveDatabase();
      showToast('Tautan Google Spreadsheet berhasil disimpan!');
      renderApp();
    });
  }

  const testSyncBtn = document.getElementById('btn-test-sync-sheet');
  if (testSyncBtn) {
    testSyncBtn.addEventListener('click', () => {
      db.settings.spreadsheetViewUrl = document.getElementById('sheet-view-url').value.trim();
      db.settings.spreadsheetWebhookUrl = document.getElementById('sheet-webhook-url').value.trim();
      db.settings.autoSyncSpreadsheet = document.getElementById('sheet-autosync').checked;
      saveDatabase();
      syncDailyToSpreadsheet(state.selectedDate);
    });
  }

  // Kelola Rombel & Siswa
  const addRombelBtn = document.getElementById('btn-add-rombel');
  if (addRombelBtn) {
    addRombelBtn.addEventListener('click', () => {
      const val = document.getElementById('new-rombel-name').value.trim().toUpperCase();
      if (!val) return showToast('Masukkan nama rombel!');
      if (db.rombels.includes(val)) return showToast('Rombel sudah ada!');
      db.rombels.push(val);
      saveDatabase();
      showToast(`Rombel ${val} berhasil ditambahkan!`);
      renderApp();
    });
  }

  document.querySelectorAll('[data-del-rombel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = btn.getAttribute('data-del-rombel');
      db.rombels = db.rombels.filter(x => x !== r);
      saveDatabase();
      showToast(`Rombel ${r} dihapus.`);
      renderApp();
    });
  });

  const addStuBtn = document.getElementById('btn-add-student');
  if (addStuBtn) {
    addStuBtn.addEventListener('click', () => {
      const nis = document.getElementById('new-stu-nis').value.trim();
      const name = document.getElementById('new-stu-name').value.trim();
      const gender = document.getElementById('new-stu-gender').value;
      const rombel = document.getElementById('new-stu-rombel').value;
      if (!nis || !name) return showToast('Lengkapi NIS dan Nama Siswa!');
      db.students.push({
        id: 'S' + Date.now(),
        nis,
        name,
        gender,
        rombel
      });
      saveDatabase();
      showToast(`Siswa ${name} ditambahkan ke Rombel ${rombel}.`);
      renderApp();
    });
  }

  document.querySelectorAll('[data-edit-student]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-student');
      const stu = db.students.find(s => s.id === id);
      if (!stu) return;
      const newName = prompt('Edit Nama Lengkap Siswa:', stu.name);
      if (newName === null) return;
      const newNis = prompt('Edit NIS Siswa:', stu.nis);
      if (newNis === null) return;
      const newRombel = prompt(`Edit Rombel Siswa (${db.rombels.join(', ')}):`, stu.rombel);
      if (newRombel === null) return;
      stu.name = newName.trim() || stu.name;
      stu.nis = newNis.trim() || stu.nis;
      stu.rombel = newRombel.trim().toUpperCase() || stu.rombel;
      saveDatabase();
      showToast(`Data siswa ${stu.name} berhasil diperbarui!`);
      renderApp();
    });
  });

  document.querySelectorAll('[data-del-student]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-student');
      db.students = db.students.filter(s => s.id !== id);
      saveDatabase();
      showToast('Data siswa dihapus.');
      renderApp();
    });
  });

  // Kelola Guru
  const addTchBtn = document.getElementById('btn-add-teacher');
  if (addTchBtn) {
    addTchBtn.addEventListener('click', () => {
      const nip = document.getElementById('new-tch-nip').value.trim();
      const name = document.getElementById('new-tch-name').value.trim();
      const subject = document.getElementById('new-tch-subject').value.trim();
      if (!name) return showToast('Masukkan Nama Guru!');
      db.teachers.push({
        id: 'G' + Date.now(),
        nip: nip || '-',
        name,
        subject: subject || 'Guru Mata Pelajaran'
      });
      saveDatabase();
      showToast(`Data guru ${name} berhasil ditambahkan.`);
      renderApp();
    });
  }

  document.querySelectorAll('[data-edit-teacher]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-teacher');
      const tch = db.teachers.find(t => t.id === id);
      if (!tch) return;
      const newName = prompt('Edit Nama Lengkap Guru:', tch.name);
      if (newName === null) return;
      const newNip = prompt('Edit NIP Guru:', tch.nip);
      if (newNip === null) return;
      const newSubject = prompt('Edit Mata Pelajaran / Jabatan:', tch.subject);
      if (newSubject === null) return;
      tch.name = newName.trim() || tch.name;
      tch.nip = newNip.trim() || tch.nip;
      tch.subject = newSubject.trim() || tch.subject;
      saveDatabase();
      showToast(`Data guru ${tch.name} berhasil diperbarui!`);
      renderApp();
    });
  });

  document.querySelectorAll('[data-del-teacher]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-teacher');
      db.teachers = db.teachers.filter(t => t.id !== id);
      saveDatabase();
      showToast('Data guru dihapus.');
      renderApp();
    });
  });

  // Kelola Akun Login
  const addUserBtn = document.getElementById('btn-add-user');
  if (addUserBtn) {
    addUserBtn.addEventListener('click', () => {
      const name = document.getElementById('new-acc-name').value.trim();
      const username = document.getElementById('new-acc-username').value.trim();
      const password = document.getElementById('new-acc-password').value.trim();
      const jadwalPiket = document.getElementById('new-acc-schedule').value.trim();
      const role = document.getElementById('new-acc-role').value;
      if (!name || !username || !password) return showToast('Lengkapi nama, username, dan password!');
      if (db.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return showToast('Username sudah digunakan!');
      }
      db.users.push({
        id: 'U' + Date.now(),
        username,
        password,
        name,
        role,
        jadwalPiket: jadwalPiket || 'Guru Piket Harian'
      });
      saveDatabase();
      showToast(`Akun @${username} (${name}) berhasil dibuat!`);
      renderApp();
    });
  }

  document.querySelectorAll('[data-edit-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-user');
      const usr = db.users.find(u => u.id === id);
      if (!usr) return;
      const newName = prompt('Edit Nama Petugas / Admin:', usr.name);
      if (newName === null) return;
      const newPass = prompt('Edit Password Login:', usr.password);
      if (newPass === null) return;
      const newSchedule = prompt('Edit Jadwal Piket:', usr.jadwalPiket || '');
      if (newSchedule === null) return;
      usr.name = newName.trim() || usr.name;
      usr.password = newPass.trim() || usr.password;
      usr.jadwalPiket = newSchedule.trim() || usr.jadwalPiket;
      saveDatabase();
      showToast(`Akun @${usr.username} berhasil diperbarui!`);
      renderApp();
    });
  });

  document.querySelectorAll('[data-del-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-del-user');
      db.users = db.users.filter(u => u.id !== id);
      saveDatabase();
      showToast('Akun pengguna dihapus.');
      renderApp();
    });
  });
}

// ============================================================================
// HELPERS & SPREADSHEET SYNC
// ============================================================================
function getNowTimeStr() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
}

function ensureStudentRecord(date, stuId) {
  if (!db.studentAttendance[date]) db.studentAttendance[date] = {};
  if (!db.studentAttendance[date][stuId]) {
    db.studentAttendance[date][stuId] = {
      status: 'H',
      keterangan: '',
      recordedBy: state.currentUser.name,
      recordedByUsername: state.currentUser.username,
      timestamp: getNowTimeStr()
    };
  }
}

function ensureTeacherRecord(date, tchId) {
  if (!db.teacherAttendance[date]) db.teacherAttendance[date] = {};
  if (!db.teacherAttendance[date][tchId]) {
    db.teacherAttendance[date][tchId] = {
      status: 'H',
      keterangan: '',
      recordedBy: state.currentUser.name,
      recordedByUsername: state.currentUser.username,
      timestamp: getNowTimeStr()
    };
  }
}

function recordPiketActivity(date, noteText) {
  const nowTime = getNowTimeStr();
  db.piketLogs[date] = {
    date,
    username: state.currentUser.username,
    name: state.currentUser.name,
    role: state.currentUser.role === 'superadmin' ? 'Superadmin' : 'Guru Piket Harian',
    loginTime: db.piketLogs[date] ? db.piketLogs[date].loginTime : nowTime,
    lastUpdated: nowTime,
    note: noteText || (db.piketLogs[date] ? db.piketLogs[date].note : ''),
    syncedToSheet: false
  };
}

function applyThemePreset(preset) {
  if (preset === 'classic-maroon-gold') {
    db.settings.theme = {
      preset,
      maroon: '#7A0C1E',
      maroonDark: '#4E0612',
      gold: '#D4AF37',
      black: '#121214',
      bg: '#F8F6F4',
      surface: '#FFFFFF'
    };
  } else if (preset === 'imperial-crimson-gold') {
    db.settings.theme = {
      preset,
      maroon: '#5C0614',
      maroonDark: '#38020B',
      gold: '#F3C623',
      black: '#0B0B0D',
      bg: '#FAF8F5',
      surface: '#FFFFFF'
    };
  } else if (preset === 'obsidian-gold-maroon') {
    db.settings.theme = {
      preset,
      maroon: '#8E162A',
      maroonDark: '#520915',
      gold: '#E5B842',
      black: '#18181B',
      bg: '#F4F1EA',
      surface: '#FFFFFF'
    };
  }
}

async function syncDailyToSpreadsheet(date) {
  const webhookUrl = db.settings.spreadsheetWebhookUrl;
  const stuDay = db.studentAttendance[date] || {};
  const tchDay = db.teacherAttendance[date] || {};

  const studentRecords = db.students.map(s => {
    const rec = stuDay[s.id] || { status: 'H', keterangan: '', recordedBy: state.currentUser.name, timestamp: getNowTimeStr() };
    return {
      rombel: s.rombel,
      nis: s.nis,
      name: s.name,
      status: rec.status,
      keterangan: rec.keterangan || '-',
      recordedBy: `${rec.recordedBy} (@${rec.recordedByUsername || state.currentUser.username})`,
      timestamp: rec.timestamp || getNowTimeStr()
    };
  });

  const teacherRecords = db.teachers.map(t => {
    const rec = tchDay[t.id] || { status: 'H', keterangan: '', recordedBy: state.currentUser.name, timestamp: getNowTimeStr() };
    return {
      nip: t.nip,
      name: t.name,
      subject: t.subject,
      status: rec.status,
      keterangan: rec.keterangan || '-',
      recordedBy: `${rec.recordedBy} (@${rec.recordedByUsername || state.currentUser.username})`,
      timestamp: rec.timestamp || getNowTimeStr()
    };
  });

  const payload = {
    schoolName: db.settings.schoolName,
    date,
    piketLog: db.piketLogs[date] || {
      username: state.currentUser.username,
      name: state.currentUser.name,
      role: state.currentUser.role,
      note: 'Sinkronisasi harian'
    },
    studentRecords,
    teacherRecords
  };

  if (!webhookUrl) {
    // Jika URL Web App belum diisi, unduh otomatis sebagai file CSV Spreadsheet harian
    downloadDailyCSV(date, studentRecords, teacherRecords);
    showToast('Link Web App Spreadsheet belum diisi; mengunduh file Spreadsheet (CSV) harian sebagai cadangan.');
    return;
  }

  try {
    showToast('Mengirim data absensi harian ke Google Spreadsheet...');
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (db.piketLogs[date]) db.piketLogs[date].syncedToSheet = true;
    saveDatabase();
    showToast(`Berhasil dikirim ke Google Spreadsheet ${db.settings.schoolName}!`);
  } catch (err) {
    console.error(err);
    showToast('Gagal menghubungi Web App Spreadsheet. Mengunduh CSV cadangan...');
    downloadDailyCSV(date, studentRecords, teacherRecords);
  }
}

function downloadDailyCSV(date, studentRecords, teacherRecords) {
  const lines = [
    `LAPORAN HARIAN ABSENSI ${db.settings.schoolName.toUpperCase()}`,
    `Tanggal,${date}`,
    `Petugas Guru Piket,${state.currentUser.name} (@${state.currentUser.username})`,
    '',
    'A. ABSENSI SISWA PER ROMBEL',
    'Tanggal,Rombel,NIS,Nama Siswa,Status,Keterangan,Guru Piket Pencatat,Waktu'
  ];

  studentRecords.forEach(r => {
    lines.push(`"${date}","${r.rombel}","${r.nis}","${r.name}","${r.status}","${r.keterangan}","${r.recordedBy}","${r.timestamp}"`);
  });

  lines.push('');
  lines.push('B. ABSENSI DEWAN GURU');
  lines.push('Tanggal,NIP,Nama Guru,Mata Pelajaran/Jabatan,Status,Keterangan,Guru Piket Pencatat,Waktu');

  teacherRecords.forEach(r => {
    lines.push(`"${date}","${r.nip}","${r.name}","${r.subject}","${r.status}","${r.keterangan}","${r.recordedBy}","${r.timestamp}"`);
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Absensi_Harian_SMP_Dyah_Pithaloka_${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCurrentRekapCSV() {
  const isWeekly = state.rekapTab === 'mingguan';
  const activeDates = isWeekly
    ? getDatesBetween(state.rekapWeekStart, state.rekapWeekEnd)
    : getDatesInMonth(state.rekapMonth).filter(d => Boolean(db.studentAttendance[d] || db.teacherAttendance[d]));

  const isSiswa = state.rekapTarget === 'siswa';
  const items = isSiswa
    ? db.students.filter(s => state.rekapRombel === 'ALL' || s.rombel === state.rekapRombel)
    : db.teachers;

  const lines = [
    `REKAPITULASI ABSENSI ${isWeekly ? 'MINGGUAN' : 'BULANAN'} - ${db.settings.schoolName.toUpperCase()}`,
    `Periode,${isWeekly ? state.rekapWeekStart + ' s/d ' + state.rekapWeekEnd : state.rekapMonth}`,
    `Dicetak Oleh,${state.currentUser.name} (@${state.currentUser.username})`,
    '',
    `No,${isSiswa ? 'NIS' : 'NIP'},Nama Lengkap,${isSiswa ? 'Rombel' : 'Jabatan/Mapel'},Hadir (H),Izin (I),Sakit (S),Alpha (A),Persentase Hadir,Detail Keterangan Izin/Sakit`
  ];

  items.forEach((person, idx) => {
    let H = 0, I = 0, S = 0, A = 0;
    const notes = [];
    activeDates.forEach(d => {
      const table = isSiswa ? db.studentAttendance[d] : db.teacherAttendance[d];
      const rec = table ? table[person.id] : null;
      if (!rec) return;
      if (rec.status === 'H') H++;
      else if (rec.status === 'I') { I++; notes.push(`${d}: Izin (${rec.keterangan || '-'})`); }
      else if (rec.status === 'S') { S++; notes.push(`${d}: Sakit (${rec.keterangan || '-'})`); }
      else if (rec.status === 'A') { A++; notes.push(`${d}: Alpha`); }
    });
    const total = H + I + S + A;
    const pct = total > 0 ? Math.round((H / total) * 100) : 100;
    lines.push(`${idx + 1},"${isSiswa ? person.nis : person.nip}","${person.name}","${isSiswa ? person.rombel : person.subject}",${H},${I},${S},${A},"${pct}%","${notes.join('; ')}"`);
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rekap_${state.rekapTab}_${state.rekapTarget}_SMP_Dyah_Pithaloka.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('File Rekapitulasi CSV/Excel berhasil diunduh!');
}

function getStatusLabel(code) {
  if (code === 'H') return db.settings.ketHadirLabel || 'Hadir (H)';
  if (code === 'I') return db.settings.ketIzinLabel || 'Izin (I)';
  if (code === 'S') return db.settings.ketSakitLabel || 'Sakit (S)';
  if (code === 'A') return db.settings.ketAlphaLabel || 'Alpha (A)';
  return code;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  initFirebaseSync();
});

// Listener saat Firebase siap
window.addEventListener('firebase-ready', () => {
  initFirebaseSync();
});

function initFirebaseSync() {
  if (!window.FirebaseBridge || typeof window.FirebaseBridge.listenToCloud !== 'function') return;

  // Coba ambil data pertama kali dari cloud jika ada
  window.FirebaseBridge.loadFromCloud().then(cloudData => {
    if (cloudData && cloudData.users && cloudData.settings) {
      db = cloudData;
      saveDatabase(false);
      renderApp();
      console.log('Firebase Cloud Database loaded successfully.');
    } else {
      // Jika di cloud masih kosong, unggah data awal
      window.FirebaseBridge.saveToCloud(db).catch(console.warn);
    }
  }).catch(err => {
    console.warn('Firebase initial load note:', err);
  });

  // Pasang listener real-time
  window.FirebaseBridge.listenToCloud(cloudData => {
    if (cloudData && cloudData.users && cloudData.settings) {
      db = cloudData;
      saveDatabase(false);
      renderApp();
      showToast('Data diperbarui secara real-time dari Firebase Cloud');
    }
  });
}


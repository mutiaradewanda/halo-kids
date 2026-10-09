import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Eye,
  Search,
  LogOut,
  FileSpreadsheet,
  Download,
  MapPin,
  Calendar,
  ShieldCheck,
  Package,
  Wallet,
  TrendingUp,
  X,
  UserPlus,
  HeartHandshake,
  GraduationCap,
  Palette,
  XCircle,
  MessageCircle,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdminDocumentReview } from '../components/AiVerification';

export default function DashboardUtama({ onSwitchToLanding, onLogout, currentUser, volunteerList, setVolunteerList }) {
  // Current Active Dashboard Mode: 'user' | 'pantiadmin' | 'superadmin'
  const initialRole = currentUser?.role === 'Admin Panti' ? 'pantiadmin' : currentUser?.role === 'Super Admin' ? 'superadmin' : 'user';
  const [dashboardRoleMode, setDashboardRoleMode] = useState(initialRole);

  // Active Menu Tab for User Publik
  const [userTab, setUserTab] = useState('adopsi'); // 'adopsi' | 'pengaduan' | 'donasi' | 'panti'

  // Active Menu Tab for Super Admin
  const [superAdminTab, setSuperAdminTab] = useState('approval_panti'); // 'approval_panti' | 'supervisi_adopsi' | 'monitoring_hilang' | 'audit_donasi' | 'analitik_eksekutif'

  // Active Menu Tab for Admin Panti
  const [pantiAdminTab, setPantiAdminTab] = useState('daftar_anak'); // 'daftar_anak' | 'input_donasi' | 'laporan_hilang_panti' | 'formulir_adopsi_panti' | 'volunteer_panti'

  // AI Verification Review Modal (PRD Single-Agent AI)
  const [showAiAdminReviewModal, setShowAiAdminReviewModal] = useState(false);
  const [selectedAdopsiApplicant, setSelectedAdopsiApplicant] = useState(null);

  // Common UI Notification Toast
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // ----------------------------------------------------
  // DATA STATES FOR VOLUNTEER (REQUIREMENT VOLUNTEER)
  // ----------------------------------------------------
  const defaultVolunteers = [
    {
      id: 'VOL-2024-8102',
      nama: 'Sarah Amanda Putri',
      nomorHp: '0812-9876-5432',
      alamat: 'Jl. Pajajaran No. 28, Baranangsiang, Kota Bogor',
      usia: 21,
      bidang: 'Pendidikan / Tutor Belajar',
      pantiTujuan: 'LKSA Kasih Bunda Mandiri',
      tanggal: '2024-10-14',
      sesiWaktu: 'Weekend Khusus (Sabtu & Minggu)',
      tujuanKerelawanan: 'Ingin mengajar bahasa Inggris dasar dan calistung untuk adik-adik asuh panti, serta mendampingi bimbingan tugas sekolah di akhir pekan.',
      ktpFileName: 'scan_ktm_sarah_amanda.pdf',
      ktpFileSize: '1.2 MB',
      status: 'Menunggu Persetujuan',
      submittedAt: 'Hari ini, 09:30 WIB'
    },
    {
      id: 'VOL-2024-7491',
      nama: 'Rizky Maulana Akbar',
      nomorHp: '0857-1122-3344',
      alamat: 'Perumahan Sukaraja Indah Blok C3, Kec. Sukaraja',
      usia: 24,
      bidang: 'Kesenian / Olahraga',
      pantiTujuan: 'LKSA Kasih Bunda Mandiri',
      tanggal: '2024-10-19',
      sesiWaktu: 'Siang / Sore Hari (13.30 - 16.30 WIB)',
      tujuanKerelawanan: 'Mengadakan pelatihan futsal dan senam kebugaran jasmani bersama adik-adik panti untuk membangun sportivitas dan kegembiraan.',
      ktpFileName: 'scan_ktp_rizky_maulana.jpg',
      ktpFileSize: '920 KB',
      status: 'Disetujui',
      submittedAt: 'Kemarin, 14:15 WIB'
    },
    {
      id: 'VOL-2024-6305',
      nama: 'Dina Lestari',
      nomorHp: '0813-4455-6677',
      alamat: 'Kecamatan Gunung Putri • Desa Wanaherang',
      usia: 16,
      bidang: 'Kesenian / Olahraga',
      pantiTujuan: 'LKSA Kasih Bunda Mandiri',
      tanggal: '2024-10-12',
      sesiWaktu: 'Pagi Hari (08.30 - 11.30 WIB)',
      tujuanKerelawanan: 'Ingin membantu mengajar menyanyi dan mewarnai gambar bersama anak balita panti.',
      ktpFileName: 'kartu_pelajar_dina.jpg',
      ktpFileSize: '450 KB',
      status: 'Ditolak',
      submittedAt: '03 Oct 2024, 11:00 WIB'
    }
  ];

  const [localVolunteers, setLocalVolunteers] = useState(defaultVolunteers);
  const currentVolunteers = volunteerList && volunteerList.length > 0 ? volunteerList : localVolunteers;

  const [volunteerFilter, setVolunteerFilter] = useState('Semua');
  const [volunteerSearch, setVolunteerSearch] = useState('');
  const [selectedKtpDoc, setSelectedKtpDoc] = useState(null);

  const handleApproveVolunteer = (vol) => {
    const updated = currentVolunteers.map(v => v.id === vol.id ? { ...v, status: 'Disetujui' } : v);
    if (setVolunteerList) setVolunteerList(updated);
    setLocalVolunteers(updated);
    showToast(`Relawan ${vol.nama} BERHASIL DISETUJUI! Notifikasi penerimaan diterbitkan.`);
  };

  const handleRejectVolunteer = (vol) => {
    const updated = currentVolunteers.map(v => v.id === vol.id ? { ...v, status: 'Ditolak' } : v);
    if (setVolunteerList) setVolunteerList(updated);
    setLocalVolunteers(updated);
    showToast(`Pendaftaran relawan ${vol.nama} DITOLAK.`);
  };

  // ----------------------------------------------------
  // DATA STATES FOR SUPER ADMIN (DINSOS)
  // ----------------------------------------------------

  // 1. Panti Approval & Status LKSA (Super Admin Req #1)
  const [pantiRegistrations, setPantiRegistrations] = useState([
    { id: 'REG-LKSA-091', name: 'LKSA Nurul Hidayah Cileungsi', pengurus: 'Ust. Abdul Karim', email: 'pengurus@panti-nurulhidayah.or.id', phone: '0812-3344-5566', address: 'Kec. Cileungsi', status: 'Menunggu Verifikasi Dinsos', akreditasi: 'Pengajuan Baru' },
    { id: 'REG-LKSA-088', name: 'Yayasan Mutiara Kasih Gunung Putri', pengurus: 'Ir. Ahmad Subagja', email: 'admin@mutiarakasih.org', phone: '0813-9988-7711', address: 'Kec. Gunung Putri', status: 'Disetujui / Aktif', akreditasi: 'AKREDITASI A' },
    { id: 'REG-LKSA-075', name: 'LKSA Kasih Bunda Mandiri', pengurus: 'Dra. Hj. Siti Aminah', email: 'admin@kasihbunda.or.id', phone: '0812-9988-7711', address: 'Kec. Cibinong', status: 'Disetujui / Aktif', akreditasi: 'AKREDITASI A' },
    { id: 'REG-LKSA-062', name: 'Panti Balita Tunas Bangsa', pengurus: 'Ns. Ratna Juwita', email: 'info@tunasbangsa.or.id', phone: '0813-8822-4400', address: 'Kec. Cibinong', status: 'Disetujui / Aktif', akreditasi: 'AKREDITASI A' }
  ]);

  // 2. Master Data Anak & Validasi Adopsi PIPA (Super Admin Req #2)
  const [adopsiApplications, setAdopsiApplications] = useState([
    { id: 'PIPA-2024-012', applicant: 'Bpk. Hendra & Ibu Siska', targetChild: 'Ahmad Faiz (3 Thn)', originPanti: 'Panti Balita Tunas Bangsa', score: 'Lolos Survey Ekonomi & Psikologis', status: 'Verifikasi Sidang PIPA Dinsos', docs: ['KTP/KK', 'SKCK', 'Surat Medis', 'Rekomendasi Panti'] },
    { id: 'PIPA-2024-009', applicant: 'Bpk. Dr. Ridwan & Ibu Elena', targetChild: 'Siti Nurhaliza (6 Thn)', originPanti: 'LKSA Kasih Bunda Mandiri', score: 'Verifikasi Berkas Lengkap', status: 'SK Pengangkatan Anak Terbit (Disetujui)', docs: ['KTP/KK', 'SKCK', 'BAP Kepolisian', 'Akte Lahir'] }
  ]);

  // 3. Control Pelaporan Anak Hilang & Eskalasi (Super Admin Req #3)
  const [lostChildReports, setLostChildReports] = useState([
    { id: 'HILANG-2024-099', childName: 'Rian (L, 8 Thn)', reporter: 'Ibu Pertiwi (Orang Tua)', location: 'Kec. Cibinong • Jl. Mayor Oking', date: 'Hari ini, 10:15 WIB', photo: '/lksa1.jpg', status: 'Eskalasi TRC & Kepolisian', officer: 'Tim TRC Alpha' },
    { id: 'HILANG-2024-082', childName: 'Nayla (P, 5 Thn)', reporter: 'Warga Sukamaju', location: 'Kec. Ciawi', date: 'Kemarin', photo: '/lksa2.jpg', status: 'Dalam Investigasi Panti', officer: 'Petugas Ciawi' },
    { id: 'HILANG-2024-071', childName: 'Dimas (L, 11 Thn)', reporter: 'Bpk. Wahyu', location: 'Kec. Parung', date: '02 Oct 2024', photo: '/lksa3.jpg', status: 'Ditemukan / Selesai', officer: 'Polsek Parung' }
  ]);

  // 4. Audit Donasi Daerah & Pemetaan Kebutuhan (Super Admin Req #4)
  const regionalDonationAudit = [
    { panti: 'LKSA Kasih Bunda Mandiri', location: 'Cibinong', moneyReceived: 'Rp 45.500.000', goodsReceived: '85 Paket Sembako & Seragam', priorityNeed: 'Sedang', mainNeed: 'Buku Tulis & Sepatu' },
    { panti: 'Panti Balita Tunas Bangsa', location: 'Cibinong', moneyReceived: 'Rp 62.000.000', goodsReceived: '120 Pax Popok & Susu', priorityNeed: 'KRITIS (Mendesak)', mainNeed: 'Susu Formula SGM & Perlak' },
    { panti: 'LKSA Bina Harapan Ciawi', location: 'Ciawi', moneyReceived: 'Rp 28.100.000', goodsReceived: '15 Unit Komputer & Alat Boga', priorityNeed: 'Tinggi', mainNeed: 'Bahan Pelatihan Boga' }
  ];

  // ----------------------------------------------------
  // DATA STATES FOR ADMIN PANTI (REQUIREMENT 2)
  // ----------------------------------------------------

  // 1. Daftar Anak Asuh Panti (Admin Panti Req 2.1)
  const [pantiChildren, setPantiChildren] = useState([
    { id: 'ANK-001', name: 'Ahmad Faiz', age: '3 Tahun', gender: 'Laki-Laki', status: 'Yatim Piatu', education: 'PAUD Belum Sekolah', joinDate: '12 Jan 2023', health: 'Sehat Walafiat' },
    { id: 'ANK-002', name: 'Siti Nurhaliza', age: '6 Tahun', gender: 'Perempuan', status: 'Yatim', education: 'TK B', joinDate: '05 Mar 2022', health: 'Sehat' },
    { id: 'ANK-003', name: 'Budi Santoso', age: '14 Tahun', gender: 'Laki-Laki', status: 'Anak Terlantar', education: 'SMP Kelas 8', joinDate: '19 Aug 2021', health: 'Sehat' },
    { id: 'ANK-004', name: 'Annisa Putri', age: '10 Tahun', gender: 'Perempuan', status: 'Piatu', education: 'SD Kelas 5', joinDate: '10 Feb 2024', health: 'Sehat' }
  ]);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [newChildStatus, setNewChildStatus] = useState('Yatim Piatu');

  // 2. Input Donasi Barang Dibutuhkan & Keterangan Uang Masuk (Admin Panti Req 2.2)
  const [pantiNeededGoods, setPantiNeededGoods] = useState([
    { id: 1, item: 'Sembako Beras 10kg & Minyak', qty: '20 Paket', status: 'Mendesak' },
    { id: 2, item: 'Seragam SD/SMP Lengkap', qty: '15 Pasang', status: 'Mendesak' },
    { id: 3, item: 'Buku Tulis & Alat Sekolah', qty: '40 Paket', status: 'Tersedia Sebagian' }
  ]);

  const [pantiCashIncome, setPantiCashIncome] = useState([
    { id: 'TRX-9941', date: 'Hari ini, 11:20 WIB', donor: 'Hamba Allah (BCA)', amount: 'Rp 1.500.000', program: 'Donasi Sembako Panti' },
    { id: 'TRX-9938', date: 'Kemarin', donor: 'Bpk. Rahmat (QRIS)', amount: 'Rp 500.000', program: 'Operasional Panti' },
    { id: 'TRX-9920', date: '04 Oct 2024', donor: 'PT Mitra Mulia (Mandiri)', amount: 'Rp 10.000.000', program: 'Beasiswa Anak Asuh' }
  ]);

  const [newNeedItem, setNewNeedItem] = useState('');
  const [newNeedQty, setNewNeedQty] = useState('');

  // Handlers for Super Admin
  const handleApprovePanti = (id) => {
    setPantiRegistrations(prev => prev.map(p => p.id === id ? { ...p, status: 'Disetujui / Aktif', akreditasi: 'AKREDITASI A' } : p));
    showToast(`Panti ${id} telah DISETUJUI & Akun Admin Panti Diaktifkan!`);
  };

  const handleApproveAdopsi = (id) => {
    setAdopsiApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'SK Pengangkatan Anak Terbit (Disetujui)' } : a));
    showToast(`Permohonan Adopsi ${id} Resmi Disetujui melalui Sidang PIPA Dinsos!`);
    triggerConfetti();
  };

  const handleEskalasiReport = (id) => {
    setLostChildReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Eskalasi TRC & Kepolisian' } : r));
    showToast(`Kasus ${id} telah DIESKALASI ke Tim TRC Dinsos & Polsek setempat!`);
  };

  // Handlers for Admin Panti
  const handleAddChild = (e) => {
    e.preventDefault();
    if (!newChildName) return;
    const newChild = {
      id: `ANK-00${pantiChildren.length + 1}`,
      name: newChildName,
      age: `${newChildAge} Tahun`,
      gender: 'Laki-Laki',
      status: newChildStatus,
      education: 'SD',
      joinDate: 'Hari Ini',
      health: 'Sehat'
    };
    setPantiChildren([newChild, ...pantiChildren]);
    setShowAddChildModal(false);
    setNewChildName('');
    setNewChildAge('');
    showToast(`Anak asuh baru (${newChild.name}) berhasil ditambahkan ke database panti!`);
  };

  const handleAddGoodsNeed = (e) => {
    e.preventDefault();
    if (!newNeedItem) return;
    setPantiNeededGoods([...pantiNeededGoods, { id: Date.now(), item: newNeedItem, qty: newNeedQty || '10 Unit', status: 'Mendesak' }]);
    setNewNeedItem('');
    setNewNeedQty('');
    showToast('Kebutuhan barang panti berhasil diperbarui & ditayangkan di direktori publik!');
  };

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleExportReport = (format) => {
    showToast(`Laporan Eksekutif Dinsos Berhasil Di-export dalam format ${format}! File siap diunduh.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden', background: '#f8fafc', color: '#0f172a' }}>
      
      {/* Toast Alert Notice */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 9999,
          background: '#0b1f5c',
          color: '#ffffff',
          padding: '0.85rem 1.25rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          borderLeft: '4px solid #34d399'
        }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>{toastMsg}</span>
        </div>
      )}



      {/* WORKSPACE TOP HEADER BAR */}
      <header style={{
        background: '#0b1f5c',
        color: '#ffffff',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onSwitchToLanding && (
            <button
              onClick={onSwitchToLanding}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              ← Kembali ke Beranda Informasi
            </button>
          )}

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LayoutDashboard size={18} color="#60a5fa" /> HaloKids Dashboard Workspace
            </h3>
            <span style={{ fontSize: '0.7rem', color: '#bfdbfe' }}>
              Portal Penggunaan Fitur Interaktif • Dinas Sosial Kabupaten
            </span>
          </div>
        </div>

      </header>

      {/* DASHBOARD LAYOUT (SIDEBAR + MAIN CONTENT) */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <aside style={{
          width: '270px',
          background: '#07153b',
          color: '#cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.1)',
          height: '100%',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.25rem 1rem', overflowY: 'auto', flex: 1 }}>
            <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {dashboardRoleMode === 'user' ? 'Workspace Fitur Publik' : dashboardRoleMode === 'superadmin' ? 'Dinsos Control Center' : 'Panel Admin LKSA'}
              </h3>
              <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>
                {dashboardRoleMode === 'user' ? 'Layanan Publik Terpadu' : dashboardRoleMode === 'superadmin' ? 'Supervising 28 Panti & TRC' : 'LKSA Kasih Bunda Mandiri'}
              </span>
            </div>

            {/* USER PUBLIK MENU */}
            {dashboardRoleMode === 'user' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { id: 'adopsi', label: '1. Adopsi Resmi (Alur COTA)', icon: Heart, count: null },
                  { id: 'pengaduan', label: '2. Pengaduan & Pelaporan', icon: ShieldAlert, count: null },
                  { id: 'donasi', label: '3. Pusat Donasi Transparan', icon: Wallet, count: null },
                  { id: 'panti', label: '4. Direktori & Wishlist Panti', icon: Building2, count: null }
                ].map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setUserTab(menu.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: userTab === menu.id ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                      color: userTab === menu.id ? '#ffffff' : '#94a3b8',
                      fontWeight: userTab === menu.id ? 700 : 500,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <menu.icon size={17} color={userTab === menu.id ? '#60a5fa' : '#94a3b8'} />
                      <span>{menu.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : dashboardRoleMode === 'superadmin' ? (
              /* SUPER ADMIN MENU */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { id: 'approval_panti', label: '1. Approval & Status LKSA', icon: Building2, count: pantiRegistrations.filter(p=>p.status.includes('Menunggu')).length },
                  { id: 'supervisi_adopsi', label: '2. Supervisi Adopsi (PIPA)', icon: Users, count: adopsiApplications.length },
                  { id: 'monitoring_hilang', label: '3. Kontrol Anak Hilang', icon: ShieldAlert, count: lostChildReports.filter(r=>!r.status.includes('Selesai')).length },
                  { id: 'audit_donasi', label: '4. Audit & Map Donasi', icon: Wallet, count: null },
                  { id: 'analitik_eksekutif', label: '5. Dashboard Analitis', icon: TrendingUp, count: null }
                ].map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setSuperAdminTab(menu.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: superAdminTab === menu.id ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                      color: superAdminTab === menu.id ? '#ffffff' : '#94a3b8',
                      fontWeight: superAdminTab === menu.id ? 700 : 500,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <menu.icon size={17} color={superAdminTab === menu.id ? '#60a5fa' : '#94a3b8'} />
                      <span>{menu.label}</span>
                    </div>
                    {menu.count > 0 && (
                      <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '50px' }}>
                        {menu.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              /* ADMIN PANTI MENU */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { id: 'daftar_anak', label: '1. Daftar Anak Asuh Panti', icon: Users, count: pantiChildren.length },
                  { id: 'input_donasi', label: '2. Input Donasi & Uang Masuk', icon: Package, count: null },
                  { id: 'laporan_hilang_panti', label: '3. Pelaporan Anak Hilang', icon: ShieldAlert, count: lostChildReports.length },
                  { id: 'formulir_adopsi_panti', label: '4. Permohonan Adopsi Anak', icon: Heart, count: adopsiApplications.length },
                  { id: 'volunteer_panti', label: '5. Verifikasi Volunteer', icon: HeartHandshake, count: currentVolunteers.filter(v => v.status === 'Menunggu Persetujuan').length }
                ].map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setPantiAdminTab(menu.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: pantiAdminTab === menu.id ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                      color: pantiAdminTab === menu.id ? '#ffffff' : '#94a3b8',
                      fontWeight: pantiAdminTab === menu.id ? 700 : 500,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <menu.icon size={17} color={pantiAdminTab === menu.id ? '#60a5fa' : '#94a3b8'} />
                      <span>{menu.label}</span>
                    </div>
                    {menu.count > 0 && (
                      <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '50px' }}>
                        {menu.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, background: '#07153b' }}>
            <button
              onClick={onLogout || onSwitchToLanding}
              style={{
                width: '100%',
                padding: '0.65rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <LogOut size={16} /> Keluar Portal
            </button>
          </div>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minHeight: 0, height: '100%' }}>
          
          {/* ==================================================== */}
          {/* VIEW TYPE USER: PUBLIK USER WORKSPACE                */}
          {/* ==================================================== */}
          {dashboardRoleMode === 'user' && (
            <div>
              {/* Top User Greeting Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #0b1f5c 0%, #1d4ed8 100%)',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem 1.75rem',
                marginBottom: '1.75rem',
                boxShadow: '0 10px 25px -5px rgba(29, 78, 216, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#bfdbfe', fontSize: '0.725rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '50px' }}>
                    USER PUBLIK WORKSPACE
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.4rem 0 0.2rem 0', color: '#ffffff' }}>
                    Pusat Penggunaan Fitur Terpadu HaloKids Dinsos
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#bfdbfe', margin: 0 }}>
                    Pilih modul di sebelah kiri untuk mengurus Adopsi COTA, Melaporkan Kasus, Berdonasi, atau Memantau Panti.
                  </p>
                </div>

                <button
                  onClick={() => setUserTab('adopsi')}
                  className="btn btn-primary"
                  style={{ background: '#ffffff', color: '#0b1f5c', padding: '0.65rem 1.25rem', fontSize: '0.85rem', fontWeight: 800, border: 'none' }}
                >
                  <Heart size={16} color="#1d4ed8" fill="#1d4ed8" /> Ajukan Adopsi COTA
                </button>
              </div>

              {/* USER MODULE 1: ADOPSI RESMI (ALUR COTA) */}
              {userTab === 'adopsi' && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Heart size={22} color="#1d4ed8" fill="#1d4ed8" /> Modul Adopsi Resmi (Alur COTA)
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
                        Pengajuan izin orang tua angkat resmi, filter kelayakan otomatis, upload 5 berkas dokumen AI OCR, dan lacak status PIPA.
                      </p>
                    </div>

                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.775rem', fontWeight: 800 }}>
                      ✔ Terhubung ke Dinsos &amp; PIPA
                    </span>
                  </div>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 700, marginBottom: '1rem' }}>
                      Mulai pengajuan adopsi COTA resmi atau lacak nomor tiket pengajuan Anda melalui Modal Interaktif:
                    </p>
                    
                    <button
                      onClick={() => alert('Modul Adopsi COTA telah aktif di sistem. Silakan manfaatkan form kelayakan & upload AI OCR!')}
                      className="btn btn-primary"
                      style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 800 }}
                    >
                      🚀 Buka Window Pengajuan &amp; Tracking Adopsi COTA
                    </button>
                  </div>
                </div>
              )}

              {/* USER MODULE 2: PENGADUAN KASUS */}
              {userTab === 'pengaduan' && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={22} color="#dc2626" /> Kanal Pelaporan Pengaduan &amp; Kekerasan Anak (24/7)
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Pelaporan kekerasan fisik/psikis, eksploitasi anak, atau panti ilegal dengan proteksi 100% anonimitas saksi.
                  </p>

                  <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1.25rem', color: '#991b1b', fontSize: '0.85rem' }}>
                    <strong>📢 Panduan Pengaduan Darurat:</strong> Laporan Anda akan langsung masuk ke Dashboard Tim Reaksi Cepat (TRC) Dinsos Kabupaten dan mendapatkan Kode Tiket Rahasia untuk pelacakan live.
                  </div>
                </div>
              )}

              {/* USER MODULE 3: DONASI TRANSPARAN */}
              {userTab === 'donasi' && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Wallet size={22} color="#15803d" /> Pusat Donasi Uang &amp; Barang Transparan
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Penyaluran donasi langsung ke rekening resmi LKSA terakreditasi dan pemenuhan wishlist kebutuhan anak asuh.
                  </p>

                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', color: '#166534', fontSize: '0.85rem' }}>
                    <strong>💰 Donasi Terverifikasi:</strong> Unggah bukti transfer atau buat janji donasi barang untuk mendapatkan status "Terverifikasi" di riwayat akun donatur.
                  </div>
                </div>
              )}

              {/* USER MODULE 4: DIREKTORI PANTI */}
              {userTab === 'panti' && (
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={22} color="#1d4ed8" /> Direktori &amp; Wishlist Kebutuhan LKSA Panti
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Monitoring 28 Lembaga Kesejahteraan Sosial Anak (LKSA) berizin resmi Kemensos &amp; Dinsos Kabupaten.
                  </p>

                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', color: '#1e40af', fontSize: '0.85rem' }}>
                    <strong>🏛️ Pengawasan Berkala Dinsos:</strong> Seluruh panti terdaftar memiliki status akreditasi resmi dan laporan pengawasan berkala.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* VIEW TYPE A: SUPER ADMIN DINSOS (REQUIREMENT 3)     */}
          {/* ==================================================== */}
          {dashboardRoleMode === 'superadmin' && (
            <div>
              {/* MODULE 1: MANAJEMEN & APPROVAL AKUN ADMIN PANTI */}
              {superAdminTab === 'approval_panti' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                        1. Verifikasi Akun &amp; Legalitas LKSA Panti Asuhan
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                        Persetujuan pendaftaran panti asuhan baru dan monitoring izin operasional tingkat kabupaten.
                      </p>
                    </div>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
                      ✔ 28 Panti Terdaftar Resmi
                    </span>
                  </div>

                  {/* Table of Orphanage Approvals */}
                  <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                          <th style={{ padding: '1rem' }}>ID &amp; Nama Panti Asuhan</th>
                          <th style={{ padding: '1rem' }}>Pengurus &amp; Kontak</th>
                          <th style={{ padding: '1rem' }}>Kecamatan</th>
                          <th style={{ padding: '1rem' }}>Akreditasi / Status</th>
                          <th style={{ padding: '1rem', textAlign: 'right' }}>Aksi Approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pantiRegistrations.map((panti) => (
                          <tr key={panti.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '1rem' }}>
                              <strong style={{ color: '#0b1f5c', display: 'block' }}>{panti.name}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{panti.id} • {panti.email}</span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span>{panti.pengurus}</span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>{panti.phone}</span>
                            </td>
                            <td style={{ padding: '1rem' }}>{panti.address}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                background: panti.status.includes('Disetujui') ? '#dcfce7' : '#fef3c7',
                                color: panti.status.includes('Disetujui') ? '#15803d' : '#92400e',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '50px',
                                fontSize: '0.725rem',
                                fontWeight: 800
                              }}>
                                {panti.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              {panti.status.includes('Menunggu') ? (
                                <button
                                  onClick={() => handleApprovePanti(panti.id)}
                                  style={{ background: '#15803d', color: '#fff', border: 'none', padding: '0.45rem 0.85rem', borderRadius: '6px', fontSize: '0.775rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                  ✔ Approve / Setujui Akun
                                </button>
                              ) : (
                                <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.775rem' }}>✔ Terverifikasi Active</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* MODULE 2: SUPERVISI DATA ANAK & PENGANGKATAN ANAK (ADOPSI - PIPA) */}
              {superAdminTab === 'supervisi_adopsi' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                        2. Validasi Permohonan Adopsi Anak (Sidang PIPA Dinsos)
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                        Peninjauan legalitas berkas calon orang tua angkat dan penerbitan izin pengangkatan anak resmi.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedAdopsiApplicant(adopsiApplications[0]);
                        setShowAiAdminReviewModal(true);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '50px',
                        fontSize: '0.825rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
                      }}
                    >
                      <Bot size={16} /> Buka Panel Inspeksi AI OCR (Split-Screen)
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
                    {adopsiApplications.map((app) => (
                      <div key={app.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: '50px' }}>
                            {app.id}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: app.status.includes('Disetujui') ? '#15803d' : '#b45309', fontWeight: 700 }}>
                            {app.status}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.35rem 0' }}>
                          Pemohon: {app.applicant}
                        </h3>
                        <p style={{ fontSize: '0.825rem', color: '#475569', margin: '0 0 0.85rem 0' }}>
                          Anak Asuh Tujuan: <strong>{app.targetChild}</strong> ({app.originPanti})
                        </p>

                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.775rem', color: '#334155', marginBottom: '1rem' }}>
                          <strong>Verifikasi Dokumen PIPA:</strong>
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                            {app.docs.map((d, i) => (
                              <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                                ✔ {d}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Aksi Super Admin: Periksa Berkas AI & Sahkan SK */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                          <button
                            onClick={() => {
                              setSelectedAdopsiApplicant(app);
                              setShowAiAdminReviewModal(true);
                            }}
                            style={{
                              width: '100%',
                              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '0.825rem',
                              fontWeight: 700,
                              padding: '0.65rem 1rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Bot size={16} /> Periksa Berkas dengan AI
                          </button>

                          {!app.status.includes('Disetujui') && (
                            <button
                              onClick={() => handleApproveAdopsi(app.id)}
                              className="btn btn-primary"
                              style={{ width: '100%', borderRadius: '8px', fontSize: '0.825rem', padding: '0.6rem' }}
                            >
                              <CheckCircle2 size={16} /> Sahkan SK Pengangkatan Anak (Sidang PIPA)
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 3: MONITORING PELAPORAN ANAK HILANG & KEDARURATAN */}
              {superAdminTab === 'monitoring_hilang' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      3. Pusat Kontrol Pelaporan Anak Hilang &amp; Kedaruratan
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Memantau aduan masyarakat dan melakukan eskalasi darurat ke Tim Reaksi Cepat (TRC) Dinsos &amp; Kepolisian.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lostChildReports.map((report) => (
                      <div key={report.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <strong style={{ fontSize: '1.1rem', color: '#0b1f5c' }}>{report.childName}</strong>
                            <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '50px' }}>
                              TIKET: {report.id}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.825rem', color: '#475569', margin: '0 0 0.35rem 0' }}>
                            Pelapor: <strong>{report.reporter}</strong> • Lokasi Hilang: <strong>{report.location}</strong> ({report.date})
                          </p>
                          <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>
                            Status Penanganan: {report.status} ({report.officer})
                          </span>
                        </div>

                        {!report.status.includes('Selesai') && (
                          <button
                            onClick={() => handleEskalasiReport(report.id)}
                            style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '0.55rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <ShieldAlert size={16} /> Eskalasi Ke TRC / Kepolisian
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 4: MONITORING & TRANSPARANSI DONASI */}
              {superAdminTab === 'audit_donasi' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      4. Audit Donasi Daerah &amp; Matriks Kebutuhan Panti
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Rekapitulasi transparansi bantuan publik ke seluruh LKSA terdaftar di wilayah Kabupaten.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                          <th style={{ padding: '0.85rem' }}>LKSA Panti Asuhan</th>
                          <th style={{ padding: '0.85rem' }}>Donasi Uang Masuk</th>
                          <th style={{ padding: '0.85rem' }}>Paket Barang Diterima</th>
                          <th style={{ padding: '0.85rem' }}>Tingkat Urgensi Kebutuhan</th>
                          <th style={{ padding: '0.85rem' }}>Kebutuhan Mendesak</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionalDonationAudit.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.85rem', fontWeight: 700, color: '#0b1f5c' }}>{row.panti} ({row.location})</td>
                            <td style={{ padding: '0.85rem', color: '#15803d', fontWeight: 700 }}>{row.moneyReceived}</td>
                            <td style={{ padding: '0.85rem' }}>{row.goodsReceived}</td>
                            <td style={{ padding: '0.85rem' }}>
                              <span style={{ background: row.priorityNeed.includes('KRITIS') ? '#fee2e2' : '#fef3c7', color: row.priorityNeed.includes('KRITIS') ? '#dc2626' : '#b45309', padding: '0.2rem 0.5rem', borderRadius: '50px', fontSize: '0.725rem', fontWeight: 800 }}>
                                {row.priorityNeed}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem', fontWeight: 600 }}>{row.mainNeed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* MODULE 5: DASHBOARD ANALITIS & LAPORAN EKSEKUTIF */}
              {superAdminTab === 'analitik_eksekutif' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                        5. Dashboard Analitis &amp; Laporan Eksekutif Dinsos
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                        Ringkasan statistik kinerja pelayanan anak dan ekspor dokumen resmi.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleExportReport('PDF')} className="btn btn-primary" style={{ borderRadius: '50px', fontSize: '0.8rem' }}>
                        <Download size={15} /> Cetak Laporan PDF
                      </button>
                      <button onClick={() => handleExportReport('Excel')} className="btn btn-secondary" style={{ borderRadius: '50px', fontSize: '0.8rem' }}>
                        <FileSpreadsheet size={15} /> Export Excel
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="grid-4">
                    {[
                      { title: 'Total LKSA Terdaftar', num: '28 Panti', sub: '100% Mengantongi Tanda Daftar' },
                      { title: 'Master Data Anak Asuh', num: '1.240 Anak', sub: 'Yatim, Piatu, & Dhuafa' },
                      { title: 'Kasus Anak Hilang Selesai', num: '94%', sub: '23 Kasus Teratasi Tepat Waktu' },
                      { title: 'Pengangkatan Anak (PIPA)', num: '18 Anak', sub: 'Legalitas Resmi Terbit' }
                    ].map((box, i) => (
                      <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>{box.title}</span>
                        <strong style={{ fontSize: '1.5rem', color: '#0b1f5c', fontWeight: 800, display: 'block', marginBottom: '0.2rem' }}>{box.num}</strong>
                        <span style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 600 }}>{box.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* VIEW TYPE B: ADMIN PANTI ASUHAN (REQUIREMENT 2)     */}
          {/* ==================================================== */}
          {dashboardRoleMode === 'pantiadmin' && (
            <div>
              {/* TAB 1: DAFTAR ANAK ASUH PANTI (REQ 2.1) */}
              {pantiAdminTab === 'daftar_anak' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
                        1. Data Anak Asuh Panti (LKSA Kasih Bunda Mandiri)
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                        Kelola data anak asuh terdaftar di panti ini.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddChildModal(true)}
                      style={{ background: '#d97706', color: '#ffffff', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Plus size={16} /> Tambah Anak Asuh Baru
                    </button>
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#fef3c7', borderBottom: '1px solid #fde68a', color: '#78350f' }}>
                          <th style={{ padding: '0.85rem' }}>ID &amp; Nama Anak</th>
                          <th style={{ padding: '0.85rem' }}>Usia &amp; Gender</th>
                          <th style={{ padding: '0.85rem' }}>Status Kesejahteraan</th>
                          <th style={{ padding: '0.85rem' }}>Pendidikan &amp; Kesehatan</th>
                          <th style={{ padding: '0.85rem', textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pantiChildren.map((child) => (
                          <tr key={child.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '0.85rem' }}>
                              <strong style={{ color: '#0b1f5c', display: 'block' }}>{child.name}</strong>
                              <span style={{ fontSize: '0.725rem', color: '#64748b' }}>{child.id} • Masuk: {child.joinDate}</span>
                            </td>
                            <td style={{ padding: '0.85rem' }}>{child.age} ({child.gender})</td>
                            <td style={{ padding: '0.85rem' }}>
                              <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.725rem' }}>
                                {child.status}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem' }}>
                              <span>{child.education}</span>
                              <span style={{ fontSize: '0.725rem', color: '#059669', display: 'block' }}>✔ {child.health}</span>
                            </td>
                            <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                              <button style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                                Edit Data
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: INPUT DONASI BARANG & UANG MASUK (REQ 2.2) */}
              {pantiAdminTab === 'input_donasi' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
                      2. Input Donasi Barang Kebutuhan &amp; Rekap Uang Masuk
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Kelola daftar barang yang paling dibutuhkan panti dan pantau rekapan transfer uang masuk.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Left: Input Goods Need */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 1rem 0' }}>
                        📦 Input Barang Dibutuhkan Panti (Wishlist)
                      </h3>

                      <form onSubmit={handleAddGoodsNeed} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <input 
                          type="text" 
                          placeholder="Nama barang (contoh: Sembako, Popok, Buku)"
                          value={newNeedItem}
                          onChange={(e) => setNewNeedItem(e.target.value)}
                          style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Target Qty (misal: 20 Paket)"
                          value={newNeedQty}
                          onChange={(e) => setNewNeedQty(e.target.value)}
                          style={{ width: '130px', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ borderRadius: '8px', padding: '0.65rem 1rem' }}>
                          + Tambah
                        </button>
                      </form>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {pantiNeededGoods.map((item) => (
                          <div key={item.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong style={{ fontSize: '0.875rem', color: '#0b1f5c', display: 'block' }}>{item.item}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Target: {item.qty}</span>
                            </div>
                            <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '50px' }}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Income Cash Records */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 1rem 0' }}>
                        💰 Rekapitulasi Donasi Uang Masuk
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {pantiCashIncome.map((cash) => (
                          <div key={cash.id} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.75rem 0.85rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong style={{ fontSize: '0.9rem', color: '#1d4ed8', display: 'block' }}>{cash.amount}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#475569' }}>{cash.donor} • {cash.program}</span>
                            </div>
                            <span style={{ fontSize: '0.725rem', color: '#64748b' }}>{cash.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PELAPORAN ANAK HILANG (DARI MASYARAKAT) */}
              {pantiAdminTab === 'laporan_hilang_panti' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
                      3. Monitoring Pelaporan Anak Hilang (Publik)
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Pantau informasi anak hilang dari masyarakat untuk pencocokan dengan anak asuh di panti.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {lostChildReports.map((r) => (
                      <div key={r.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '1rem', color: '#0b1f5c' }}>{r.childName}</strong>
                          <span style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginTop: '2px' }}>
                            Pelapor: {r.reporter} • Hilang di: {r.location}
                          </span>
                        </div>
                        <button onClick={() => showToast(`Kategori pencocokan panti untuk ${r.childName} berhasil dicatat.`)} style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '0.45rem 0.85rem', borderRadius: '6px', fontSize: '0.775rem', fontWeight: 700, cursor: 'pointer' }}>
                          Cek Ditemukan di PantiIni
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: HASIL FORMULIR ADOPSI ANAK */}
              {pantiAdminTab === 'formulir_adopsi_panti' && (
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
                      4. Permohonan Adopsi dari Calon Orang Tua
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Review berkas permohonan pengangkatan anak dari masyarakat untuk diteruskan ke Dinas Sosial (PIPA).
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {adopsiApplications.map((adp) => (
                      <div key={adp.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: '#0b1f5c', display: 'block' }}>Pemohon: {adp.applicant}</strong>
                          <span style={{ fontSize: '0.825rem', color: '#475569' }}>Anak Diadopsi: <strong>{adp.targetChild}</strong></span>
                        </div>
                        <button onClick={() => showToast(`Permohonan ${adp.id} telah diverifikasi panti & diteruskan ke Sidang PIPA Dinsos!`)} style={{ background: '#d97706', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.775rem', fontWeight: 800, cursor: 'pointer' }}>
                          ✔ Verifikasi &amp; Teruskan Ke Dinsos PIPA
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: MANAJEMEN & PERSETUJUAN VOLUNTEER (REQUIREMENT 2) */}
              {pantiAdminTab === 'volunteer_panti' && (
                <div>
                  {/* Header & Subtitle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', fontSize: '0.725rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '50px' }}>
                          PANEL ADMIN PANTI • PERSETUJUAN RELAWAN
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>LKSA Kasih Bunda Mandiri</span>
                      </div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#78350f', margin: 0 }}>
                        5. Verifikasi &amp; Persetujuan Formulir Volunteer
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                        Tinjau formulir pendaftaran relawan masyarakat, periksa usia minimal dan berkas scan KTP/KTM, serta setujui atau tolak keikutsertaan.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '0.4rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}>
                        {currentVolunteers.filter(v => v.status === 'Disetujui').length} Relawan Aktif Disetujui
                      </span>
                    </div>
                  </div>

                  {/* Summary Metric Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Total Pendaftaran</span>
                      <strong style={{ fontSize: '1.4rem', color: '#0b1f5c', fontWeight: 800 }}>{currentVolunteers.length} Relawan</strong>
                      <span style={{ fontSize: '0.7rem', color: '#1d4ed8', display: 'block', marginTop: '0.2rem' }}>Pendidikan &amp; Kesenian</span>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #fde68a', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700, display: 'block' }}>Menunggu Persetujuan</span>
                      <strong style={{ fontSize: '1.4rem', color: '#d97706', fontWeight: 800 }}>
                        {currentVolunteers.filter(v => v.status === 'Menunggu Persetujuan').length} Berkas
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: '#d97706', display: 'block', marginTop: '0.2rem' }}>Perlu Ditindaklanjuti</span>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #bbf7d0', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, display: 'block' }}>Disetujui (Diterima)</span>
                      <strong style={{ fontSize: '1.4rem', color: '#16a34a', fontWeight: 800 }}>
                        {currentVolunteers.filter(v => v.status === 'Disetujui').length} Relawan
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: '#16a34a', display: 'block', marginTop: '0.2rem' }}>Siap Mengajar / Melatih</span>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #fca5a5', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, display: 'block' }}>Ditolak / Belum Memenuhi</span>
                      <strong style={{ fontSize: '1.4rem', color: '#ef4444', fontWeight: 800 }}>
                        {currentVolunteers.filter(v => v.status === 'Ditolak').length} Berkas
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: '#dc2626', display: 'block', marginTop: '0.2rem' }}>Tidak Memenuhi Syarat</span>
                    </div>
                  </div>

                  {/* Filter Tabs & Search Bar */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.85rem',
                    background: '#ffffff',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {/* Status Tabs */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {['Semua', 'Menunggu Persetujuan', 'Disetujui', 'Ditolak'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setVolunteerFilter(st)}
                          style={{
                            border: 'none',
                            padding: '0.45rem 0.9rem',
                            borderRadius: '50px',
                            fontSize: '0.775rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: volunteerFilter === st ? '#78350f' : '#f1f5f9',
                            color: volunteerFilter === st ? '#ffffff' : '#475569',
                            transition: 'all 0.15s'
                          }}
                        >
                          {st} ({st === 'Semua' ? currentVolunteers.length : currentVolunteers.filter(v => v.status === st).length})
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.4rem 0.75rem' }}>
                      <Search size={16} color="#64748b" />
                      <input
                        type="text"
                        placeholder="Cari nama relawan, nomor HP..."
                        value={volunteerSearch}
                        onChange={(e) => setVolunteerSearch(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '220px' }}
                      />
                      {volunteerSearch && (
                        <button onClick={() => setVolunteerSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* List of Volunteer Applications */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {currentVolunteers
                      .filter(v => {
                        const matchFilter = volunteerFilter === 'Semua' ? true : v.status === volunteerFilter;
                        const matchSearch = v.nama.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
                                            v.bidang.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
                                            v.nomorHp.includes(volunteerSearch);
                        return matchFilter && matchSearch;
                      })
                      .map((vol) => (
                        <div
                          key={vol.id}
                          style={{
                            background: '#ffffff',
                            border: vol.status === 'Menunggu Persetujuan' ? '1px solid #fde68a' : vol.status === 'Disetujui' ? '1px solid #bbf7d0' : '1px solid #fca5a5',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transition: 'all 0.2s'
                          }}
                        >
                          {/* Top Row: Volunteer Name, ID, Submitted Time & Status Badge */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                <strong style={{ fontSize: '1.15rem', color: '#0b1f5c' }}>{vol.nama}</strong>
                                <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                                  {vol.id}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                Diajukan: {vol.submittedAt} • Panti: <strong>{vol.pantiTujuan}</strong>
                              </span>
                            </div>

                            {/* Status Pill Badge */}
                            <div>
                              {vol.status === 'Menunggu Persetujuan' && (
                                <span style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '0.3rem 0.85rem', borderRadius: '50px', fontSize: '0.775rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <Clock size={14} /> Menunggu Persetujuan
                                </span>
                              )}
                              {vol.status === 'Disetujui' && (
                                <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '0.3rem 0.85rem', borderRadius: '50px', fontSize: '0.775rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <CheckCircle2 size={14} /> Disetujui (Diterima)
                                </span>
                              )}
                              {vol.status === 'Ditolak' && (
                                <span style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.3rem 0.85rem', borderRadius: '50px', fontSize: '0.775rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <XCircle size={14} /> Tidak Disetujui (Ditolak)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Detail Grid: Usia, Bidang, Waktu, Berkas KTP */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.825rem' }}>
                            {/* Usia & Verifikasi Batas Usia Minimal */}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              <span style={{ color: '#64748b', fontSize: '0.725rem', display: 'block', marginBottom: '0.15rem' }}>Usia Calon Relawan:</span>
                              <strong style={{ color: '#0b1f5c', fontSize: '0.95rem', display: 'block' }}>{vol.usia} Tahun</strong>
                              {vol.usia >= 17 ? (
                                <span style={{ color: '#15803d', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                                  <ShieldCheck size={13} /> Memenuhi Batas Usia Minimal (≥17)
                                </span>
                              ) : (
                                <span style={{ color: '#dc2626', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                                  <AlertTriangle size={13} /> Di Bawah Batas Usia Minimal (&lt;17)
                                </span>
                              )}
                            </div>

                            {/* Bidang Kerelawanan */}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              <span style={{ color: '#64748b', fontSize: '0.725rem', display: 'block', marginBottom: '0.15rem' }}>Bidang Kerelawanan:</span>
                              <strong style={{ color: vol.bidang.includes('Pendidikan') ? '#1d4ed8' : '#059669', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                {vol.bidang.includes('Pendidikan') ? <GraduationCap size={16} /> : <Palette size={16} />}
                                {vol.bidang}
                              </strong>
                              <span style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.2rem', display: 'block' }}>
                                {vol.bidang.includes('Pendidikan') ? 'Bimbel & Calistung' : 'Seni Kreasi & Olahraga'}
                              </span>
                            </div>

                            {/* Waktu & Tanggal */}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                              <span style={{ color: '#64748b', fontSize: '0.725rem', display: 'block', marginBottom: '0.15rem' }}>Jadwal &amp; Sesi Ketersediaan:</span>
                              <strong style={{ color: '#0b1f5c', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <Calendar size={14} color="#1d4ed8" /> {vol.tanggal}
                              </strong>
                              <span style={{ color: '#475569', fontSize: '0.725rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={12} color="#64748b" /> {vol.sesiWaktu}
                              </span>
                            </div>

                            {/* Scan KTP / KTM Button */}
                            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ color: '#64748b', fontSize: '0.725rem', display: 'block', marginBottom: '0.15rem' }}>Berkas Scan KTP / KTM:</span>
                                <strong style={{ color: '#0b1f5c', fontSize: '0.8rem', display: 'block' }}>{vol.ktpFileName}</strong>
                                <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{vol.ktpFileSize} • Terunggah</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedKtpDoc(vol)}
                                style={{
                                  marginTop: '0.4rem',
                                  background: '#eff6ff',
                                  color: '#1d4ed8',
                                  border: '1px solid #bfdbfe',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.65rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.35rem'
                                }}
                              >
                                <Eye size={13} /> Lihat Scan KTP/KTM
                              </button>
                            </div>
                          </div>

                          {/* Alamat Domisili */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px' }}>
                            <MapPin size={15} color="#1d4ed8" style={{ flexShrink: 0 }} />
                            <span><strong>Alamat Domisili:</strong> {vol.alamat}</span>
                          </div>

                          {/* Penjelasan Singkat Tujuan Kerelawanan */}
                          <div style={{ background: '#eff6ff', borderLeft: '4px solid #1d4ed8', padding: '0.85rem 1rem', borderRadius: '0 8px 8px 0' }}>
                            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#1e40af', display: 'block', marginBottom: '0.25rem' }}>
                              Tujuan &amp; Motivasi Kerelawanan dari Pendaftar:
                            </span>
                            <p style={{ fontSize: '0.825rem', color: '#1e3a8a', margin: 0, fontStyle: 'italic', lineHeight: 1.45 }}>
                              "{vol.tujuanKerelawanan}"
                            </p>
                          </div>

                          {/* ACTION BUTTONS ROW (SETUJUI / TOLAK / HUBUNGI WHATSAPP) */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                            {/* Left: Contact Volunteer via WhatsApp */}
                            <a
                              href={`https://wa.me/${vol.nomorHp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: '#22c55e',
                                color: '#ffffff',
                                padding: '0.5rem 0.9rem',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                textDecoration: 'none'
                              }}
                            >
                              <MessageCircle size={15} /> Hubungi WhatsApp ({vol.nomorHp})
                            </a>

                            {/* Right: Approval Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              {vol.status === 'Menunggu Persetujuan' && (
                                <>
                                  <button
                                    onClick={() => handleRejectVolunteer(vol)}
                                    style={{
                                      background: '#fee2e2',
                                      color: '#dc2626',
                                      border: '1px solid #fca5a5',
                                      padding: '0.55rem 1.1rem',
                                      borderRadius: '8px',
                                      fontSize: '0.825rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.4rem'
                                    }}
                                  >
                                    <X size={16} /> Tolak Pendaftaran
                                  </button>

                                  <button
                                    onClick={() => handleApproveVolunteer(vol)}
                                    style={{
                                      background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
                                      color: '#ffffff',
                                      border: 'none',
                                      padding: '0.55rem 1.35rem',
                                      borderRadius: '8px',
                                      fontSize: '0.825rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.4rem',
                                      boxShadow: '0 4px 10px rgba(22, 163, 74, 0.25)'
                                    }}
                                  >
                                    <CheckCircle2 size={16} /> Setujui Volunteer (Diterima)
                                  </button>
                                </>
                              )}

                              {vol.status === 'Disetujui' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                  <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <CheckCircle2 size={16} color="#15803d" /> Pendaftaran Telah Disetujui Panti
                                  </span>
                                  <button
                                    onClick={() => handleRejectVolunteer(vol)}
                                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.75rem', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                                  >
                                    Batalkan / Ubah ke Ditolak
                                  </button>
                                </div>
                              )}

                              {vol.status === 'Ditolak' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                  <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <XCircle size={16} color="#dc2626" /> Pendaftaran Ditolak
                                  </span>
                                  <button
                                    onClick={() => handleApproveVolunteer(vol)}
                                    style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#15803d', fontSize: '0.75rem', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                                  >
                                    Pertimbangkan Ulang &amp; Setujui
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      ))}

                    {currentVolunteers.filter(v => volunteerFilter === 'Semua' ? true : v.status === volunteerFilter).length === 0 && (
                      <div style={{ textAlign: 'center', padding: '3rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                        <HeartHandshake size={48} color="#94a3b8" style={{ margin: '0 auto 0.75rem auto' }} />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.35rem 0' }}>Tidak Ada Berkas Relawan</h4>
                        <p style={{ fontSize: '0.85rem', margin: 0 }}>Tidak ada data relawan yang cocok dengan filter status atau pencarian ini.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* MODAL: PREVIEW SCAN KTP / KTM RELAWAN */}
      {selectedKtpDoc && (
        <div className="modal-overlay" onClick={() => setSelectedKtpDoc(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                  Dokumen Identitas KTP / KTM
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{selectedKtpDoc.nama} ({selectedKtpDoc.id})</span>
              </div>
              <button onClick={() => setSelectedKtpDoc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Mock KTP / KTM Visual Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #0b1f5c 100%)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 8px 20px rgba(11,31,92,0.25)',
              marginBottom: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: '#93c5fd', letterSpacing: '0.08em', fontWeight: 800, display: 'block' }}>REPUBLIK INDONESIA</span>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>KARTU IDENTITAS RELAWAN SOSIAL</strong>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  TERVERIFIKASI
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '70px', height: '85px', background: '#3b82f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, border: '2px solid rgba(255,255,255,0.4)' }}>
                  FOTO ID
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div><strong>Nama:</strong> {selectedKtpDoc.nama}</div>
                  <div><strong>NIK/NIM:</strong> 3201************</div>
                  <div><strong>Usia:</strong> {selectedKtpDoc.usia} Tahun</div>
                  <div><strong>Domisili:</strong> {selectedKtpDoc.alamat}</div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '0.7rem', color: '#bfdbfe', display: 'flex', justifyContent: 'space-between' }}>
                <span>Berkas: {selectedKtpDoc.ktpFileName}</span>
                <span>Ukuran: {selectedKtpDoc.ktpFileSize}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={16} /> Berkas aman &amp; memenuhi validasi panti
              </span>
              <button
                onClick={() => setSelectedKtpDoc(null)}
                className="btn btn-primary"
                style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Tambah Anak Asuh Baru (Admin Panti) */}
      {showAddChildModal && (
        <div className="modal-overlay" onClick={() => setShowAddChildModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                Tambah Anak Asuh Panti
              </h3>
              <button onClick={() => setShowAddChildModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddChild} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Nama Lengkap Anak
                </label>
                <input 
                  type="text"
                  placeholder="Masukkan nama anak"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Usia (Tahun)
                </label>
                <input 
                  type="number"
                  placeholder="Contoh: 5"
                  value={newChildAge}
                  onChange={(e) => setNewChildAge(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Status Kesejahteraan
                </label>
                <select
                  value={newChildStatus}
                  onChange={(e) => setNewChildStatus(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
                >
                  <option value="Yatim Piatu">Yatim Piatu</option>
                  <option value="Yatim">Yatim</option>
                  <option value="Piatu">Piatu</option>
                  <option value="Anak Terlantar">Anak Terlantar</option>
                  <option value="Dhuafa">Dhuafa</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '50px', padding: '0.75rem', marginTop: '0.5rem' }}>
                <UserPlus size={16} /> Simpan Data Anak Asuh
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PANEL INSPEKSI AI OCR DOKUMEN COTA & DONASI */}
      {showAiAdminReviewModal && (
        <AdminDocumentReview
          isOpen={showAiAdminReviewModal}
          onClose={() => setShowAiAdminReviewModal(false)}
          selectedApplicant={selectedAdopsiApplicant}
          onApprove={(doc) => {
            if (selectedAdopsiApplicant) {
              setAdopsiApplications((prev) =>
                prev.map((a) =>
                  a.id === selectedAdopsiApplicant.id
                    ? { ...a, status: 'SK Pengangkatan Anak Terbit (Disetujui)' }
                    : a
                )
              );
              showToast(`Dokumen ${selectedAdopsiApplicant.applicant} berhasil disetujui melalui verifikasi AI!`);
            }
          }}
          onReject={(doc, reason) => {
            if (selectedAdopsiApplicant) {
              setAdopsiApplications((prev) =>
                prev.map((a) =>
                  a.id === selectedAdopsiApplicant.id
                    ? { ...a, status: 'Berkas Ditolak Sidang PIPA' }
                    : a
                )
              );
              showToast(`Dokumen ${selectedAdopsiApplicant.applicant} ditolak. BAP Sidang telah dicatat.`);
            }
          }}
          onReupload={(doc, reasons) => {
            if (selectedAdopsiApplicant) {
              setAdopsiApplications((prev) =>
                prev.map((a) =>
                  a.id === selectedAdopsiApplicant.id
                    ? { ...a, status: 'Menunggu Unggah Ulang Berkas' }
                    : a
                )
              );
              showToast(`Permintaan perbaikan berkas telah dikirim ke pemohon.`);
            }
          }}
        />
      )}

    </div>
  );
}

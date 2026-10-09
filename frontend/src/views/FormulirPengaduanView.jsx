import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Phone,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Send,
  FileText,
  UserCheck,
  MessageCircle,
  HelpCircle,
  Info,
  ChevronRight,
  Sparkles,
  Ticket,
  X,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Footer from '../components/Footer';

export default function FormulirPengaduanView({
  isLoggedIn,
  currentUser,
  onLogout,
  onToggleLoginDemo,
  onSwitchToLanding,
  onSwitchToDashboard,
  onSwitchToPanti,
  onSwitchToDonasi,
  onOpenHotline,
  onOpenLogin,
  activeTab,
  setActiveTab
}) {
  // Step form state
  const [identityMode, setIdentityMode] = useState('anonymous'); // 'anonymous' | 'open'
  const [waNumber, setWaNumber] = useState('+62 812-3456-7890');
  const [email, setEmail] = useState('nama@email.com');
  const [namaTerang, setNamaTerang] = useState('');
  const [nik, setNik] = useState('');

  // Step 2: Selected Categories
  const [selectedCategories, setSelectedCategories] = useState([
    'Kekerasan Fisik, Psikis, & Seksual'
  ]);

  // Step 3: Event details
  const [tanggal, setTanggal] = useState('2024-10-01');
  const [jam, setJam] = useState('14:30');
  const [kecamatan, setKecamatan] = useState('Kec. Cibinong');
  const [alamat, setAlamat] = useState('Contoh: Jl. Anggrek No. 12 RT 04/RW 02 (Belakang Toko Kelontong Berkah), Kelurahan Sukamaju');
  const [usiaKorban, setUsiaKorban] = useState('Balita (0 - 5 Tahun)');
  const [jumlahAnak, setJumlahAnak] = useState('1 Anak');
  const [kronologi, setKronologi] = useState(
    'Jelaskan secara runtut kejadian yang disaksikan: situasi lingkungan, kondisi fisik korban, indikasi pelaku jika diketahui, serta urgensi bantuan yang dibutuhkan segera...'
  );

  // Step 4: Files & Agreement
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'contoh_bukti_kondisi_anak.jpg', size: '1.4 MB', tag: 'EXIF Sanitized', status: 'Tersimpan' }
  ]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (catTitle) => {
    if (selectedCategories.includes(catTitle)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== catTitle));
      }
    } else {
      setSelectedCategories([...selectedCategories, catTitle]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
        tag: 'EXIF Sanitized',
        status: 'Tersimpan'
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAgreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = 'TRC-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket(ticketId);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>

      {/* Main Content Area (Full Width with comfortable side padding) */}
      <div style={{ marginTop: '1.5rem', marginBottom: '3rem', flex: 1, padding: '0 2rem', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Page Main Banner Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem 1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #0b1f5c 0%, #1d4ed8 100%)',
              color: '#ffffff',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
            }}>
              <Shield size={26} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                <span style={{ background: '#1e40af', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '4px', letterSpacing: '0.05em' }}>
                  KODE TIKET OTOMATIS
                </span>
                <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', fontSize: '0.725rem', fontWeight: 700, padding: '0.18rem 0.65rem', borderRadius: '50px' }}>
                  Respon Cepat TRC &lt; 2 Jam
                </span>
              </div>
              
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.2rem 0', fontFamily: 'var(--font-heading)' }}>
                Formulir Pengaduan Pelindungan Anak Terpadu
              </h1>
              
              <p style={{ fontSize: '0.825rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                Jaminan kerahasiaan penuh di bawah payung hukum UU No. 35/2014. Setiap laporan terhubung langsung ke Unit Siaga Reaksi Cepat (TRC) Dinas Sosial Kabupaten 24 Jam.
              </p>
            </div>
          </div>
            
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* STEP 1: PILIHAN PRIVASI & IDENTITAS PELAPOR */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      background: '#0b1f5c',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      1
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      Pilihan Privasi &amp; Identitas Pelapor
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Langkah 1 dari 4</span>
                </div>

                {/* Identity Mode Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setIdentityMode('anonymous')}
                    style={{
                      background: identityMode === 'anonymous' ? '#0b1f5c' : '#ffffff',
                      color: identityMode === 'anonymous' ? '#ffffff' : '#334155',
                      border: identityMode === 'anonymous' ? '2px solid #0b1f5c' : '1px solid #cbd5e1',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: identityMode === 'anonymous' ? '0 4px 10px rgba(11,31,92,0.2)' : 'none',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <Shield size={18} /> Mode Anonim (Rahasia 100%)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIdentityMode('open')}
                    style={{
                      background: identityMode === 'open' ? '#0b1f5c' : '#ffffff',
                      color: identityMode === 'open' ? '#ffffff' : '#334155',
                      border: identityMode === 'open' ? '2px solid #0b1f5c' : '1px solid #cbd5e1',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <UserCheck size={18} /> Identitas Terbuka (Nama Terang)
                  </button>
                </div>

                {/* Witness Protection Box */}
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '1.25rem'
                }}>
                  <ShieldCheck size={22} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e40af', margin: '0 0 0.2rem 0' }}>
                      Perlindungan Saksi Terjamin
                    </h4>
                    <p style={{ fontSize: '0.775rem', color: '#3b82f6', margin: 0, lineHeight: 1.45 }}>
                      Identitas fisik, perangkat, dan IP address Anda tidak disimpan dalam berkas publik. Direkomendasikan bagi tetangga, saksi mata, kerabat, atau anak yang berani bersuara.
                    </p>
                  </div>
                </div>

                {/* Inputs for Mode */}
                {identityMode === 'anonymous' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2-mobile">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Nomor WhatsApp Pelapor / Pendamping *
                      </label>
                      <input 
                        type="text"
                        value={waNumber}
                        onChange={(e) => setWaNumber(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                      />
                      <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                        Hanya digunakan sistem otomatis untuk mengirimkan Kode Tiket Pantau
                      </span>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Email Notifikasi Kasus (Opsional)
                      </label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                      />
                      <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                        Salinan berkas asesmen terenkripsi akan dikirim ke email ini
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2-mobile">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Nama Lengkap Sesuai KTP *
                      </label>
                      <input 
                        type="text"
                        value={namaTerang}
                        onChange={(e) => setNamaTerang(e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Nomor Telepon / WhatsApp Aktif *
                      </label>
                      <input 
                        type="text"
                        value={waNumber}
                        onChange={(e) => setWaNumber(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: KLASIFIKASI DUGAAN PELANGGARAN HAK ANAK */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      background: '#0b1f5c',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      2
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      Klasifikasi Dugaan Pelanggaran Hak Anak
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>Pilih 1 atau lebih</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.85rem' }} className="grid-2-mobile">
                  {[
                    {
                      id: 'cat1',
                      title: 'Kekerasan Fisik, Psikis, & Seksual',
                      desc: 'Penganiayaan tubuh, ancaman trauma, perundungan berat, atau pelecehan.'
                    },
                    {
                      id: 'cat2',
                      title: 'Eksploitasi & Pekerja Anak Bawah Umur',
                      desc: 'Mengemis paksa, buruh kasar berbahaya, perdagangan konten eksploitatif.'
                    },
                    {
                      id: 'cat3',
                      title: 'Panti Asuhan Ilegal / Penelantaran LKSA',
                      desc: 'Fasilitas panti tak berizin, penahanan dokumen anak, malnutrisi, manipulasi donasi.'
                    },
                    {
                      id: 'cat4',
                      title: 'Perdagangan Bayi & Adopsi Ilegal',
                      desc: 'Jual-beli bayi via medsos, pemalsuan akta kelahiran, pengalihan asuh tanpa izin Dinsos.'
                    },
                    {
                      id: 'cat5',
                      title: 'ABH - Anak Berhadapan dengan Hukum',
                      badge: 'Diversi Khusus',
                      desc: 'Perlu pendampingan Bapas/Peksos atas anak sebagai korban, saksi, maupun pelaku pidana ringan.'
                    }
                  ].map((cat) => {
                    const isChecked = selectedCategories.includes(cat.title);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => toggleCategory(cat.title)}
                        style={{
                          border: isChecked ? '2px solid #1d4ed8' : '1px solid #e2e8f0',
                          background: isChecked ? '#eff6ff' : '#f8fafc',
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#1d4ed8' }}
                          />
                          <strong style={{ fontSize: '0.85rem', color: '#0b1f5c', flex: 1 }}>{cat.title}</strong>
                          {cat.badge && (
                            <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.625rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, paddingLeft: '1.5rem', lineHeight: 1.4 }}>
                          {cat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: WAKTU, LOKASI & KRONOLOGI KEJADIAN */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      background: '#0b1f5c',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      3
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      Waktu, Lokasi &amp; Kronologi Kejadian
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Langkah 3 dari 4</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Row 1: Date, Time, District */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '0.85rem' }} className="grid-3-mobile">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Tanggal Peristiwa / Temuan *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="date"
                          value={tanggal}
                          onChange={(e) => setTanggal(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Estimasi Jam Kejadian
                      </label>
                      <input 
                        type="time"
                        value={jam}
                        onChange={(e) => setJam(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Kecamatan Wilayah *
                      </label>
                      <select
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', background: '#ffffff' }}
                      >
                        <option value="Kec. Cibinong">Kec. Cibinong</option>
                        <option value="Kec. Ciawi">Kec. Ciawi</option>
                        <option value="Kec. Gunung Putri">Kec. Gunung Putri</option>
                        <option value="Kec. Parung">Kec. Parung</option>
                        <option value="Kec. Citeureup">Kec. Citeureup</option>
                        <option value="Kec. Babakan Madang">Kec. Babakan Madang</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Address with GPS button */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Alamat Lengkap &amp; Patokan Lokasi *
                      </label>
                      <button 
                        type="button" 
                        onClick={() => alert("Menarik titik GPS lokasi terkini pelapor...")}
                        style={{ background: 'none', border: 'none', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <MapPin size={13} /> Gunakan Koordinat/GPS Saat Ini
                      </button>
                    </div>
                    <input 
                      type="text"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder="Contoh: Jl. Anggrek No. 12 RT 04/RW 02, Kelurahan Sukamaju"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                    />
                  </div>

                  {/* Row 3: Age & Count */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }} className="grid-2-mobile">
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Estimasi Usia Korban Anak
                      </label>
                      <select
                        value={usiaKorban}
                        onChange={(e) => setUsiaKorban(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', background: '#ffffff' }}
                      >
                        <option value="Balita (0 - 5 Tahun)">Balita (0 - 5 Tahun)</option>
                        <option value="Anak SD (6 - 12 Tahun)">Anak SD (6 - 12 Tahun)</option>
                        <option value="Remaja (13 - 17 Tahun)">Remaja (13 - 17 Tahun)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Perkiraan Jumlah Anak Terkena Dampak
                      </label>
                      <select
                        value={jumlahAnak}
                        onChange={(e) => setJumlahAnak(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', background: '#ffffff' }}
                      >
                        <option value="1 Anak">1 Anak</option>
                        <option value="2 - 3 Anak">2 - 3 Anak</option>
                        <option value="Lebih dari 3 Anak">Lebih dari 3 Anak</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Chronology Textarea */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                      Deskripsi Kronologi Kejadian Terperinci *
                    </label>
                    <textarea 
                      rows={4}
                      value={kronologi}
                      onChange={(e) => setKronologi(e.target.value)}
                      placeholder="Jelaskan secara runtut kejadian yang disaksikan: situasi lingkungan, kondisi fisik korban, indikasi pelaku..."
                      style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>
                      <span>Minimal 50 karakter untuk mempercepat penyelidikan TRC</span>
                      <span>Enkripsi Database Tingkat AES-256</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4: UNGGAH BUKTI & DOKUMEN DIGITAL */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      background: '#0b1f5c',
                      color: '#ffffff',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      4
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      Unggah Bukti &amp; Dokumen Digital
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Langkah 4 dari 4</span>
                </div>

                {/* Sanitization Alert Bar */}
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.775rem',
                  color: '#1e40af',
                  fontWeight: 600
                }}>
                  <Lock size={16} color="#1d4ed8" style={{ flexShrink: 0 }} />
                  <span>Sistem Otomatis: Metadata Geotag, EXIF Kamera &amp; Device Identity Otomatis Dihapus Demi Keselamatan Anda.</span>
                </div>

                {/* Drag and Drop Zone */}
                <div style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  marginBottom: '1.25rem',
                  transition: 'var(--transition-fast)'
                }}>
                  <input 
                    type="file" 
                    id="file-upload-input" 
                    multiple 
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload-input" style={{ cursor: 'pointer', display: 'block' }}>
                    <div style={{
                      background: '#e0e7ff',
                      color: '#1d4ed8',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem'
                    }}>
                      <Upload size={24} />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.35rem 0' }}>
                      Tarik &amp; Letakkan Berkas atau Klik untuk Memilih
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, maxWidth: '480px', margin: '0 auto' }}>
                      Dukungan format: Foto (JPG/PNG), Rekaman Suara (MP3/M4A), Tangkapan Layar Chat, Video pendek, atau Surat Izin Dokumen (Maks. 25 MB per berkas)
                    </p>
                  </label>
                </div>

                {/* File Category Filters Pills */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button type="button" style={{ border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
                    ⊕ Audio/Voice Memo
                  </button>
                  <button type="button" style={{ border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
                    ⊕ Dokumen Medis / Visum
                  </button>
                  <button type="button" style={{ border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
                    ⊕ Screenshots WhatsApp
                  </button>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <FileText size={18} color="#1d4ed8" />
                          <div>
                            <strong style={{ fontSize: '0.8rem', color: '#0b1f5c', display: 'block' }}>{file.name}</strong>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{file.size} — {file.tag}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.675rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                            {file.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Legal Statement Checkbox */}
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: '1.25rem'
                }}>
                  <input 
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    style={{ marginTop: '3px', cursor: 'pointer', width: '16px', height: '16px', accentColor: '#1d4ed8' }}
                  />
                  <span style={{ fontSize: '0.775rem', color: '#475569', lineHeight: 1.45 }}>
                    Saya menyatakan dengan sungguh-sungguh bahwa data dan informasi yang saya sampaikan adalah benar sesuai yang saya ketahui untuk tujuan perlindungan dan keselamatan anak, tanpa itikad mencemarkan nama baik atau laporan palsu yang dilarang undang-undang.
                  </span>
                </label>

                {/* Submit Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
                    <Lock size={14} color="#1d4ed8" />
                    <span>Protokol Enkripsi SSL 256-Bit Pemerintah Kabupaten</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!isAgreed || isSubmitting}
                    style={{
                      background: isAgreed ? 'linear-gradient(135deg, #0b1f5c 0%, #1d4ed8 100%)' : '#cbd5e1',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.85rem 1.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      cursor: isAgreed ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      boxShadow: isAgreed ? '0 4px 15px rgba(11,31,92,0.3)' : 'none',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <Send size={18} />
                    {isSubmitting ? 'Mengirim & Enkripsi...' : 'Kirim Laporan Pengaduan (Aman & Terenkripsi)'}
                  </button>
                </div>
              </div>

            </form>

            {/* Success Dialog Modal after Form Submission */}
            {submittedTicket && (
              <div className="modal-overlay" onClick={() => setSubmittedTicket(null)}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '2rem', textAlign: 'center' }}>
                  <div style={{
                    background: '#dcfce7',
                    color: '#15803d',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.5rem' }}>
                    Laporan Pengaduan Berhasil Terkirim!
                  </h3>
                  
                  <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    Sistem otomatis Satgas Reaksi Cepat (TRC) Dinas Sosial telah menerima laporan terenkripsi Anda. Simpan Kode Tiket di bawah ini:
                  </p>

                  <div style={{
                    background: '#f1f5f9',
                    border: '2px dashed #1d4ed8',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                  }}>
                    <Ticket size={24} color="#1d4ed8" />
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0b1f5c', letterSpacing: '0.08em' }}>
                      {submittedTicket}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    Kode Tiket ini digunakan untuk memantau proses tindak lanjut Pekerja Sosial Lapangan melalui Portal Lacak Status Tiket.
                  </p>

                  <button 
                    onClick={() => setSubmittedTicket(null)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Tutup &amp; Selesai
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>



      {/* Footer Portal HaloKids E-GOV */}
      <Footer 
        onOpenMap={() => {}}
        onOpenAdopsi={() => {}}
      />

    </div>
  );
}

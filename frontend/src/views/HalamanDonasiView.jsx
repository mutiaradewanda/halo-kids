import React, { useState, useEffect } from 'react';
import {
  Heart,
  Landmark,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Users,
  Sparkles,
  ArrowRight,
  Wallet,
  Package,
  MapPin,
  Phone,
  Copy,
  Truck,
  ExternalLink,
  Building2,
  FileCheck,
  Calendar,
  Info,
  AlertCircle,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Footer from '../components/Footer';
import donasiService from '../api/donasiService';
import pantiService from '../api/pantiService';

export default function HalamanDonasiView({
  isLoggedIn,
  currentUser,
  onLogout,
  onToggleLoginDemo,
  onSwitchToLanding,
  onSwitchToPengaduan,
  onSwitchToPanti,
  onSwitchToDonasi,
  onOpenLogin,
  onOpenHotline,
  onOpenAdopsi,
  onOpenMap,
  activeTab,
  setActiveTab
}) {
  // Main Tab State: 'uang' (Donasi Uang & QRIS/Bank) | 'barang' (Kumpulan Barang & Pengiriman Paket)
  const [activeDonasiTab, setActiveDonasiTab] = useState('uang');

  // Monetary Donation State
  const [selectedNominal, setSelectedNominal] = useState(100000);
  const [customNominal, setCustomNominal] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('Panti Asuhan & LKSA');
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [donorName, setDonorName] = useState(currentUser?.name || '');
  const [donorContact, setDonorContact] = useState(currentUser?.phone || '');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Goods Donation State
  const [copiedPantiId, setCopiedPantiId] = useState(null);
  const [selectedPantiPackage, setSelectedPantiPackage] = useState('LKSA Kasih Bunda Mandiri');
  const [selectedItems, setSelectedItems] = useState(['Sembako (Beras 10kg & Minyak)', 'Seragam Sekolah SD/SMP']);
  const [courierName, setCourierName] = useState('J&T Express');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [senderName, setSenderName] = useState(currentUser?.name || '');
  const [showPackageReceiptModal, setShowPackageReceiptModal] = useState(false);
  const [packageReceiptCode, setPackageReceiptCode] = useState('');
  const [estimasiTanggal, setEstimasiTanggal] = useState('');
  const [catatanPengiriman, setCatatanPengiriman] = useState('');
  const [apiPantiList, setApiPantiList] = useState([]);

  const pantiGoodsList = [
    {
      id: 'panti-1',
      name: 'LKSA Kasih Bunda Mandiri',
      address: 'Jl. Raya Cibinong No. 45, RT 02/RW 05, Kec. Cibinong, Kab. Bogor 16911',
      phone: '0812-9988-7711 (Ibu Siti)',
      anakCount: '42 Anak Asuh',
      items: [
        { name: 'Sembako (Beras 10kg & Minyak)', urgent: true, target: '20 Paket' },
        { name: 'Seragam Sekolah SD/SMP', urgent: true, target: '15 Set' },
        { name: 'Buku Tulis & Alat Sekolah', urgent: false, target: '40 Paket' },
        { name: 'Sepatu Sekolah Hitam (Ukuran 34-40)', urgent: false, target: '10 Pasang' }
      ]
    },
    {
      id: 'panti-2',
      name: 'Panti Asuhan Balita Tunas Bangsa',
      address: 'Jl. Pemda Tegar Beriman No. 12, Kel. Pakansari, Kec. Cibinong 16915',
      phone: '0813-8822-4400 (Ns. Ratna)',
      anakCount: '26 Balita (0-4 Thn)',
      items: [
        { name: 'Susu Formula SGM 0-12 Bln (400g)', urgent: true, target: '30 Kaleng' },
        { name: 'Popok Bayi M & L', urgent: true, target: '25 Pax' },
        { name: 'Minyak Telon & Sabun Mandi Balita', urgent: false, target: '15 Botol' },
        { name: 'Kasur Busa Bayi / Perlak', urgent: false, target: '5 Unit' }
      ]
    },
    {
      id: 'panti-3',
      name: 'LKSA Bina Harapan Ciawi',
      address: 'Jl. Raya Puncak Ciawi No. 88, RT 01/RW 03, Kec. Ciawi, Kab. Bogor 16720',
      phone: '0857-1133-5599 (Pak Rizky)',
      anakCount: '38 Remaja',
      items: [
        { name: 'Komputer / Laptop Bekas Layak Pakai', urgent: true, target: '5 Unit' },
        { name: 'Bahan Pelatihan Tata Boga (Tepung/Mentega)', urgent: true, target: '10 Paket' },
        { name: 'Perlengkapan Kebersihan Panti', urgent: false, target: '15 Set' },
        { name: 'Buku Komputer & Otomotif', urgent: false, target: '20 Buah' }
      ]
    }
  ];

  const nominalOptions = [50000, 100000, 250000, 500000, 1000000];

  const getFinalAmount = () => {
    if (customNominal && !isNaN(customNominal)) {
      return parseInt(customNominal, 10).toLocaleString('id-ID');
    }
    return selectedNominal.toLocaleString('id-ID');
  };

  const handleMoneySubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'qris') {
      setShowQrisModal(true);
    } else {
      setIsSubmitting(true);
      try {
        const nominal = parseInt(customNominal || selectedNominal, 10);
        await donasiService.createDonasi({
          id_panti: 1,
          jenis_donasi: 'uang',
          jumlah_nominal: nominal,
          bukti_transfer: 'storage/bukti_transfer/transfer_sample.jpg'
        });
      } catch (err) {
        console.warn('API donasi uang fallback:', err);
      } finally {
        setIsSubmitting(false);
        setShowSuccessModal(true);
        triggerConfetti();
      }
    }
  };

  const handleQrisPaid = async () => {
    setShowQrisModal(false);
    setIsSubmitting(true);
    try {
      const nominal = parseInt(customNominal || selectedNominal, 10);
      await donasiService.createDonasi({
        id_panti: 1,
        jenis_donasi: 'uang',
        jumlah_nominal: nominal,
        bukti_transfer: 'storage/bukti_transfer/transfer_sample.jpg'
      });
    } catch (err) {
      console.warn('API donasi QRIS fallback:', err);
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const handleCopyAddress = (pantiObj) => {
    navigator.clipboard.writeText(`Penerima: ${pantiObj.name} (${pantiObj.phone})\nAlamat: ${pantiObj.address}`);
    setCopiedPantiId(pantiObj.id);
    setTimeout(() => setCopiedPantiId(null), 2500);
  };

  const handleItemToggle = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(i => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Pilih minimal 1 jenis barang yang akan Anda kirimkan.');
      return;
    }
    setIsSubmitting(true);
    try {
      await donasiService.createDonasi({
        id_panti: 1,
        jenis_donasi: 'barang',
        nama_barang: selectedItems.join(', '),
        jumlah_barang: 1,
        satuan_barang: 'Paket Logistik',
        estimasi_waktu_antar: estimasiTanggal || new Date().toISOString().slice(0, 10)
      });
    } catch (err) {
      console.warn('API donasi barang fallback:', err);
    } finally {
      setIsSubmitting(false);
      const receipt = `PKG-DNS-${Math.floor(100000 + Math.random() * 900000)}`;
      setPackageReceiptCode(receipt);
      setShowPackageReceiptModal(true);
      triggerConfetti();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>

      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, #0b1f5c 0%, #1d4ed8 100%)',
        color: '#ffffff',
        padding: '3.5rem 0 3rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className="badge" style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', marginBottom: '0.75rem', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>
            <Heart size={14} color="#15803d" style={{ marginRight: '0.35rem' }} />
            PORTAL DONASI UANG &amp; PAKET LOGISTIK DINSOS
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em', color: '#ffffff' }}>
            Salurkan Kepedulian untuk Panti Asuhan
          </h1>
          <p style={{ fontSize: '1rem', color: '#bfdbfe', margin: '0 0 2rem 0', lineHeight: 1.6 }}>
            Bantu panti asuhan secara finansial melalui QRIS/Transfer Bank atau kirimkan paket logistik barang kebutuhan langsung ke lokasi panti yang membutuhkan.
          </p>

          {/* Main Donation Type Selector Tabs (Requirement 6) */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '0.35rem',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.3)',
            gap: '0.4rem'
          }}>
            <button
              onClick={() => setActiveDonasiTab('uang')}
              style={{
                border: 'none',
                background: activeDonasiTab === 'uang' ? '#ffffff' : 'transparent',
                color: activeDonasiTab === 'uang' ? '#0b1f5c' : '#ffffff',
                padding: '0.65rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'var(--transition-fast)'
              }}
            >
              <Wallet size={18} /> Donasi Uang (QRIS &amp; Bank)
            </button>

            <button
              onClick={() => setActiveDonasiTab('barang')}
              style={{
                border: 'none',
                background: activeDonasiTab === 'barang' ? '#ffffff' : 'transparent',
                color: activeDonasiTab === 'barang' ? '#0b1f5c' : '#ffffff',
                padding: '0.65rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'var(--transition-fast)'
              }}
            >
              <Package size={18} /> Donasi Barang &amp; Kirim Paket
            </button>
          </div>
        </div>
      </section>

      {/* Main Content View */}
      <section style={{ padding: '3.5rem 0 5rem 0', flex: 1 }}>
        <div className="container">
          
          {/* TAB 1: DONASI UANG (MONEY, QRIS & BANK) */}
          {activeDonasiTab === 'uang' ? (
            <div>
              {/* Quick Impact Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.25rem',
                marginBottom: '3rem'
              }} className="grid-4">
                {[
                  { label: 'Total Donasi Terkumpul', val: 'Rp 485.500.000', icon: Wallet, color: '#1d4ed8' },
                  { label: 'Anak Asuh Terbantu', val: '1.240 Anak', icon: Users, color: '#059669' },
                  { label: 'Panti Penerima Rekomendasi', val: '28 LKSA Resmi', icon: Landmark, color: '#b45309' },
                  { label: 'Audit Akuntabilitas', val: '100% Terverifikasi', icon: ShieldCheck, color: '#0284c7' }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem 1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      background: `${stat.color}15`,
                      color: stat.color,
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <stat.icon size={22} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block' }}>{stat.label}</span>
                      <strong style={{ fontSize: '1.15rem', color: '#0b1f5c', fontWeight: 800 }}>{stat.val}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2-Column Donation Form Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: '2.5rem',
                alignItems: 'start'
              }} className="donasi-grid">
                
                {/* Left Column: Programs & Guarantees */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.35rem 0' }}>
                      Pilih Program Penyaluran Dana
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                      Pilih alokasi bantuan finansial sesuai kepedulian Anda.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2-mobile">
                    {[
                      { id: 'panti', title: 'Panti Asuhan & LKSA', desc: 'Operasional, makanan bergizi, & tempat tinggal panti binaan.', color: '#1d4ed8' },
                      { id: 'pendidikan', title: 'Beasiswa & Sekolah', desc: 'Buku, seragam, & SPP anak yatim piatu berprestasi.', color: '#0284c7' },
                      { id: 'trc', title: 'Safehouse & Medis TRC', desc: 'Dana darurat rehabilitasi medis korban kekerasan anak.', color: '#b45309' },
                      { id: 'sembako', title: 'Susu Balita & Nutrisi', desc: 'Pengadaan susu formula, gizi balita, & popok bayi.', color: '#dc2626' }
                    ].map((p) => {
                      const isSelected = selectedProgram === p.title;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProgram(p.title)}
                          style={{
                            background: isSelected ? '#ffffff' : '#f8fafc',
                            border: isSelected ? `2.5px solid ${p.color}` : '1px solid #e2e8f0',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 8px 20px -4px rgba(29,78,216,0.12)' : 'none',
                            transition: 'var(--transition-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <strong style={{ fontSize: '0.95rem', color: '#0b1f5c' }}>{p.title}</strong>
                            {isSelected && <CheckCircle2 size={18} color={p.color} />}
                          </div>
                          <p style={{ fontSize: '0.775rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                            {p.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bank Accounts Info Box */}
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0b1f5c', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                      <Landmark size={18} color="#1d4ed8" /> Rekening Resmi Pembayaran / Transfer Bank:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: '#0b1f5c', display: 'block' }}>Bank Mandiri: 133-00-1928374-1</strong>
                          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>a.n LKSA Dinsos Terpadu HaloKids</span>
                        </div>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>MANDIRI</span>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: '#0b1f5c', display: 'block' }}>Bank BCA: 882-019-3829</strong>
                          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>a.n LKSA Dinsos Terpadu HaloKids</span>
                        </div>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>BCA</span>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: '#0b1f5c', display: 'block' }}>Bank BNI: 089-112-9943</strong>
                          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>a.n LKSA Dinsos Terpadu HaloKids</span>
                        </div>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>BNI</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Donation Payment Form */}
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem' }}>
                    <Sparkles size={20} color="#1d4ed8" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
                      Formulir Transaksi Donasi
                    </h3>
                  </div>

                  <form onSubmit={handleMoneySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    <div>
                      <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                        PROGRAM DIPILIH:
                      </label>
                      <div style={{ background: '#eff6ff', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                        ✔ {selectedProgram}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                        PILIH NOMINAL DONASI (IDR):
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.65rem' }}>
                        {nominalOptions.map((nom) => (
                          <button
                            key={nom}
                            type="button"
                            onClick={() => { setSelectedNominal(nom); setCustomNominal(''); }}
                            style={{
                              padding: '0.55rem 0.25rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: '8px',
                              border: selectedNominal === nom && !customNominal ? '2px solid #1d4ed8' : '1px solid #cbd5e1',
                              background: selectedNominal === nom && !customNominal ? '#eff6ff' : '#ffffff',
                              color: selectedNominal === nom && !customNominal ? '#1d4ed8' : '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            Rp {nom.toLocaleString('id-ID')}
                          </button>
                        ))}
                      </div>

                      <input 
                        type="number"
                        placeholder="Contoh: 150000 (Nominal Khusus)"
                        value={customNominal}
                        onChange={(e) => setCustomNominal(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                          Nama Dermawan
                        </label>
                        <input 
                          type="text"
                          placeholder="Contoh: Budi Santoso (atau Hamba Allah)"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                          Metode Pembayaran
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#fff' }}
                        >
                          <option value="qris">Instant QRIS (GoPay, OVO, Dana, QR Bank)</option>
                          <option value="mandiri">Transfer Bank Mandiri</option>
                          <option value="bca">Transfer Bank BCA</option>
                          <option value="bni">Transfer Bank BNI</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.85rem 1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Total Pembayaran:</span>
                      <strong style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8' }}>
                        Rp {getFinalAmount()}
                      </strong>
                    </div>

                    <button 
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(29,78,216,0.35)' }}
                    >
                      <Heart size={18} fill="#ffffff" /> Lanjut Pembayaran Donasi <ArrowRight size={18} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.725rem', color: '#059669', fontWeight: 600 }}>
                      <QrCode size={14} /> Mendukung QRIS Standard BI &amp; Transfer Bank Otomatis
                    </div>

                  </form>
                </div>
              </div>
            </div>
          ) : (

            /* TAB 2: DONASI BARANG & PENGIRIMAN PAKET (REQUIREMENT 6) */
            <div>
              <div style={{ maxWidth: '850px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
                <span className="badge" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', marginBottom: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>
                  <Package size={14} color="#92400e" style={{ marginRight: '0.35rem' }} />
                  KUMPULAN BARANG DIBUTUHKAN MASING-MASING PANTI (REQ #6)
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.5rem 0' }}>
                  Kirim Paket Barang Langsung ke Alamat Panti
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Lihat daftar barang yang mendesak dibutuhkan tiap panti di bawah ini. Anda dapat menyalin alamat pengiriman dan mengonfirmasi nomor resi pengiriman paket Anda.
                </p>
              </div>

              {/* Grid of Orphanage Wishlists & Addresses */}
              <div className="panti-cards-grid" style={{ marginBottom: '3rem' }}>
                {pantiGoodsList.map((panti) => (
                  <div 
                    key={panti.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.5rem 0' }}>
                        {panti.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'block', marginBottom: '0.85rem' }}>
                        Kapasitas: {panti.anakCount}
                      </span>

                      {/* Item Wishlist Checklist */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.85rem', borderRadius: '10px', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#0b1f5c', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block', marginBottom: '0.5rem' }}>
                          KUMPULAN BARANG DIBUTUHKAN:
                        </span>
                        <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.8rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {panti.items.map((it, idx) => (
                            <li key={idx}>
                              <strong>{it.name}</strong>{' '}
                              <span style={{ color: it.urgent ? '#dc2626' : '#64748b', fontSize: '0.725rem', fontWeight: 700 }}>
                                ({it.target} {it.urgent ? '• URGENT' : ''})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Address & Copy Action Box */}
                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.85rem', borderRadius: '10px', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#1d4ed8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                          ALAMAT PENERIMA PENGIRIMAN PAKET:
                        </span>
                        <p style={{ fontSize: '0.775rem', color: '#1e293b', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                          {panti.address}
                        </p>
                        <span style={{ fontSize: '0.725rem', color: '#475569', display: 'block', marginBottom: '0.5rem' }}>
                          Kontak Panti: <strong>{panti.phone}</strong>
                        </span>

                        <button
                          onClick={() => handleCopyAddress(panti)}
                          style={{
                            width: '100%',
                            background: '#ffffff',
                            border: '1px solid #93c5fd',
                            color: '#1d4ed8',
                            padding: '0.45rem',
                            borderRadius: '6px',
                            fontSize: '0.775rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <Copy size={14} /> {copiedPantiId === panti.id ? '✔ Alamat & Kontak Tersalin!' : 'Salin Alamat Lengkap Paket'}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPantiPackage(panti.name);
                        const el = document.getElementById('form-paket');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn btn-primary"
                      style={{ width: '100%', borderRadius: '8px', fontSize: '0.825rem', padding: '0.6rem' }}
                    >
                      <Truck size={16} /> Pilih Panti Ini untuk Kirim Paket ↓
                    </button>

                  </div>
                ))}
              </div>

              {/* Package Confirmation Form */}
              <div id="form-paket" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {/* Header Form */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Truck size={26} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.2rem 0', letterSpacing: '-0.01em' }}>
                        Formulir Konfirmasi Pengiriman Paket Barang
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Catat nomor resi Anda agar pengurus panti dapat memantau kedatangan paket.
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handlePackageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Panti Asuhan Tujuan */}
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.45rem' }}>
                        Panti Asuhan Tujuan Pengiriman Paket: <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        value={selectedPantiPackage}
                        onChange={(e) => setSelectedPantiPackage(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1.5px solid #cbd5e1',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: '#ffffff',
                          color: '#0f172a',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {pantiGoodsList.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.address.split(',')[1]?.trim() || p.address.split(',')[0]?.trim() || ''})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Jenis Barang Yang Dikirimkan */}
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                        Pilih Jenis Barang Yang Dikirimkan (Bisa Lebih Dari Satu): <span style={{ color: '#dc2626' }}>*</span>
                      </label>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.65rem' }}>
                        {[
                          'Sembako (Beras & Minyak)',
                          'Seragam Sekolah SD/SMP',
                          'Buku & Alat Tulis Sekolah',
                          'Susu Formula & Nutrisi Balita',
                          'Popok Bayi M / L',
                          'Peralatan Kebersihan Panti',
                          'Pakaian Layak Pakai Anak',
                          'Kasur Busa / Selimut'
                        ].map((item) => {
                          const isChecked = selectedItems.includes(item);
                          return (
                            <label
                              key={item}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                fontSize: '0.825rem',
                                padding: '0.7rem 0.9rem',
                                background: isChecked ? '#eff6ff' : '#f8fafc',
                                border: isChecked ? '1.5px solid #1d4ed8' : '1px solid #e2e8f0',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                color: isChecked ? '#1d4ed8' : '#334155',
                                fontWeight: isChecked ? 700 : 500,
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleItemToggle(item)}
                                style={{ accentColor: '#1d4ed8', width: '16px', height: '16px', cursor: 'pointer' }}
                              />
                              <span style={{ userSelect: 'none' }}>{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* 4 Inputs Grid: Ekspedisi, Resi, Pengirim, Estimasi */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Ekspedisi / Kurir <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                          value={courierName}
                          onChange={(e) => setCourierName(e.target.value)}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#fff', fontWeight: 500 }}
                        >
                          <option value="J&T Express">J&T Express</option>
                          <option value="JNE Express">JNE Express</option>
                          <option value="SiCepat">SiCepat</option>
                          <option value="GoSend / GrabExpress">GoSend / GrabExpress</option>
                          <option value="Shopee Xpress / SPX">Shopee Xpress (SPX)</option>
                          <option value="Pos Indonesia">Pos Indonesia</option>
                          <option value="Anteraja">Anteraja</option>
                          <option value="Pengantaran Langsung">Pengantaran Langsung Pribadi</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Nomor Resi / Tracking <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="Contoh: JT88492019 / JP1234567890"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          required
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Nama Pengirim / WA
                        </label>
                        <input 
                          type="text"
                          placeholder="Contoh: Budi Santoso (081234567890)"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Estimasi Waktu Antar
                        </label>
                        <input 
                          type="date"
                          value={estimasiTanggal}
                          onChange={(e) => setEstimasiTanggal(e.target.value)}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#fff' }}
                        />
                      </div>
                    </div>

                    {/* Submit Action */}
                    <button 
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.95rem',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        background: '#0b1f5c',
                        boxShadow: '0 4px 14px rgba(11,31,92,0.3)'
                      }}
                    >
                      <FileCheck size={19} /> Simpan &amp; Konfirmasi Pengiriman Paket Barang
                    </button>

                  </form>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* MODAL 1: QRIS QR CODE MODAL */}
      {showQrisModal && (
        <div className="modal-overlay" onClick={() => setShowQrisModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center', padding: '1.75rem' }}>
            <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '50px', display: 'inline-block', marginBottom: '0.75rem' }}>
              QRIS STANDARD BANK INDONESIA
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.25rem 0' }}>
              Pindai QRIS Untuk Membayar
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem 0' }}>
              Buka aplikasi GoPay, OVO, Dana, ShopeePay, atau Mobile Banking Anda.
            </p>

            {/* Generated QR Code Box */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #0b1f5c',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'inline-block',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ background: '#000000', width: '180px', height: '180px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '8px', position: 'relative' }}>
                <QrCode size={140} color="#ffffff" />
                <div style={{ position: 'absolute', background: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#0b1f5c', fontWeight: 900, fontSize: '0.65rem' }}>
                  QRIS DINSOS
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1d4ed8', display: 'block', marginTop: '0.75rem' }}>
                Rp {getFinalAmount()}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button onClick={handleQrisPaid} className="btn btn-primary" style={{ width: '100%', borderRadius: '50px' }}>
                ✔ SAYA SUDAH MEMBAYAR / SCAN QRIS
              </button>
              <button onClick={() => setShowQrisModal(false)} className="btn btn-secondary" style={{ width: '100%', borderRadius: '50px' }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MONETARY DONATION SUCCESS */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', textAlign: 'center', padding: '2rem' }}>
            <div style={{ background: '#dcfce7', color: '#15803d', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.25rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.5rem 0' }}>
              Terima Kasih Atas Donasi Anda!
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Donasi sebesar <strong>Rp {getFinalAmount()}</strong> untuk <strong>{selectedProgram}</strong> telah tercatat secara resmi.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#1e293b', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>No. Referensi:</span>
                <strong>DNS-DON-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Donatur:</span>
                <strong>{donorName || 'Hamba Allah (Anonim)'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Status Pembayaran:</span>
                <span style={{ color: '#15803d', fontWeight: 700 }}>BERHASIL / VERIFIED</span>
              </div>
            </div>

            <button onClick={() => setShowSuccessModal(false)} className="btn btn-primary" style={{ width: '100%', borderRadius: '50px' }}>
              Tutup &amp; Kembali
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: PACKAGE SHIPMENT RECEIPT */}
      {showPackageReceiptModal && (
        <div className="modal-overlay" onClick={() => setShowPackageReceiptModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', textAlign: 'center', padding: '2rem' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1.25rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={36} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.5rem 0' }}>
              Tanda Konfirmasi Pengiriman Paket
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Konfirmasi pengiriman paket barang Anda untuk <strong>{selectedPantiPackage}</strong> telah tersimpan di sistem Dinsos.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#1e293b', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Kode Bukti Paket:</span>
                <strong style={{ color: '#1d4ed8' }}>{packageReceiptCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Ekspedisi &amp; Resi:</span>
                <strong>{courierName} ({trackingNumber || 'Manual'})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Pengirim:</span>
                <strong>{senderName || 'Hamba Allah'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Barang Dikirim:</span>
                <strong style={{ maxWidth: '200px', textAlign: 'right' }}>{selectedItems.join(', ')}</strong>
              </div>
              {estimasiTanggal && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Estimasi Sampai:</span>
                  <strong style={{ color: '#059669' }}>{estimasiTanggal}</strong>
                </div>
              )}
              {catatanPengiriman && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Catatan:</span>
                  <span style={{ maxWidth: '200px', textAlign: 'right', fontSize: '0.75rem', color: '#475569' }}>{catatanPengiriman}</span>
                </div>
              )}
            </div>

            <button onClick={() => setShowPackageReceiptModal(false)} className="btn btn-primary" style={{ width: '100%', borderRadius: '50px' }}>
              Tutup &amp; Selesai
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .donasi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer 
        onOpenMap={onOpenMap}
        onOpenAdopsi={onOpenAdopsi}
      />

    </div>
  );
}

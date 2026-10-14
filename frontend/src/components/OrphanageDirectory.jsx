import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Users, Calendar, Award, Phone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { pantiService } from '../api';

export default function OrphanageDirectory({ onSelectPanti, isLoggedIn, onOpenLogin }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [dynamicPantiList, setDynamicPantiList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadPanti() {
      try {
        const res = await pantiService.getPublicPantiList();
        if (isMounted && Array.isArray(res) && res.length > 0) {
          const mapped = res.map((p, idx) => ({
            id: p.id,
            name: p.nama_panti,
            category: p.jumlah_anak_saat_ini <= 30 ? 'Balita' : 'Anak',
            akreditasi: p.status_akreditasi ? `AKREDITASI ${p.status_akreditasi} KEMENSOS` : 'TERDAFTAR RESMI',
            regNo: `NO: ${p.id}/LKSA/DINSOS/2024`,
            image: p.foto_panti || (idx % 2 === 0 ? '/lksa1.jpg' : '/lksa2.jpg'),
            location: p.alamat ? p.alamat.slice(0, 35) + '...' : 'Kabupaten Bogor',
            anakCount: `${p.jumlah_anak_saat_ini || 0} Anak`,
            usia: '0 - 18 Thn',
            highlight: p.deskripsi ? p.deskripsi.slice(0, 50) + '...' : 'Panti terakreditasi resmi Dinsos',
            phone: p.nomor_kontak || '0812-9988-7711',
            address: p.alamat || 'Alamat panti asuhan',
            bank: p.rekening_bank ? `${p.nama_bank || 'Bank'}: ${p.rekening_bank}` : 'Bank Mandiri: 133-00-1928374-1',
            desc: p.deskripsi || 'Lembaga Kesejahteraan Sosial Anak terakreditasi Kemensos.'
          }));
          setDynamicPantiList(mapped);
        }
      } catch (err) {
        // Fallback to initial local data
      }
    }
    loadPanti();
    return () => { isMounted = false; };
  }, []);

  const pantiData = [
    {
      id: 'lksa-1',
      name: 'LKSA Kasih Bunda Mandiri',
      category: 'Anak',
      akreditasi: 'AKREDITASI A KEMENSOS',
      regNo: 'NO: 408/LKSA/DINSOS/2023',
      image: '/lksa1.jpg',
      location: 'Kecamatan Cibinong • 1.2km dari Pusat Kota',
      anakCount: '42 Anak',
      usia: '5 - 17 Thn',
      highlight: 'Keutamaan: Pembinaan Umat & Pendidikan Formal',
      phone: '0812-9988-7711',
      address: 'Jl. Raya Cibinong No. 45, Kab. Bogor',
      bank: 'Bank Mandiri: 133-00-1928374-1 a.n LKSA Kasih Bunda',
      desc: 'LKSA Kasih Bunda Mandiri menyediakan fasilitas asrama lengkap, pendampingan belajar, program beasiswa sekolah formal, dan bimbingan rohani berkualitas.'
    },
    {
      id: 'lksa-2',
      name: 'Panti Asuhan Balita Tunas Bangsa',
      category: 'Balita',
      akreditasi: 'AKREDITASI A KEMENSOS',
      regNo: 'NO: 409/LKSA/DINSOS/2023',
      image: '/lksa2.jpg',
      location: 'Kecamatan Cibinong • 1.8km dari Kantor Bupati',
      anakCount: '26 Balita',
      usia: '0 - 4 Thn',
      highlight: 'Keutamaan: Pengasuhan Balita & Nutrisi Gizi',
      phone: '0813-8822-4400',
      address: 'Jl. Pemda Tegar Beriman No. 12, Cibinong',
      bank: 'Bank BNI: 089-112-9943 a.n Yayasan Tunas Bangsa',
      desc: 'Khusus mengasuh bayi dan anak balita terlantar dengan pendampingan perawat medis 24 jam, pemantauan tumbuh kembang anak, dan nutrisi gizi terjamin.'
    },
    {
      id: 'lksa-3',
      name: 'LKSA Bina Harapan Ciawi',
      category: 'Remaja',
      akreditasi: 'AKREDITASI B KEMENSOS',
      regNo: 'NO: 410/LKSA/DINSOS/2023',
      image: '/lksa3.jpg',
      location: 'Kecamatan Ciawi • Koridor Jalur Puncak',
      anakCount: '38 Remaja',
      usia: '12 - 18 Thn',
      highlight: 'Keutamaan: Keterampilan Vokasi & Komputer',
      phone: '0857-1133-5599',
      address: 'Jl. Raya Puncak Ciawi No. 88',
      bank: 'Bank BRI: 0012-01-098765-53-0 a.n LKSA Bina Harapan',
      desc: 'Fokus pembinaan usia remaja menuju kemandirian. Dilengkapi fasilitas lab komputer, pelatihan tata boga, perbengkelan, serta kesiapan kerja.'
    }
  ];

  const dataSource = dynamicPantiList.length > 0 ? dynamicPantiList : pantiData;

  const filteredPanti = activeCategory === 'Semua' 
    ? dataSource 
    : dataSource.filter(p => p.category === activeCategory);

  return (
    <section id="direktori-panti" style={{ padding: '4rem 0', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>
              LEMBAGA KESEJAHTERAAN SOSIAL ANAK (LKSA)
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
              Panti Asuhan Terakreditasi Unggulan
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.35rem' }}>
              Daftar panti asuhan yang diawasi berkala dan telah mengantongi Tanda Daftar LKSA Kabupaten resmi.
            </p>
          </div>

          {/* Filter Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: '50px' }}>
            {['Semua', 'Balita', 'Anak', 'Remaja'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: 'none',
                  background: activeCategory === cat ? '#0b1f5c' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : '#64748b',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid-3">
          {filteredPanti.map((panti) => (
            <div 
              key={panti.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-normal)'
              }}
              className="panti-card-hover"
            >
              {/* Card Image Header */}
              <div style={{ position: 'relative', height: '210px', background: '#f1f5f9' }}>
                <img 
                  src={panti.image} 
                  alt={panti.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Accreditation Badges Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  display: 'flex',
                  gap: '0.4rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: '#0b1f5c',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {panti.akreditasi}
                  </span>
                  <span style={{
                    background: '#1e40af',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px'
                  }}>
                    {panti.regNo}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.35rem' }}>
                    {panti.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.8rem' }}>
                    <MapPin size={15} color="#1d4ed8" />
                    <span>{panti.location}</span>
                  </div>
                </div>

                {/* Stats Table / Box inside Card */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block' }}>
                      Jumlah Anak Asuh
                    </span>
                    <strong style={{ fontSize: '1rem', color: '#1d4ed8' }}>
                      {panti.anakCount}
                    </strong>
                  </div>

                  <div style={{ borderLeft: '1px solid #cbd5e1' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block' }}>
                      Rentang Usia
                    </span>
                    <strong style={{ fontSize: '1rem', color: '#0b1f5c' }}>
                      {panti.usia}
                    </strong>
                  </div>
                </div>

                {/* Advantage Highlight */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: '#047857', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{panti.highlight}</span>
                </div>
              </div>

              {/* Card Action Buttons (Bottom Bar) - Hanya tampil jika Pengguna Sudah Login */}
              {isLoggedIn && (
                <div style={{
                  padding: '1rem 1.25rem',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.2fr',
                  gap: '0.65rem'
                }}>
                  <button 
                    onClick={() => onSelectPanti(panti)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0b1f5c',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    Lihat Profil
                  </button>

                  <button 
                    onClick={() => onSelectPanti(panti)}
                    style={{
                      background: '#0b1f5c',
                      border: 'none',
                      color: '#ffffff',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <Phone size={14} /> Donasi / Kontak
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .panti-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }
      `}</style>
    </section>
  );
}

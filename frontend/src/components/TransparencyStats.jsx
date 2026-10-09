import React from 'react';
import { ShieldCheck, Scale, Home, Zap, RefreshCw, Info } from 'lucide-react';

export default function TransparencyStats() {
  const stats = [
    {
      id: 'kelembagaan',
      category: 'STATUS KELEMBAGAAN',
      val: '100%',
      valSuffix: 'Resmi',
      desc: '28 LKSA terakreditasi & mempunyai sertifikasi kelembagaan Dinsos & Kementerian Sosial.',
      icon: ShieldCheck,
      color: '#1d4ed8',
      bgColor: '#eff6ff',
      progress: 100
    },
    {
      id: 'advokasi',
      category: 'ADVOKASI BERJALAN',
      val: '142',
      valSuffix: 'Kasus',
      desc: 'Kasus terkonfirmasi & terselesaikan tuntas dengan pendampingan hukum dan psikologis gratis.',
      icon: Scale,
      color: '#0284c7',
      bgColor: '#e0f2fe',
      progress: 85
    },
    {
      id: 'rehabilitasi',
      category: 'REHABILITASI AMAN',
      val: '45',
      valSuffix: 'Anak',
      desc: 'Sedang dalam perawatan pemulihan di Safehouse/Rumah Perlindungan Sosial terkoordinasi.',
      icon: Home,
      color: '#b45309',
      bgColor: '#fef3c7',
      progress: 60
    },
    {
      id: 'kecepatan',
      category: 'KECEPATAN TIM TRC',
      val: '<45',
      valSuffix: 'Menit',
      desc: 'Waktu tanggap verifikasi dan penanganan di lokasi kedaruratan di wilayah kabupaten.',
      icon: Zap,
      color: '#dc2626',
      bgColor: '#fee2e2',
      progress: 95
    }
  ];

  return (
    <section id="transparansi-section" style={{ padding: '3.5rem 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
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
              DATA TERBUKA PEMERINTAH DAERAH
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0b1f5c', margin: 0 }}>
              Transparansi Penyelenggaraan Perlindungan Sosial
            </h2>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '0.4rem 0.85rem',
            borderRadius: '50px',
            fontSize: '0.75rem',
            color: '#475569',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <RefreshCw size={13} color="#1d4ed8" className="spin-icon" />
            <span>Diperbarui: Hari ini, 09.00 WIB — <strong>Sinkronisasi SIM-Kemensos</strong></span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid-4">
          {stats.map((s) => {
            const IconComp = s.icon;
            return (
              <div 
                key={s.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Category & Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>
                    {s.category}
                  </span>
                  <div style={{
                    background: s.bgColor,
                    color: s.color,
                    padding: '0.4rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComp size={18} />
                  </div>
                </div>

                {/* Metric Value */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                    <span style={{
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      color: '#0b1f5c',
                      lineHeight: 1,
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {s.val}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: s.color }}>
                      {s.valSuffix}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.4 }}>
                    {s.desc}
                  </p>
                </div>

                {/* Progress Bar Indicator */}
                <div>
                  <div style={{
                    height: '6px',
                    background: '#f1f5f9',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${s.progress}%`,
                      background: s.color,
                      borderRadius: '10px',
                      transition: 'width 1s ease-in-out'
                    }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 10s linear infinite;
        }
      `}</style>
    </section>
  );
}

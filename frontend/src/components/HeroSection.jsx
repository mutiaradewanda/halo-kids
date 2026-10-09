import React from 'react';
import { ShieldCheck, PhoneCall, AlertTriangle, Lock, Award, HeartHandshake, ArrowRight, ShieldAlert } from 'lucide-react';

export default function HeroSection({ onOpenLapor, onOpenHotline }) {
  return (
    <section id="hero" style={{
      background: 'var(--bg-gradient-hero)',
      padding: '3rem 0 3.5rem 0',
      borderBottom: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration glow circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
        pointerEvents: 'none'
      }}></div>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Left Column: Headline & Action Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top Pill Badge */}
            <div>
              <span className="badge badge-brand" style={{
                fontSize: '0.725rem',
                padding: '0.35rem 0.85rem',
                background: '#eff6ff',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe'
              }}>
                <ShieldCheck size={14} color="#1d4ed8" />
                PORTAL PELINDUNGAN TERPADU • DINAS SOSIAL KABUPATEN
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: '800',
              lineHeight: 1.15,
              color: '#0b1f5c',
              margin: 0,
              letterSpacing: '-0.03em'
            }}>
              Bersama Lindungi <br />
              <span style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Masa Depan Anak Indonesia
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.025rem',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: 0
            }}>
              Sistem terintegrasi pemantauan 28 LKSA terakreditasi, penanganan darurat kekerasan anak dengan jaminan kerahasiaan identitas, dan transparansi donasi terverifikasi.
            </p>

            {/* Anonymous Commitment Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                background: '#e0e7ff',
                color: '#3730a3',
                padding: '0.65rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Lock size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0b1f5c', marginBottom: '0.2rem' }}>
                  Komitmen Pelapor 100% Anonim
                </h4>
                <p style={{ fontSize: '0.825rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
                  Laporan Anda dilindungi tingkat tinggi. Identitas pelapor/korban dilindungi UU Perlindungan Saksi dan Korban (LPSK) tanpa pungutan biaya.
                </p>
              </div>
            </div>


          </div>

          {/* Right Column: Hero Visual Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '4px solid #ffffff',
              position: 'relative',
              background: '#0b1f5c'
            }}>
              <img 
                src="/hero.jpg" 
                alt="Perlindungan Anak Indonesia Dinsos" 
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Top Right Tag Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                background: 'rgba(11, 31, 92, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Award size={15} color="#fbbf24" />
                Kabupaten Layanan Anak (KLA) Nindya ★
              </div>

              {/* Bottom Quote Banner Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(180deg, rgba(11,31,92,0) 0%, rgba(7,21,59,0.95) 100%)',
                padding: '2rem 1.5rem 1.25rem 1.5rem',
                color: '#ffffff'
              }}>
                <p style={{
                  fontSize: '0.925rem',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  lineHeight: 1.4,
                  margin: '0 0 0.5rem 0',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  "Hak setiap anak adalah bertumbuh bebas dari rasa takut dan ditopang masa depannya."
                </p>
                <span style={{ fontSize: '0.75rem', color: '#93c5fd', opacity: 0.9 }}>
                  Dinsos Terkoordinasi • 2024
                </span>
              </div>
            </div>

            {/* Floating Bottom Left Stat Card */}
            <div style={{
              position: 'absolute',
              bottom: '-1rem',
              left: '-1rem',
              background: '#ffffff',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }} className="desktop-only">
              <div style={{
                background: '#eff6ff',
                color: '#1d4ed8',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <HeartHandshake size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                  Penanganan Khusus
                </span>
                <strong style={{ fontSize: '0.95rem', color: '#0b1f5c' }}>
                  45 Anak Safehouse
                </strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-grid {
          grid-template-columns: 1.1fr 0.9fr;
        }
        .emergency-btn-hover:hover {
          background: #f8fafc !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

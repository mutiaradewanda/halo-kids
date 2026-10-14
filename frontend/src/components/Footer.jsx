import React from 'react';
import { Shield, CheckCircle2, Phone, Mail, Clock, MapPin, Map } from 'lucide-react';

export default function Footer({ onOpenMap, onOpenAdopsi }) {
  return (
    <footer style={{ background: '#07153b', color: '#cbd5e1', paddingTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container">
        
        {/* Top Footer 3 Columns Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '2.5rem',
          paddingBottom: '3rem'
        }} className="footer-grid">

          {/* Col 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={20} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                HaloKids <span style={{ color: '#60a5fa', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>DINSOS</span>
              </span>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Sistem Informasi Manajemen Terpadu Panti Asuhan, Layanan Perlindungan Korban Kekerasan Anak, dan Pengawasan Pengangkatan Anak Terintegrasi Dinas Sosial.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Terverifikasi Kemenkominfo RI
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Audit Sistem Keamanan Siber BSSN
              </span>
            </div>
          </div>

          {/* Col 2: Regulasi & Dasar Hukum */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
              Regulasi & Dasar Hukum
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem' }}>
              <li>
                <a href="#hero" onClick={onOpenAdopsi} style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  UU No. 35 Tahun 2014 Perlindungan Anak
                </a>
              </li>
              <li>
                <a href="#hero" onClick={onOpenAdopsi} style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  PP No. 44 Tahun 2017 Pengangkatan Anak
                </a>
              </li>
              <li>
                <a href="#hero" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  Permensos Standar Mutu LKSA 2020
                </a>
              </li>
              <li>
                <a href="#hero" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  Pedoman Pelaporan COTA Terpadu
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Posko Pelayanan */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
              Kontak & Posko Pelayanan
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={16} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Gedung Pelayanan Terpadu Dinas Sosial, Komplek Perkantoran Pemda</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={15} color="#60a5fa" />
                <span>129 / (021) 879-2000 (Ext 1102)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={15} color="#60a5fa" />
                <span>dinsos-pelindungananak@pemkab.go.id</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Clock size={15} color="#60a5fa" />
                <span>Jam Pelayanan Kantor: 08.00 - 16.00 WIB</span>
              </div>
            </div>
          </div>



        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #60a5fa !important;
          text-decoration: underline !important;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

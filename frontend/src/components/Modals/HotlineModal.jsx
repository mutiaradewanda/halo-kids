import React from 'react';
import { X, PhoneCall, ShieldAlert, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function HotlineModal({ isOpen, onClose, onOpenLapor }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        
        {/* Emergency / WhatsApp Header */}
        <div style={{
          background: 'linear-gradient(135deg, #128c7e 0%, #075e54 100%)',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: '#25d366', padding: '0.4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={22} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Pusat Layanan WhatsApp &amp; Hotline Call Center</h3>
              <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Siaga 24 Jam Non-Stop • Respon Cepat TRC Dinsos</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }}>
            <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.8rem', color: '#065f46', margin: 0, lineHeight: 1.45 }}>
              <strong>Layanan Siaga 24/7:</strong> Pilih saluran komunikasi di bawah ini untuk konsultasi, laporan darurat kekerasan anak, atau bantuan penanganan Satgas TRC Dinsos.
            </p>
          </div>

          {/* Hotline Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            {/* WhatsApp TRC - Highlighted First */}
            <a 
              href="https://wa.me/62811129129"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: '2px solid #25d366',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ background: '#25d366', color: '#fff', padding: '0.65rem', borderRadius: '50%' }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: '#0b1f5c', display: 'block' }}>WhatsApp Hotline SAPA (Utama)</strong>
                  <span style={{ fontSize: '0.775rem', color: '#64748b' }}>0811-129-129 (Chat Instant 24 Jam)</span>
                </div>
              </div>
              <span style={{ background: '#25d366', color: '#ffffff', padding: '0.45rem 0.95rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}>
                CHAT WA
              </span>
            </a>



          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
              Atau kirim rincian laporan secara resmi &amp; anonim melalui formulir:
            </p>
            <button 
              onClick={() => { onClose(); onOpenLapor(); }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <ShieldAlert size={16} /> Buka Formulir Lapor Pengaduan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, MapPin, Phone, Building2, CheckCircle2, Heart, Award, Copy, Check } from 'lucide-react';

export default function PantiDetailModal({ panti, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!panti) return null;

  const handleCopyBank = () => {
    navigator.clipboard.writeText(panti.bank);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Modal Image Header */}
        <div style={{ position: 'relative', height: '220px', background: '#0b1f5c' }}>
          <img 
            src={panti.image} 
            alt={panti.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ background: '#0b1f5c', color: '#ffffff', fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.65rem', borderRadius: '6px' }}>
              {panti.akreditasi}
            </span>
            <span style={{ background: '#1d4ed8', color: '#ffffff', fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.65rem', borderRadius: '6px' }}>
              {panti.regNo}
            </span>
          </div>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0b1f5c', marginBottom: '0.25rem' }}>
              {panti.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.85rem' }}>
              <MapPin size={16} color="#1d4ed8" />
              <span>{panti.address}</span>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
            {panti.desc}
          </p>

          {/* Quick Stats Grid */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.5rem',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Anak Asuh</span>
              <strong style={{ fontSize: '1rem', color: '#1d4ed8' }}>{panti.anakCount}</strong>
            </div>
            <div style={{ borderLeft: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Rentang Usia</span>
              <strong style={{ fontSize: '1rem', color: '#0b1f5c' }}>{panti.usia}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, display: 'block' }}>Status Izin</span>
              <strong style={{ fontSize: '1rem', color: '#059669' }}>Terakreditasi</strong>
            </div>
          </div>

          {/* Bank Donation Details */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Heart size={14} color="#dc2626" /> REKENING DONASI RESMI TERVERIFIKASI
              </span>
              <button 
                onClick={handleCopyBank}
                style={{
                  background: '#ffffff',
                  border: '1px solid #93c5fd',
                  color: '#1d4ed8',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                {copied ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                {copied ? 'Tersalin' : 'Salin Bank'}
              </button>
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0b1f5c', margin: 0 }}>
              {panti.bank}
            </p>
          </div>

          {/* Direct Phone Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
            <a 
              href={`tel:${panti.phone}`}
              className="btn btn-primary"
              style={{ flex: 1, textDecoration: 'none' }}
            >
              <Phone size={16} /> Hubungi Panti ({panti.phone})
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

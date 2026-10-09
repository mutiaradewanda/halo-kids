import React, { useState } from 'react';
import { X, Map, MapPin, ShieldCheck, Building2, PhoneCall } from 'lucide-react';

export default function MapModal({ isOpen, onClose }) {
  const [selectedPin, setSelectedPin] = useState(null);

  if (!isOpen) return null;

  const pins = [
    { id: 1, name: 'LKSA Kasih Bunda Mandiri', type: 'panti', x: '42%', y: '35%', info: 'Kec. Cibinong (42 Anak)' },
    { id: 2, name: 'Panti Asuhan Balita Tunas Bangsa', type: 'panti', x: '55%', y: '48%', info: 'Kec. Cibinong (26 Balita)' },
    { id: 3, name: 'LKSA Bina Harapan Ciawi', type: 'panti', x: '72%', y: '65%', info: 'Kec. Ciawi (38 Remaja)' },
    { id: 4, name: 'Posko TRC Siaga 1 Pusat', type: 'trc', x: '48%', y: '40%', info: 'Gedung Dinsos Pemda (Hotline 129)' },
    { id: 5, name: 'Posko TRC Wilayah Selatan', type: 'trc', x: '68%', y: '70%', info: 'Kec. Cisarua Puncak (Satgas Fast Respon)' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '760px' }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0b1f5c 0%, #1d4ed8 100%)',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Map size={22} color="#93c5fd" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Peta Digital Sebaran LKSA & Posko TRC</h3>
              <span style={{ fontSize: '0.75rem', color: '#bfdbfe' }}>28 Panti Terakreditasi & 12 Posko Satgas Dinsos</span>
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

        {/* Map Container Viewport */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            background: '#e0f2fe',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid #cbd5e1',
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(#93c5fd 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
            
            {/* Water / Land stylized shapes */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
              border: '1px solid #bae6fd'
            }}></div>

            {/* Pins */}
            {pins.map((pin) => (
              <div 
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                style={{
                  position: 'absolute',
                  top: pin.y,
                  left: pin.x,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: selectedPin?.id === pin.id ? 10 : 2
                }}
              >
                <div style={{
                  background: pin.type === 'panti' ? '#1d4ed8' : '#dc2626',
                  color: '#ffffff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  transition: 'transform 0.2s ease'
                }} className="map-pin-hover">
                  {pin.type === 'panti' ? <Building2 size={13} /> : <PhoneCall size={13} />}
                  <span>{pin.name}</span>
                </div>
              </div>
            ))}

            {/* Selected Pin Popup Card */}
            {selectedPin && (
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                background: '#ffffff',
                border: '2px solid #1d4ed8',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#0b1f5c', display: 'block' }}>{selectedPin.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedPin.info}</span>
                </div>
                <button 
                  onClick={() => setSelectedPin(null)}
                  style={{ background: '#f1f5f9', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Tutup
                </button>
              </div>
            )}

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#1d4ed8', display: 'inline-block' }}></span>
              Pin Biru: Lembaga Panti Asuhan (LKSA)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#dc2626', display: 'inline-block' }}></span>
              Pin Merah: Posko Satgas Tanggap Cepat (TRC)
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

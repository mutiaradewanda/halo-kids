import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, ShieldCheck, MapPin, UserCheck } from 'lucide-react';

export default function LacakModal({ isOpen, onClose }) {
  const [ticketInput, setTicketInput] = useState('TRC-2024-8842');
  const [searchedData, setSearchedData] = useState({
    ticketId: 'TRC-2024-8842',
    kategori: 'Kekerasan Fisik / Pelindungan Korban',
    lokasi: 'Kecamatan Cibinong, Kab. Bogor',
    statusUtama: 'Dalam Pendampingan Tim TRC Dinsos',
    statusColor: '#0284c7',
    timeline: [
      { title: 'Laporan Diterima System', time: 'Hari ini, 09.15 WIB', desc: 'Laporan terenkripsi masuk & diverifikasi otomatis', done: true },
      { title: 'Penugasan Tim TRC Rapid Unit', time: 'Hari ini, 09.30 WIB', desc: 'Petugas lapangan 2 orang dikirim ke lokasi', done: true },
      { title: 'Penanganan Darurat & Rujukan Safehouse', time: 'Hari ini, 10.15 WIB', desc: 'Korban dalam kondisi aman di Safehouse Dinsos', done: true },
      { title: 'Pendampingan Psikologi & Bantuan Hukum', time: 'Proses Berjalan', desc: 'Konsultasi hukum gratis oleh Advokat Dinsos', done: false }
    ]
  });

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;
    // Keep or refresh searched data demo
    setSearchedData({
      ...searchedData,
      ticketId: ticketInput.toUpperCase()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        
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
            <Search size={22} color="#93c5fd" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Lacak Status Tiket Laporan</h3>
              <span style={{ fontSize: '0.75rem', color: '#bfdbfe' }}>Sinkronisasi Real-Time SIM-Kemensos</span>
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

        {/* Search Input Box */}
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Masukkan Kode Tiket (Contoh: TRC-2024-8842)"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.65rem 1rem',
                borderRadius: '50px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                fontWeight: 600
              }}
            />
            <button 
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: '50px', padding: '0.65rem 1.25rem' }}
            >
              Cek Tiket
            </button>
          </form>

          {/* Ticket Information Card */}
          {searchedData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>KODE TIKET: {searchedData.ticketId}</span>
                  <span style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}>
                    STATUS: AKTIF
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0b1f5c', margin: '0 0 0.25rem 0' }}>
                  {searchedData.kategori}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
                  <MapPin size={14} color="#1d4ed8" />
                  <span>{searchedData.lokasi}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0b1f5c', marginBottom: '1rem' }}>
                  Timeline Progres Penanganan:
                </h5>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  
                  {/* Vertical Line */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    bottom: '8px',
                    left: '7px',
                    width: '2px',
                    background: '#cbd5e1'
                  }}></div>

                  {searchedData.timeline.map((step, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-1.5rem',
                        top: '2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: step.done ? '#10b981' : '#f59e0b',
                        border: '3px solid #ffffff',
                        boxShadow: '0 0 0 1px #cbd5e1'
                      }}></div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: step.done ? '#0b1f5c' : '#b45309' }}>
                            {step.title}
                          </strong>
                          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>{step.time}</span>
                        </div>
                        <p style={{ fontSize: '0.775rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

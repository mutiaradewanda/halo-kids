import React from 'react';

export default function LoadingSpinner({ text = 'Memuat data dari server...', size = 'md' }) {
  const dimension = size === 'sm' ? 18 : size === 'lg' ? 36 : 24;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        gap: '0.75rem',
        color: '#64748b',
      }}
    >
      <div
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
          border: '3px solid #e2e8f0',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {text && <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{text}</span>}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

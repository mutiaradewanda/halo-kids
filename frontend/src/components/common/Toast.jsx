import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  const bgColor = isSuccess ? '#ecfdf5' : isError ? '#fef2f2' : '#eff6ff';
  const borderColor = isSuccess ? '#10b981' : isError ? '#ef4444' : '#3b82f6';
  const textColor = isSuccess ? '#065f46' : isError ? '#991b1b' : '#1e40af';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: bgColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '14px 18px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        maxWidth: '420px',
        animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        {isSuccess && <CheckCircle2 size={22} color="#10b981" />}
        {isError && <AlertCircle size={22} color="#ef4444" />}
        {!isSuccess && !isError && <Info size={22} color="#3b82f6" />}
      </div>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: textColor, flex: 1, lineHeight: 1.4 }}>
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.7,
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  CheckCheck,
  Clock,
  ExternalLink,
  ShieldAlert,
  FileCheck2,
  HeartHandshake,
  Users,
  Info,
  ChevronRight,
  Sparkles,
  LogIn,
  Search,
  CheckCircle2,
  Trash2
} from 'lucide-react';

// Mock Notifikasi untuk User Terotentikasi (Sudah Login)
const MOCK_NOTIFICATIONS_USER = [
  {
    id: 'notif-usr-1',
    category: 'pengaduan',
    title: 'Update Pengaduan #TKT-8841',
    summary: 'Petugas TRC Unit Cibinong telah menuju ke lokasi pengaduan untuk asesmen darurat lapangan.',
    time: '10 menit lalu',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    is_read: false,
    badgeColor: 'bg-red-50 text-red-600 border-red-200',
    icon: ShieldAlert,
    iconColor: 'text-red-500 bg-red-50',
    actionType: 'lacak',
    targetTicket: 'TKT-8841',
    actionTab: 'pengaduan'
  },
  {
    id: 'notif-usr-2',
    category: 'relawan',
    title: 'Pendaftaran Relawan Disetujui!',
    summary: 'Yayasan LKSA Kasih Bunda Mandiri menyetujui formulir relawan Anda (Bidang: Pendidikan & Tutor Belajar).',
    time: '45 menit lalu',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    is_read: false,
    badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    icon: Users,
    iconColor: 'text-indigo-600 bg-indigo-50',
    actionType: 'tab',
    actionTab: 'volunteer'
  },
  {
    id: 'notif-usr-3',
    category: 'cota',
    title: 'Verifikasi Berkas COTA Lengkap',
    summary: 'Berkas permohonan pengangkatan anak Anda (COTA-2024-089) lolos verifikasi tahap 1 Dinsos. Jadwal Home Visit PIPA ditetapkan.',
    time: '3 jam lalu',
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    is_read: false,
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: FileCheck2,
    iconColor: 'text-blue-600 bg-blue-50',
    actionType: 'tab',
    actionTab: 'adopsi'
  },
  {
    id: 'notif-usr-4',
    category: 'donasi',
    title: 'Donasi Logistik Diterima Panti',
    summary: 'Paket sembako & perlengkapan sekolah dari Anda telah diserahterimakan dan dicatat dalam audit resmi Dinsos.',
    time: 'Kemarin',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    is_read: true,
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    icon: HeartHandshake,
    iconColor: 'text-emerald-600 bg-emerald-50',
    actionType: 'tab',
    actionTab: 'donasi'
  }
];

// Mock Notifikasi untuk Pengunjung Publik / Tamu (Belum Login)
const MOCK_NOTIFICATIONS_GUEST = [
  {
    id: 'notif-gst-1',
    category: 'tracking',
    title: 'Lacak Cepat Pengaduan Publik',
    summary: 'Sudah melapor kekerasan anak? Masukkan kode tiket pelaporan untuk memantau respons TRC < 2 jam.',
    time: 'Aktif Sekarang',
    timestamp: new Date().toISOString(),
    is_read: false,
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: Search,
    iconColor: 'text-blue-600 bg-blue-50',
    actionType: 'lacak',
    targetTicket: 'TKT-2024-LIVE'
  },
  {
    id: 'notif-gst-2',
    category: 'pengumuman',
    title: 'Siaga Hotline TRC 24 Jam',
    summary: 'Unit Reaksi Cepat Perlindungan Anak Dinsos siaga 24/7 bebas pulsa via Call Center 112 & WhatsApp TRC.',
    time: '2 jam lalu',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    is_read: false,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Info,
    iconColor: 'text-amber-600 bg-amber-50',
    actionType: 'info'
  },
  {
    id: 'notif-gst-3',
    category: 'pengumuman',
    title: 'Maklumat Layanan Ramah Anak Dinsos',
    summary: 'Semua proses penerimaan pengaduan, verifikasi LKSA, dan pendaftaran relawan tidak dipungut biaya (gratis).',
    time: '1 hari lalu',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    is_read: true,
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: Sparkles,
    iconColor: 'text-slate-600 bg-slate-100',
    actionType: 'info'
  }
];

export default function NotificationDropdown({
  isLoggedIn = false,
  currentUser = null,
  onOpenLogin = () => {},
  onOpenLacak = () => {},
  onNavigateTab = () => {},
  customNotifications = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    if (customNotifications) return customNotifications;
    return isLoggedIn ? MOCK_NOTIFICATIONS_USER : MOCK_NOTIFICATIONS_GUEST;
  });
  const [activeFilter, setActiveFilter] = useState('semua'); // 'semua' | 'unread'

  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  // Perbarui notifikasi bila status login berubah
  useEffect(() => {
    if (customNotifications) {
      setNotifications(customNotifications);
    } else {
      setNotifications(isLoggedIn ? MOCK_NOTIFICATIONS_USER : MOCK_NOTIFICATIONS_GUEST);
    }
  }, [isLoggedIn, customNotifications]);

  // Handler Click Outside & Keyboard Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMarkAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));
  };

  const handleItemClick = (item) => {
    // Otomatis tandai sebagai sudah dibaca
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, is_read: true } : n))
    );

    // Tindak lanjuti aksi
    if (item.actionType === 'lacak') {
      if (onOpenLacak) onOpenLacak(item.targetTicket);
      setIsOpen(false);
    } else if (item.actionType === 'tab' && item.actionTab) {
      if (onNavigateTab) onNavigateTab(item.actionTab);
      setIsOpen(false);
    } else if (item.actionType === 'login') {
      if (onOpenLogin) onOpenLogin();
      setIsOpen(false);
    }
  };

  const filteredNotifications =
    activeFilter === 'unread'
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  return (
    <div className="relative inline-block text-left" ref={popoverRef} style={{ position: 'relative' }}>
      {/* Tombol Lonceng Notifikasi */}
      <button
        ref={buttonRef}
        type="button"
        id="btn-halo-notifications"
        onClick={handleToggle}
        aria-label="Lihat Notifikasi"
        aria-expanded={isOpen}
        title={unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Notifikasi'}
        className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400 ${
          isOpen
            ? 'bg-blue-100 text-blue-700 shadow-sm'
            : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-700 border border-slate-200 shadow-sm'
        }`}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          cursor: 'pointer',
          background: isOpen ? '#dbeafe' : '#ffffff',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Bell
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'scale-110 text-blue-700' : 'text-slate-700'}`}
          color={isOpen ? '#1d4ed8' : '#334155'}
        />

        {/* Badge Counter Merah (Jika unreadCount > 0) */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-red-600 rounded-full border-2 border-white shadow-sm animate-pulse"
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              minWidth: '18px',
              height: '18px',
              padding: '0 4px',
              fontSize: '10px',
              fontWeight: 800,
              color: '#ffffff',
              backgroundColor: '#dc2626',
              borderRadius: '9999px',
              border: '2px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(220, 38, 38, 0.4)'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown / Popover Container */}
      {isOpen && (
        <div
          id="popover-halo-notifications"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '360px',
            maxWidth: 'calc(100vw - 24px)',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 35px -8px rgba(15, 23, 42, 0.2), 0 0 1px rgba(15, 23, 42, 0.1)',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Header Popover */}
          <div
            className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-slate-100 flex items-center justify-between"
            style={{
              padding: '0.85rem 1rem',
              background: '#f8fafc',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bell size={14} color="#1d4ed8" />
              </div>
              <h4
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: '#0b1f5c',
                  letterSpacing: '-0.01em'
                }}
              >
                Notifikasi
              </h4>
              {unreadCount > 0 && (
                <span
                  style={{
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '50px'
                  }}
                >
                  {unreadCount} Baru
                </span>
              )}
            </div>

            {/* Tombol Aksi: Tandai Sudah Dibaca */}
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                title="Tandai semua pesan sebagai sudah dibaca"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1d4ed8',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px'
                }}
              >
                <CheckCheck size={14} />
                <span>Tandai dibaca</span>
              </button>
            )}
          </div>

          {/* Subheader / Tabs Filter Cepat */}
          <div
            style={{
              padding: '0.4rem 1rem',
              background: '#ffffff',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveFilter('semua')}
              style={{
                background: activeFilter === 'semua' ? '#eff6ff' : 'transparent',
                color: activeFilter === 'semua' ? '#1d4ed8' : '#64748b',
                border: 'none',
                borderRadius: '50px',
                padding: '0.2rem 0.65rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Semua ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('unread')}
              style={{
                background: activeFilter === 'unread' ? '#eff6ff' : 'transparent',
                color: activeFilter === 'unread' ? '#1d4ed8' : '#64748b',
                border: 'none',
                borderRadius: '50px',
                padding: '0.2rem 0.65rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Belum Dibaca ({unreadCount})
            </button>
          </div>

          {/* List Notifikasi */}
          <div
            className="max-h-80 overflow-y-auto divide-y divide-slate-100"
            style={{
              maxHeight: '340px',
              overflowY: 'auto'
            }}
          >
            {filteredNotifications.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  color: '#94a3b8'
                }}
              >
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto', color: '#cbd5e1' }} />
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                  Tidak ada notifikasi saat ini
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.725rem', color: '#94a3b8' }}>
                  Semua pembaruan sistem dan laporan Anda akan muncul di sini.
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const IconComponent = item.icon || Info;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="p-3 sm:p-3.5 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3 relative"
                    style={{
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f8fafc',
                      background: item.is_read ? '#ffffff' : '#f8faff',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    {/* Visual Unread Indicator (Dot Biru) */}
                    {!item.is_read && (
                      <span
                        className="absolute left-1.5 top-5 w-1.5 h-1.5 bg-blue-600 rounded-full"
                        style={{
                          position: 'absolute',
                          left: '6px',
                          top: '18px',
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#2563eb',
                          borderRadius: '50%'
                        }}
                      />
                    )}

                    {/* Ikon Kategori */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 ${item.iconColor || 'bg-blue-50 text-blue-600'}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={16} />
                    </div>

                    {/* Konten Notifikasi */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h5
                          style={{
                            margin: 0,
                            fontSize: '0.8rem',
                            fontWeight: item.is_read ? 600 : 700,
                            color: item.is_read ? '#334155' : '#0b1f5c',
                            lineHeight: 1.3
                          }}
                        >
                          {item.title}
                        </h5>
                        <span
                          style={{
                            fontSize: '0.675rem',
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                        >
                          <Clock size={10} />
                          {item.time}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.735rem',
                          color: '#64748b',
                          lineHeight: 1.45
                        }}
                      >
                        {item.summary}
                      </p>

                      {/* Action Pill Hint */}
                      {item.actionType === 'lacak' && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            marginTop: '0.35rem',
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            color: '#0284c7'
                          }}
                        >
                          <span>Lacak status tiket sekarang</span>
                          <ChevronRight size={12} />
                        </div>
                      )}

                      {item.actionType === 'tab' && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            marginTop: '0.35rem',
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            color: '#1d4ed8'
                          }}
                        >
                          <span>Buka halaman {item.actionTab}</span>
                          <ExternalLink size={11} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Popover: Kondisional Berdasarkan Status Autentikasi */}
          {!isLoggedIn ? (
            /* Banner CTA untuk Pengunjung Publik (Guest) */
            <div
              className="p-3 bg-blue-50 border-t border-blue-100 flex items-center justify-between gap-2"
              style={{
                padding: '0.75rem 1rem',
                background: '#eff6ff',
                borderTop: '1px solid #dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '0.725rem', fontWeight: 700, color: '#1e40af' }}>
                  Login untuk Riwayat Lengkap
                </p>
                <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.675rem', color: '#3b82f6' }}>
                  Akses berkas pengaduan, verifikasi COTA & relawan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenLogin();
                }}
                className="btn btn-sm btn-primary whitespace-nowrap"
                style={{
                  background: '#0b1f5c',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <LogIn size={12} />
                <span>Login User</span>
              </button>
            </div>
          ) : (
            /* Footer untuk User Login */
            <div
              style={{
                padding: '0.65rem 1rem',
                background: '#f8fafc',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: '#64748b'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={12} color="#0284c7" />
                Layanan Terpadu HaloKids Dinsos
              </span>
              <span style={{ fontWeight: 600, color: '#0b1f5c' }}>
                {currentUser?.name || 'Ahmad Rifai'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

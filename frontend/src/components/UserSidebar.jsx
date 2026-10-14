import React, { useState } from 'react';
import {
  Home,
  FileText,
  Building2,
  Heart,
  UserCheck,
  HeartHandshake,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  X
} from 'lucide-react';

export default function UserSidebar({
  isLoggedIn = false,
  currentUser = null,
  activeTab = 'beranda',
  viewMode = 'landing',
  onNavigate,
  onOpenLacak,
  onOpenLogin,
  onLogout,
  onToggleLoginDemo,
  mobileOpen = false,
  setMobileOpen = () => {}
}) {
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    {
      id: 'beranda',
      mode: 'landing',
      label: 'Beranda Informasi',
      icon: Home
    },
    {
      id: 'pengaduan',
      mode: 'pengaduan',
      label: 'Formulir Pengaduan',
      icon: FileText
    },
    {
      id: 'volunteer',
      mode: 'volunteer',
      label: 'Volunteer',
      icon: HeartHandshake
    },
    {
      id: 'panti',
      mode: 'panti',
      label: 'Direktori Panti LKSA',
      icon: Building2
    },
    {
      id: 'donasi',
      mode: 'donasi',
      label: 'Pusat Donasi',
      icon: Heart
    },
    {
      id: 'adopsi',
      mode: 'adopsi',
      label: 'Adopsi Resmi (COTA)',
      icon: UserCheck
    }
  ];

  const handleItemClick = (item) => {
    if (onNavigate) {
      onNavigate(item.mode, item.id);
    }
    setMobileOpen(false);
  };

  const isActive = (item) => {
    return activeTab === item.id || viewMode === item.mode;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 21, 59, 0.65)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            zIndex: 55,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* Sidebar Aside Element */}
      <aside
        className={`user-sidebar ${collapsed ? 'user-sidebar-collapsed' : ''} ${mobileOpen ? 'user-sidebar-mobile-open' : ''}`}
        style={{
          width: collapsed ? '78px' : '270px',
          background: 'linear-gradient(180deg, #07153b 0%, #0b1f5c 100%)',
          color: '#cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '4px 0 24px rgba(7, 21, 59, 0.25)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 35,
          transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Top Section: Brand Logo & Collapse Button */}
        <div>
          <div
            style={{
              padding: collapsed ? '1.25rem 0.75rem' : '1.25rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* Logo + Brand title */}
            <div
              onClick={() => handleItemClick(mainNavItems[0])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              title="Kembali ke Beranda"
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
                  color: '#ffffff',
                  width: '38px',
                  height: '38px',
                  borderRadius: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(29, 78, 216, 0.4)',
                  flexShrink: 0
                }}
              >
                <Shield size={20} />
              </div>

              {!collapsed && (
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      HaloKids
                    </span>
                    <span
                      style={{
                        background: '#2563eb',
                        color: '#ffffff',
                        fontSize: '0.625rem',
                        fontWeight: '800',
                        padding: '0.12rem 0.45rem',
                        borderRadius: '5px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      DINSOS
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.68rem',
                      color: '#94a3b8',
                      fontWeight: '500',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    Portal Perlindungan Publik
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle Button */}
            {!collapsed && (
              <button
                className="desktop-only"
                onClick={() => setCollapsed(!collapsed)}
                title="Sembunyikan Sidebar"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94a3b8',
                  padding: '0.35rem',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              className="mobile-close-btn"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                padding: '0.4rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Expand button when collapsed */}
          {collapsed && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }} className="desktop-only">
              <button
                onClick={() => setCollapsed(false)}
                title="Buka Sidebar"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#cbd5e1',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Navigation Section */}
          <div style={{ padding: collapsed ? '0.75rem 0.5rem' : '1rem 0.85rem' }}>
            {/* Label Group 1 */}
            {!collapsed && (
              <div
                style={{
                  fontSize: '0.675rem',
                  fontWeight: 800,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  paddingLeft: '0.5rem'
                }}
              >
                Menu Layanan
              </div>
            )}

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {mainNavItems.map((item) => {
                const active = isActive(item);
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'space-between',
                      width: '100%',
                      padding: collapsed ? '0.75rem 0.5rem' : '0.65rem 0.75rem',
                      borderRadius: '10px',
                      border: active ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
                      background: active
                        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.35) 0%, rgba(29, 78, 216, 0.25) 100%)'
                        : 'transparent',
                      color: active ? '#ffffff' : '#94a3b8',
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.825rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                      <div
                        style={{
                          color: active ? '#60a5fa' : '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent size={18} strokeWidth={active ? 2.5 : 2} />
                      </div>

                      {!collapsed && (
                        <span
                          style={{
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                          }}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>

                    {/* Active Indicator Bar */}
                    {active && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '18%',
                          bottom: '18%',
                          width: '3.5px',
                          background: '#60a5fa',
                          borderRadius: '0 4px 4px 0',
                          boxShadow: '0 0 8px #60a5fa'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Tool: Lacak Status Tiket */}
            {onOpenLacak && (
              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {!collapsed && (
                  <div
                    style={{
                      fontSize: '0.675rem',
                      fontWeight: 800,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem',
                      paddingLeft: '0.5rem'
                    }}
                  >
                    Pencarian
                  </div>
                )}

                <button
                  onClick={() => {
                    if (onOpenLacak) onOpenLacak();
                    setMobileOpen(false);
                  }}
                  title={collapsed ? 'Lacak Status Pengaduan' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    gap: '0.65rem',
                    width: '100%',
                    padding: collapsed ? '0.65rem 0.5rem' : '0.6rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#cbd5e1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <Search size={16} color="#38bdf8" />
                  {!collapsed && <span>Lacak Status Tiket</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom User Profile & Auth Section */}
        <div
          style={{
            padding: collapsed ? '0.85rem 0.5rem' : '1rem 0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          {isLoggedIn ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                  {/* User Initial Avatar */}
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      border: '1.5px solid rgba(255, 255, 255, 0.2)',
                      flexShrink: 0,
                      position: 'relative'
                    }}
                    title={currentUser?.name || 'Warga'}
                  >
                    {currentUser?.name ? currentUser.name.trim().charAt(0).toUpperCase() : 'W'}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        border: '1.5px solid #07153b'
                      }}
                    />
                  </div>

                  {!collapsed && (
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                        {currentUser?.name || 'Warga'}
                      </div>
                      <div
                        style={{
                          fontSize: '0.675rem',
                          color: '#93c5fd',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                        {currentUser?.role || 'User Publik'}
                      </div>
                    </div>
                  )}
                </div>

                {!collapsed && (
                  <button
                    onClick={onLogout}
                    title="Keluar / Logout"
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '0.45rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                    }}
                  >
                    <LogOut size={15} />
                  </button>
                )}
              </div>

              {collapsed && (
                <button
                  onClick={onLogout}
                  title="Logout"
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '0.4rem',
                    borderRadius: '7px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  <LogOut size={15} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  if (onOpenLogin) onOpenLogin();
                  setMobileOpen(false);
                }}
                title={collapsed ? 'Login User' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: collapsed ? '0.65rem 0.5rem' : '0.65rem 0.85rem',
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)',
                  transition: 'var(--transition-fast)'
                }}
              >
                <UserCheck size={16} />
                {!collapsed && <span>Login Portal User</span>}
              </button>

              {!collapsed && onToggleLoginDemo && (
                <button
                  onClick={() => {
                    onToggleLoginDemo();
                    setMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    width: '100%',
                    padding: '0.45rem',
                    background: 'transparent',
                    color: '#94a3b8',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <Sparkles size={13} color="#f59e0b" />
                  <span>Simulasi Login Demo</span>
                </button>
              )}
            </div>
          )}
        </div>
      </aside>

      <style>{`
        /* Responsive Sidebar CSS */
        @media (max-width: 900px) {
          .user-sidebar {
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            width: min(290px, 85vw) !important;
            z-index: 60 !important;
            box-shadow: 8px 0 32px rgba(7, 21, 59, 0.45) !important;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .user-sidebar.user-sidebar-mobile-open {
            transform: translateX(0) !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

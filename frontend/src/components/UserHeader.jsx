import React from 'react';
import {
  Menu,
  Shield,
  User,
  Search,
  ChevronRight
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

/**
 * Top Navbar / Header untuk Portal Pengguna HaloKids DINSOS
 * Menggunakan Tailwind CSS:
 * - Sticky top-0 z-30 dengan background white/95 & backdrop-blur-md
 * - Border bawah halus (border-b border-slate-100 shadow-sm)
 * - Breadcrumbs konteks navigasi dinamis
 * - Action buttons: Lacak Tiket, Lonceng Notifikasi, dan Profil/Login User
 */
export default function UserHeader({
  activeTab = 'beranda',
  onOpenMobileSidebar = () => {},
  isLoggedIn = false,
  currentUser = null,
  onOpenLogin,
  onOpenLacak,
  onNavigateTab
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'pengaduan':
        return { title: 'Formulir Pengaduan', badge: 'Layanan 24 Jam Darurat TRC' };
      case 'volunteer':
        return { title: 'Pendaftaran Relawan (Volunteer) Sahabat Panti', badge: 'Bakti Pendidikan & Seni Olahraga' };
      case 'panti':
        return { title: 'Direktori Lembaga Kesejahteraan Sosial Anak (LKSA)', badge: 'Verifikasi Resmi Dinsos' };
      case 'donasi':
        return { title: 'Portal Donasi Terpadu & Transparan', badge: 'Audit Dana & Barang' };
      case 'adopsi':
        return { title: 'Layanan Pengangkatan Anak (Adopsi COTA)', badge: 'Prosedur Sidang PIPA' };
      case 'beranda':
      default:
        return {
          title: isLoggedIn ? 'Dashboard Personal Warga' : 'Portal Informasi Terpadu HaloKids DINSOS',
          badge: isLoggedIn ? 'Warga Terverifikasi' : 'Pemerintah Kabupaten'
        };
    }
  };

  const { title, badge } = getTabTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all">
      
      {/* Sisi Kiri: Mobile Toggle & Konteks Halaman (Breadcrumbs) */}
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
        
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 transition flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs"
          title="Buka Navigasi Menu"
          aria-label="Menu Navigasi"
        >
          <Menu size={19} />
        </button>

        {/* Mobile Brand Title (Muncul di layar kecil saat breadcrumb disembunyikan) */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center shadow-xs">
            <Shield size={16} />
          </div>
          <span className="font-extrabold text-blue-950 text-sm tracking-tight">
            HaloKids
          </span>
        </div>

        {/* Desktop Breadcrumbs Context */}
        <div className="hidden lg:flex items-center gap-2 text-xs truncate">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold shrink-0">
            <span className="hover:text-blue-700 transition cursor-default">Portal Warga</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-blue-950 font-bold truncate max-w-[280px] xl:max-w-[420px]" title={title}>
              {title}
            </span>
          </div>

          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 px-2 py-0.5 rounded-full shrink-0">
            {badge}
          </span>
        </div>
      </div>

      {/* Sisi Kanan: Lacak Tiket, Notifikasi, & Profil User */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        
        {/* Tombol Lacak Tiket (Desktop: full pill, Mobile: compact circular button) */}
        {onOpenLacak && (
          <>
            <button
              onClick={onOpenLacak}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 active:scale-95 text-blue-950 border border-slate-200 px-3 py-1.5 rounded-full transition shadow-2xs"
              title="Lacak status tiket pengaduan atau COTA"
            >
              <Search size={13} className="text-sky-600" />
              <span>Lacak Tiket</span>
            </button>
            <button
              onClick={onOpenLacak}
              className="sm:hidden flex items-center justify-center w-[38px] h-[38px] rounded-full bg-slate-50 hover:bg-slate-100 active:scale-95 text-blue-900 border border-slate-200 transition shadow-2xs"
              title="Lacak Tiket"
              aria-label="Lacak Tiket"
            >
              <Search size={16} className="text-sky-600" />
            </button>
          </>
        )}

        {/* Dropdown Lonceng Notifikasi */}
        <NotificationDropdown
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onOpenLogin={onOpenLogin}
          onOpenLacak={onOpenLacak}
          onNavigateTab={onNavigateTab}
        />

        {/* Status Autentikasi / Profil Pengguna */}
        {isLoggedIn ? (
          <div 
            onClick={onOpenMobileSidebar}
            className="flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            title="Klik untuk melihat menu / profil"
          >
            <div className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-2xs transition-colors">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                <User size={12} />
              </div>
              <span className="hidden sm:inline max-w-[120px] truncate">
                {currentUser?.name || 'Warga'}
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 text-xs font-bold bg-blue-900 hover:bg-blue-800 active:scale-95 text-white px-3 sm:px-3.5 py-1.5 rounded-full transition shadow-sm"
          >
            <User size={13} />
            <span>Masuk</span>
          </button>
        )}
      </div>

    </header>
  );
}

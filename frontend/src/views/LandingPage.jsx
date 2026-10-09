import React from 'react';
import HeroSection from '../components/HeroSection';
import QuickActions from '../components/QuickActions';
import OrphanageDirectory from '../components/OrphanageDirectory';
import Footer from '../components/Footer';

export default function LandingPage({
  isLoggedIn,
  currentUser,
  onLogout,
  onToggleLoginDemo,
  onSwitchToDashboard,
  onSwitchToPengaduan,
  onSwitchToPanti,
  onSwitchToDonasi,
  onSwitchToAdopsi,
  onOpenLapor,
  onOpenLacak,
  onOpenHotline,
  onOpenLogin,
  onOpenAdopsi,
  onOpenMap,
  onSelectPanti,
  activeTab,
  setActiveTab
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>


      {/* 3. Hero Section (Informasi Singkat Layanan Dinsos) */}
      <HeroSection 
        onOpenLapor={onOpenLapor}
        onOpenHotline={onOpenHotline}
      />

      {/* 4. Quick Actions Grid Cards */}
      <QuickActions 
        onOpenLapor={onOpenLapor}
        onOpenLacak={onOpenLacak}
        onScrollPanti={onSwitchToPanti}
        onOpenKonsultasi={onOpenHotline}
        onOpenAdopsi={onOpenAdopsi}
      />

      {/* 5. Orphanage Directory Section */}
      <OrphanageDirectory 
        onSelectPanti={onSelectPanti}
        isLoggedIn={isLoggedIn}
        onOpenLogin={onOpenLogin}
      />

      {/* 6. Footer */}
      <Footer 
        onOpenMap={onOpenMap}
        onOpenAdopsi={onOpenAdopsi}
      />

    </div>
  );
}

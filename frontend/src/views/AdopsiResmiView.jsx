import React from 'react';
import Footer from '../components/Footer';
import AdopsiResmiSection from '../components/AdopsiResmiSection';

export default function AdopsiResmiView({
  onOpenAdopsi,
  onOpenMap
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>


      {/* 4. Full AdopsiResmiSection (Exact 3 Cards + Blue Quick Qualifier Widget from User Screenshot!) */}
      <AdopsiResmiSection onOpenAdopsi={onOpenAdopsi} />

      {/* 5. Footer */}
      <Footer 
        onOpenMap={onOpenMap}
        onOpenAdopsi={onOpenAdopsi}
      />

    </div>
  );
}

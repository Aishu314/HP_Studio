import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi HP Studio! I would like to book a photoshoot consultation.'
    );
    window.open(`https://wa.me/${STUDIO_INFO.cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-[#0D6832] text-white shadow-xl hover:bg-[#095226] hover:scale-108 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer border-2 border-white"
      title="Chat with HP Studio on WhatsApp"
      aria-label="WhatsApp HP Studio"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-semibold pr-1">
        Chat with Studio
      </span>
    </button>
  );
};

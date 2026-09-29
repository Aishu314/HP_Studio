import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="px-4 py-3 rounded-2xl bg-[#221A18] text-white shadow-xl border border-white/10 flex items-center gap-2.5 text-xs sm:text-sm font-medium">
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-stone-400 hover:text-white text-xs font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

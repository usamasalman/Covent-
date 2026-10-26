import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#211B17] text-[#FAF7F2] rounded-lg shadow-xl border border-[#3E322A] text-sm animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#C8A265] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#A69788] shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-[#E5DDD4] font-medium leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#96897D] hover:text-[#FAF7F2] transition-colors p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

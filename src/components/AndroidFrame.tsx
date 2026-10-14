import React from 'react';
import { WifiOff, Battery, Signal } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isOffline: boolean;
  currentScreenTitle?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isOffline,
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
      {/* Top Punch Hole Camera */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-4 h-4 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
      </div>

      {/* Android Status Bar */}
      <div className="relative z-40 h-8 bg-slate-950 text-slate-300 text-xs px-6 flex items-center justify-between font-mono pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-semibold">{isOffline ? 'No SIM' : 'CLARO 5G'}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {isOffline ? (
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <WifiOff className="w-3.5 h-3.5" />
            </span>
          ) : (
            <Signal className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span>{currentTime}</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px]">85%</span>
            <Battery className="w-3.5 h-3.5 text-slate-200 fill-slate-200" />
          </div>
        </div>
      </div>

      {/* Inner Screen Viewport */}
      <div className="relative flex-1 bg-slate-900 rounded-[36px] overflow-hidden flex flex-col text-slate-100">
        {children}
      </div>

      {/* Android System Gesture Bar */}
      <div className="relative z-40 h-5 bg-slate-950 flex items-center justify-center">
        <div className="w-32 h-1 bg-slate-600/60 rounded-full" />
      </div>
    </div>
  );
};

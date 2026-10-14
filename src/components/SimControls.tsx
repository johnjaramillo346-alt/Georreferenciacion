import React from 'react';
import { 
  Sliders, 
  MapPin, 
  Camera, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  RotateCcw,
  Sparkles,
  Mountain,
  Zap,
  Radio,
  Sun
} from 'lucide-react';
import { GpsLocation } from '../types/android';

export const FIELD_SCENERIES = [
  {
    id: 'cotopaxi',
    name: 'Volcán Cotopaxi (Ecuador)',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    lat: -0.6833,
    lon: -78.4372,
    alt: 3890.5,
    icon: Mountain,
  },
  {
    id: 'substation',
    name: 'Subestación Eléctrica',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    lat: 34.12345,
    lon: -118.56789,
    alt: 128.0,
    icon: Zap,
  },
  {
    id: 'telecom',
    name: 'Torre de Telecomunicaciones',
    url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=1000&q=80',
    lat: 40.7128,
    lon: -74.0060,
    alt: 45.2,
    icon: Radio,
  },
  {
    id: 'solar',
    name: 'Planta Fotovoltaica',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    lat: -23.5505,
    lon: -46.6333,
    alt: 760.0,
    icon: Sun,
  },
];

interface SimControlsProps {
  gpsLocation: GpsLocation | null;
  isGpsEnabled: boolean;
  onToggleGpsEnabled: () => void;
  onChangeAccuracy: (meters: number) => void;
  onSelectScenery: (scenery: typeof FIELD_SCENERIES[0]) => void;
  selectedSceneryId: string;
  useWebcam: boolean;
  onToggleWebcam: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onResetData: () => void;
}

export const SimControls: React.FC<SimControlsProps> = ({
  gpsLocation,
  isGpsEnabled,
  onToggleGpsEnabled,
  onChangeAccuracy,
  onSelectScenery,
  selectedSceneryId,
  useWebcam,
  onToggleWebcam,
  isOffline,
  onToggleOffline,
  onResetData,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Panel de Pruebas Simulador</h2>
            <p className="text-[11px] text-slate-400">Control de Sensores Android & Hardware GPS</p>
          </div>
        </div>
        <span className="text-[10px] bg-slate-800 text-sky-400 px-2 py-0.5 rounded-full font-mono border border-slate-700">
          Hardware Live
        </span>
      </div>

      {/* 1. Precision GPS Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-sky-400" /> Precisión del GPS
          </label>
          <span
            className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              !gpsLocation || !isGpsEnabled
                ? 'bg-slate-800 text-slate-500'
                : gpsLocation.accuracyMeters < 15
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : gpsLocation.accuracyMeters <= 30
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isGpsEnabled && gpsLocation ? `${gpsLocation.accuracyMeters.toFixed(1)} metros` : 'GPS Off'}
          </span>
        </div>

        <input
          type="range"
          min="3"
          max="50"
          step="1"
          disabled={!isGpsEnabled}
          value={gpsLocation?.accuracyMeters || 10}
          onChange={(e) => onChangeAccuracy(parseFloat(e.target.value))}
          className="w-full accent-sky-500 bg-slate-950 h-2 rounded-lg cursor-pointer disabled:opacity-30"
        />

        {/* Quick Precision Presets */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onChangeAccuracy(8.0)}
            disabled={!isGpsEnabled}
            className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-bold transition cursor-pointer disabled:opacity-40"
          >
            Verde (&lt;15m)
          </button>
          <button
            onClick={() => onChangeAccuracy(22.0)}
            disabled={!isGpsEnabled}
            className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-[10px] font-bold transition cursor-pointer disabled:opacity-40"
          >
            Amarillo (15-30m)
          </button>
          <button
            onClick={() => onChangeAccuracy(38.0)}
            disabled={!isGpsEnabled}
            className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-lg text-[10px] font-bold transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1"
          >
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Rojo (&gt;30m)</span>
          </button>
        </div>
      </div>

      {/* 2. System Switches */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
        {/* GPS Power Switch */}
        <button
          onClick={onToggleGpsEnabled}
          className={`p-3 rounded-2xl border flex flex-col gap-1 transition cursor-pointer text-left ${
            isGpsEnabled
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Hardware GPS</span>
            <span className="text-[10px] uppercase font-mono font-bold">
              {isGpsEnabled ? 'Encendido' : 'Apagado'}
            </span>
          </div>
          <span className="text-[10px] opacity-80">
            {isGpsEnabled ? 'Respondiendo satélites' : 'Probar diálogo de ajustes'}
          </span>
        </button>

        {/* Offline Network Mode Switch */}
        <button
          onClick={onToggleOffline}
          className={`p-3 rounded-2xl border flex flex-col gap-1 transition cursor-pointer text-left ${
            isOffline
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              : 'bg-sky-500/10 border-sky-500/40 text-sky-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Red Móvil</span>
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          </div>
          <span className="text-[10px] opacity-80">
            {isOffline ? 'Modo Sin Conexión 100%' : 'Conexión 5G Activa'}
          </span>
        </button>
      </div>

      {/* 3. Camera Source & Scenery Selector */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-sky-400" /> Fuente de la Cámara
          </label>

          <button
            onClick={onToggleWebcam}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${
              useWebcam
                ? 'bg-sky-500 text-white border-sky-400'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{useWebcam ? 'Cámara Real Web' : 'Usar Fotos de Campo'}</span>
          </button>
        </div>

        {!useWebcam && (
          <div className="grid grid-cols-2 gap-2">
            {FIELD_SCENERIES.map((scenery) => {
              const isSelected = selectedSceneryId === scenery.id;
              return (
                <button
                  key={scenery.id}
                  onClick={() => onSelectScenery(scenery)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                    <img src={scenery.url} alt={scenery.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] truncate leading-tight">{scenery.name}</p>
                    <p className="text-[9px] text-slate-500 font-mono">
                      {scenery.lat.toFixed(2)}°, {scenery.lon.toFixed(2)}°
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Reset Button */}
      <div className="pt-2 border-t border-slate-800 flex justify-end">
        <button
          onClick={onResetData}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer Registros Iniciales</span>
        </button>
      </div>
    </div>
  );
};

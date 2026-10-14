import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  MapPin, 
  Clock, 
  HardDrive, 
  FileText, 
  RefreshCw, 
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { CaptureRecord } from '../../types/android';
import { formatCoordinates, getAccuracyColor } from '../../utils/database';

interface DetailScreenProps {
  record: CaptureRecord | null;
  onBack: () => void;
  onDeleteRecord: (id: string) => void;
  onToggleSyncStatus: (id: string, currentStatus: 'PENDING' | 'SYNCED') => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  record,
  onBack,
  onDeleteRecord,
  onToggleSyncStatus,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!record) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <p className="text-xs">Registro no encontrado o fue eliminado.</p>
        <button
          onClick={onBack}
          className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-sky-400 text-xs font-semibold"
        >
          Volver al Historial
        </button>
      </div>
    );
  }

  const coords = formatCoordinates(record.latitude, record.longitude);
  const accuracy = getAccuracyColor(record.accuracyMeters);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 font-sans relative overflow-hidden">
      {/* Top App Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Detalle de Captura
        </h2>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
          title="Eliminar Registro"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scrollable View */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Full Image Preview Container */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl group">
          <img
            src={record.photoUri || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'}
            alt="Foto Completa"
            className="w-full h-52 object-cover"
          />

          {/* Telemetry Box Overlay on Image */}
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20 text-[10px] font-mono text-white space-y-0.5 shadow-md">
            <div className="text-emerald-400 font-bold">{coords.latStr}</div>
            <div className="text-emerald-400 font-bold">{coords.lonStr}</div>
            <div className="text-slate-300 text-[9px]">
              Alt: {record.altitudeMeters ? `${record.altitudeMeters.toFixed(0)}m` : 'N/D'} | ±{record.accuracyMeters.toFixed(1)}m
            </div>
          </div>

          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-white/20">
            ISO 8601 UTC
          </div>
        </div>

        {/* Sync Status Action Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 ${
                record.syncStatus === 'SYNCED'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {record.syncStatus === 'SYNCED' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> SYNCED (En servidor)
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" /> PENDING (Solo local)
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => onToggleSyncStatus(record.id, record.syncStatus)}
            className="text-[10px] font-semibold text-sky-400 hover:text-sky-300 underline cursor-pointer"
          >
            {record.syncStatus === 'SYNCED' ? 'Marcar como Pendiente' : 'Marcar como Sincronizado'}
          </button>
        </div>

        {/* Metadata Specs Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Metadatos del Registro (Room Entity)
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* UUID */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 font-sans">Primary Key (UUID):</span>
              <span className="text-[11px] text-slate-200 bg-slate-950 p-1.5 rounded border border-slate-800/80 break-all">
                {record.id}
              </span>
            </div>

            {/* CreatedAt ISO */}
            <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
              <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" /> Fecha ISO 8601:
              </span>
              <span className="text-slate-200 text-[11px] font-semibold">{record.createdAt}</span>
            </div>

            {/* Coordinates */}
            <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
              <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" /> Latitud / Longitud:
              </span>
              <span className="text-emerald-400 font-bold text-[11px]">
                {record.latitude.toFixed(5)}°, {record.longitude.toFixed(5)}°
              </span>
            </div>

            {/* GPS Accuracy */}
            <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
              <span className="text-slate-400 text-[11px] font-sans">Precisión GPS (Radio):</span>
              <span className={`font-bold text-[11px] ${accuracy.text}`}>
                {record.accuracyMeters.toFixed(1)} m ({accuracy.label})
              </span>
            </div>

            {/* Altitude */}
            <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
              <span className="text-slate-400 text-[11px] font-sans">Altitud sobre nivel del mar:</span>
              <span className="text-slate-200 font-semibold text-[11px]">
                {record.altitudeMeters ? `${record.altitudeMeters.toFixed(1)} m` : 'No disponible'}
              </span>
            </div>

            {/* Photo Physical Path */}
            <div className="flex flex-col gap-0.5 pt-1">
              <span className="text-[10px] text-slate-500 font-sans flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-slate-500" /> Ruta Almacenamiento Interno (`context.filesDir`):
              </span>
              <span className="text-[10px] text-amber-300 bg-slate-950 p-1.5 rounded border border-slate-800/80 break-all">
                {record.photoPath}
              </span>
            </div>
          </div>
        </div>

        {/* Field Notes Section */}
        {record.note && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-sky-400" /> Observaciones / Notas de Campo:
            </span>
            <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800 italic">
              "{record.note}"
            </p>
          </div>
        )}

        {/* External Map Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-sky-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver Coordenadas en Google Maps</span>
        </a>
      </div>

      {/* MODAL ELIMINAR CONFIRMACIÓN */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl p-4 max-w-xs w-full shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <Trash2 className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-bold text-white">¿Eliminar Registro?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Esta acción borrará permanentemente la entrada en la <span className="font-semibold text-white">Room DB</span> y eliminará la foto guardada en <span className="font-mono text-amber-300">context.filesDir</span>.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDeleteRecord(record.id);
                  setShowDeleteConfirm(false);
                  onBack();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white font-bold hover:bg-rose-500 cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

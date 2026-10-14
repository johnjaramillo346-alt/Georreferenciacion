import React, { useState, useRef, useEffect } from 'react';
import { 
  WifiOff, 
  Camera, 
  Check, 
  AlertTriangle, 
  Settings, 
  Image as ImageIcon,
  RefreshCw,
  Save
} from 'lucide-react';
import { GpsLocation, CaptureRecord } from '../../types/android';
import { formatCoordinates, getAccuracyColor } from '../../utils/database';

interface NewCaptureScreenProps {
  gpsLocation: GpsLocation | null;
  isGpsEnabled: boolean;
  isGpsRefreshing: boolean;
  onRefreshGps: () => void;
  onSaveCapture: (record: Omit<CaptureRecord, 'id' | 'createdAt'>) => void;
  onNavigateToHistory: () => void;
  selectedSceneryUrl: string;
  useWebcam: boolean;
}

export const NewCaptureScreen: React.FC<NewCaptureScreenProps> = ({
  gpsLocation,
  isGpsEnabled,
  isGpsRefreshing,
  onRefreshGps,
  onSaveCapture,
  onNavigateToHistory,
  selectedSceneryUrl,
  useWebcam,
}) => {
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showLowAccuracyDialog, setShowLowAccuracyDialog] = useState(false);
  const [showGpsDisabledDialog, setShowGpsDisabledDialog] = useState(false);
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Setup webcam if enabled
  useEffect(() => {
    let active = true;
    if (useWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (active) {
            setWebcamStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          }
        })
        .catch(err => {
          console.warn('Webcam not accessible, fallback to scenery photo', err);
        });
    } else {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        setWebcamStream(null);
      }
    }
    return () => {
      active = false;
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useWebcam]);

  const accuracyInfo = gpsLocation 
    ? getAccuracyColor(gpsLocation.accuracyMeters)
    : { bg: 'bg-slate-700', text: 'text-slate-400', border: 'border-slate-600', badge: 'bg-slate-600', label: 'Sin GPS' };

  const coords = gpsLocation 
    ? formatCoordinates(gpsLocation.latitude, gpsLocation.longitude) 
    : { latStr: '--', lonStr: '--' };

  const handleTakeSnapshot = () => {
    if (!isGpsEnabled) {
      setShowGpsDisabledDialog(true);
      return;
    }

    setIsShutterActive(true);
    setTimeout(() => setIsShutterActive(false), 200);

    // Audio beep effect
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio error
    }

    if (useWebcam && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhotoUrl(dataUri);
      }
    } else {
      setCapturedPhotoUrl(selectedSceneryUrl);
    }
  };

  const handleAttemptSave = () => {
    if (!isGpsEnabled) {
      setShowGpsDisabledDialog(true);
      return;
    }
    if (!gpsLocation || !capturedPhotoUrl) return;

    // REQUISITO: Alerta si precisión es > 25 metros
    if (gpsLocation.accuracyMeters > 25) {
      setShowLowAccuracyDialog(true);
    } else {
      executeSave();
    }
  };

  const executeSave = () => {
    if (!gpsLocation || !capturedPhotoUrl) return;

    const timestampFile = Date.now();
    const photoPath = `/data/user/0/com.geocam.offline/files/captures/IMG_${timestampFile}.jpg`;

    onSaveCapture({
      latitude: gpsLocation.latitude,
      longitude: gpsLocation.longitude,
      accuracyMeters: gpsLocation.accuracyMeters,
      altitudeMeters: gpsLocation.altitudeMeters,
      photoPath: photoPath,
      photoUri: capturedPhotoUrl,
      note: note.trim() || null,
      syncStatus: 'PENDING',
    });

    setCapturedPhotoUrl(null);
    setNote('');
    setShowLowAccuracyDialog(false);
  };

  const canSave = gpsLocation !== null && capturedPhotoUrl !== null && isGpsEnabled;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 font-sans relative overflow-hidden">
      {/* Top Banner: Modo sin conexión (Offline-First) - MATCHES SCREENSHOT */}
      <div className="bg-amber-400 text-slate-950 px-3 py-1 flex items-center justify-center gap-2 text-xs font-bold shadow-md z-30">
        <WifiOff className="w-3.5 h-3.5 text-slate-900" />
        <span>Modo sin conexión</span>
        <span className="text-[10px] bg-amber-950/20 px-1.5 py-0.5 rounded font-mono">Hardware GPS</span>
      </div>

      {/* Main Camera / Viewfinder Viewport */}
      <div className="relative flex-1 bg-black flex flex-col justify-between overflow-hidden">
        {/* Background Stream or Scenery */}
        {useWebcam ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={capturedPhotoUrl || selectedSceneryUrl} 
            alt="Camera Preview" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        {/* Shutter Flash overlay */}
        {isShutterActive && (
          <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-200" />
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* HUD Telemetry Overlays (Matches EXACT prompt photo style!) */}
        <div className="relative z-10 p-3 flex justify-between items-start pointer-events-none">
          {/* Top-Left GPS Telemetry Box */}
          <div className="bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/20 font-mono text-[11px] text-white space-y-0.5 shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Lat:</span>
              <span className="font-semibold text-emerald-400">{coords.latStr}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Lon:</span>
              <span className="font-semibold text-emerald-400">{coords.lonStr}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-300">
              <span className="text-slate-400">Alt:</span>
              <span>{gpsLocation?.altitudeMeters ? `${gpsLocation.altitudeMeters.toFixed(0)}m` : 'N/D'}</span>
            </div>
          </div>

          {/* Top-Right Timestamp Box */}
          <div className="bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/20 font-mono text-[11px] text-right text-white shadow-lg">
            <div className="font-bold text-slate-200">
              {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              {new Date().toLocaleTimeString()} Local
            </div>
          </div>
        </div>

        {/* Center Camera Crosshairs / Reticle */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer Circle */}
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center" />
            {/* Center Cross Hair */}
            <div className="absolute w-6 h-0.5 bg-white/70" />
            <div className="absolute h-6 w-0.5 bg-white/70" />
            <div className="absolute top-1 text-[9px] font-mono text-white/50">+</div>
            <div className="absolute bottom-1 text-[9px] font-mono text-white/50">+</div>
          </div>
        </div>

        {/* Photo Captured Confirmation Badge */}
        {capturedPhotoUrl && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-emerald-500/90 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-lg animate-bounce">
            <Check className="w-3.5 h-3.5" />
            <span>Foto Capturada</span>
            <button 
              onClick={() => setCapturedPhotoUrl(null)}
              className="ml-1 text-[10px] underline text-emerald-100 hover:text-white"
            >
              Repetir
            </button>
          </div>
        )}

        {/* Bottom Shutter Control Bar */}
        <div className="relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 pb-3 px-4 flex items-center justify-between">
          {/* Gallery Button */}
          <button
            onClick={onNavigateToHistory}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-slate-200" />
            </div>
            <span className="text-[10px] font-medium">Galería</span>
          </button>

          {/* Shutter Capture Button */}
          <button
            onClick={handleTakeSnapshot}
            className="group relative flex items-center justify-center cursor-pointer"
            title="Tomar Foto"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-sky-500 hover:bg-sky-400 active:scale-95 transition-all shadow-xl">
              <Camera className="w-7 h-7 text-white" />
            </div>
          </button>

          {/* Refresh GPS Button */}
          <button
            onClick={onRefreshGps}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
              <RefreshCw className={`w-5 h-5 text-sky-400 ${isGpsRefreshing ? 'animate-spin' : ''}`} />
            </div>
            <span className="text-[10px] font-medium">Refrescar GPS</span>
          </button>
        </div>
      </div>

      {/* Control Panel Below Camera */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2.5 z-20">
        {/* GPS Accuracy Status Indicator */}
        <div className={`p-2.5 rounded-xl border ${accuracyInfo.border} ${accuracyInfo.bg} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${accuracyInfo.badge} animate-pulse`} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${accuracyInfo.text}`}>
                  Precisión GPS: {gpsLocation ? `${gpsLocation.accuracyMeters.toFixed(1)}m` : 'Buscando satélites...'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  ({accuracyInfo.label})
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {gpsLocation ? `${coords.latStr}, ${coords.lonStr}` : 'Esperando fijación GPS...'}
              </div>
            </div>
          </div>

          {!isGpsEnabled && (
            <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> GPS Off
            </span>
          )}
        </div>

        {/* Optional Notes Input */}
        <div className="relative">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notas de campo u observación (Opcional)"
            className="w-full bg-slate-950 text-slate-100 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-sky-500 placeholder-slate-500"
          />
        </div>

        {/* Save Record Button */}
        <button
          onClick={handleAttemptSave}
          disabled={!canSave}
          className={`w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
            canSave
              ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <Save className="w-4 h-4" />
          <span>
            {!gpsLocation
              ? 'Esperando Ubicación GPS...'
              : !capturedPhotoUrl
              ? 'Captura una Foto para Guardar'
              : 'Guardar Registro Local (Room DB)'}
          </span>
        </button>
      </div>

      {/* MODAL 1: Alerta de Precisión Baja (>25m) - REQUISITO DEL PROMPT */}
      {showLowAccuracyDialog && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-4 max-w-xs w-full shadow-2xl text-left space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-sm font-bold text-white">Precisión GPS Baja</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              La precisión actual es de <span className="font-bold text-amber-400">{gpsLocation?.accuracyMeters.toFixed(1)} metros</span> (superior al umbral recomendado de 25m).
            </p>
            <p className="text-[11px] text-slate-400 italic">
              ¿Deseas guardar el registro con esta ubicación imprecisa?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowLowAccuracyDialog(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={executeSave}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 cursor-pointer"
              >
                Sí, Guardar de Todos Modos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Alerta GPS Desactivado - REQUISITO DEL PROMPT */}
      {showGpsDisabledDialog && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl p-4 max-w-xs w-full shadow-2xl text-left space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
              <Settings className="w-6 h-6 shrink-0" />
              <h3 className="text-sm font-bold text-white">GPS Desactivado</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              El servicio de ubicación del sistema está apagado. Para georreferenciar la foto localmente es necesario activar el GPS de alta precisión.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowGpsDisabledDialog(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setShowGpsDisabledDialog(false);
                  onRefreshGps();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 text-white font-bold hover:bg-sky-500 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Activar GPS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

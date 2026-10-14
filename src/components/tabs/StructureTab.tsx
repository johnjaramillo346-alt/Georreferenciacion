import React from 'react';
import { Folder, FileCode, Cpu, Database, Camera, MapPin, Layers, Smartphone, ArrowRight } from 'lucide-react';

export const StructureTab: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Overview Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Estructura de Paquetes y Arquitectura MVVM</h2>
            <p className="text-xs text-slate-400">Patrón Clean Architecture en Kotlin para Jetpack Compose & Room DB</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          El proyecto está organizado siguiendo los principios de <strong className="text-white">Clean Architecture</strong> propuesta por Android Jetpack: separación clara entre Capa de UI (Jetpack Compose + ViewModel), Capa de Dominio (Interfaces Repositorio) y Capa de Datos (Room DAO, Entidades SQLite y Servicios Hardware FusedLocation / CameraX).
        </p>
      </div>

      {/* Interactive Visual Folder Tree & Architectural Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tree Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-400" />
            Estructura de Carpetas (`com.geocam.offline`)
          </h3>

          <div className="font-mono text-xs text-slate-300 space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
            {/* Root */}
            <div className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Folder className="w-4 h-4" /> com.geocam.offline
            </div>

            {/* Subfolders */}
            <div className="pl-4 space-y-2 border-l border-slate-800 ml-2">
              {/* camera */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Camera className="w-3.5 h-3.5 text-amber-400" /> camera/
                </div>
                <div className="pl-4 text-slate-400 text-[11px] flex items-center gap-1">
                  <FileCode className="w-3 h-3 text-slate-50" /> CameraXManager.kt
                </div>
              </div>

              {/* data */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> data/
                </div>
                <div className="pl-4 text-slate-400 text-[11px] space-y-0.5">
                  <div className="text-emerald-400/80">├─ local/</div>
                  <div className="pl-3 text-slate-300">├─ entity/CaptureRecord.kt</div>
                  <div className="pl-3 text-slate-300">├─ dao/CaptureDao.kt</div>
                  <div className="pl-3 text-slate-300">└─ AppDatabase.kt</div>
                  <div className="text-emerald-400/80">└─ repository/CaptureRepositoryImpl.kt</div>
                </div>
              </div>

              {/* di */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> di/
                </div>
                <div className="pl-4 text-slate-400 text-[11px]">
                  <div className="text-slate-300">└─ DatabaseModule.kt (Hilt DI)</div>
                </div>
              </div>

              {/* domain */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-sky-300">
                  <Layers className="w-3.5 h-3.5 text-sky-400" /> domain/
                </div>
                <div className="pl-4 text-slate-400 text-[11px]">
                  <div className="text-slate-300">└─ repository/CaptureRepository.kt</div>
                </div>
              </div>

              {/* location */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-rose-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> location/
                </div>
                <div className="pl-4 text-slate-400 text-[11px]">
                  <div className="text-slate-300">└─ LocationClient.kt (FusedLocation)</div>
                </div>
              </div>

              {/* ui */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-300">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> ui/
                </div>
                <div className="pl-4 text-slate-400 text-[11px] space-y-0.5">
                  <div className="text-indigo-400/80">├─ screens/</div>
                  <div className="pl-3 text-slate-300">├─ NewCaptureScreen.kt</div>
                  <div className="pl-3 text-slate-300">├─ HistoryScreen.kt</div>
                  <div className="pl-3 text-slate-300">└─ DetailScreen.kt</div>
                  <div className="text-indigo-400/80">└─ viewmodel/CaptureViewModel.kt</div>
                </div>
              </div>

              <div className="pt-1 text-slate-300 font-bold">
                └─ MainActivity.kt
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Flow Explanation */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Flujo de Datos Offline-First
            </h3>

            {/* Layer 1: UI */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-indigo-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">1. UI Layer (Jetpack Compose)</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  NewCaptureScreen
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Muestra la vista previa de la cámara, observando <code className="text-sky-300 font-mono">StateFlow&lt;NewCaptureUiState&gt;</code>. Valida precisión de GPS y abre diálogos si &gt;25m.
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>

            {/* Layer 2: ViewModel */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-sky-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">2. ViewModel Layer (MVVM)</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-mono">
                  CaptureViewModel
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Coordina las señales del <code className="text-rose-400 font-mono">LocationClient</code> y la captura de archivo de <code className="text-amber-400 font-mono">CameraXManager</code>.
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>

            {/* Layer 3: Data & Storage */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">3. Data & Storage Layer</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Room DB + filesDir
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Escribe la imagen JPEG físicamente en <code className="text-amber-300 font-mono">context.filesDir/captures/</code> y guarda la entrada con la ruta absoluta en la base de datos Room SQLite local.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1">
              ⚡ Autonomía 100% Sin Internet:
            </span>
            <p className="text-[11px] opacity-90">
              Ninguna dependencia hacia API externa. El chip GPS de hardware calcula la posición sin datos móviles y la base de datos Room persiste todos los registros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

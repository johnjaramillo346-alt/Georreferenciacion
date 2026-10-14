import React from 'react';
import { BookOpen } from 'lucide-react';

export const GuideTab: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Guía de Configuración e Integración Android</h2>
            <p className="text-xs text-slate-400">Instrucciones paso a paso para Android Studio y Kotlin</p>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3 text-sky-400 font-bold text-sm">
            <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-xs">
              1
            </div>
            <span>Crear Proyecto en Android Studio</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            Abre Android Studio (Iguana o posterior), selecciona <strong className="text-white">Empty Activity (Jetpack Compose)</strong>, asigna el Package Name <code className="text-amber-300 font-mono">com.geocam.offline</code> y selecciona <strong className="text-white">Minimum SDK 24 (Android 7.0)</strong> para garantizar compatibilidad con el 99% de dispositivos en campo.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs">
              2
            </div>
            <span>Configurar Version Catalog (`gradle/libs.versions.toml`) y `build.gradle.kts`</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            Copia el contenido del archivo <code className="text-sky-300 font-mono">libs.versions.toml</code> en la pestaña <strong className="text-white">Dependencias</strong>. Luego actualiza el archivo <code className="text-sky-300 font-mono">app/build.gradle.kts</code> y presiona <strong className="text-white">Sync Project with Gradle Files</strong>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3 text-purple-400 font-bold text-sm">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs">
              3
            </div>
            <span>Estructura de Archivos Kotlin</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-10">
            Crea la jerarquía de paquetes e incluye las clases correspondientes:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-14 font-mono list-disc">
            <li><strong className="text-amber-300">CaptureRecord.kt</strong>: Entidad Room con anotaciones `@Entity` y `@PrimaryKey`.</li>
            <li><strong className="text-amber-300">CaptureDao.kt</strong>: Data Access Object con Flow reactivo.</li>
            <li><strong className="text-amber-300">AppDatabase.kt</strong>: Definición de RoomDatabase.</li>
            <li><strong className="text-amber-300">LocationClient.kt</strong>: FusedLocationProviderClient con PRIORITY_HIGH_ACCURACY.</li>
            <li><strong className="text-amber-300">CaptureViewModel.kt</strong>: ViewModel con control de umbral &gt;25m de precisión.</li>
            <li><strong className="text-amber-300">NewCaptureScreen.kt / HistoryScreen.kt / DetailScreen.kt</strong>: UI Jetpack Compose.</li>
          </ul>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs">
              4
            </div>
            <span>Declaración de Permisos en AndroidManifest.xml</span>
          </div>
          <div className="pl-10 space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              Asegúrate de registrar en <code className="text-sky-300 font-mono">AndroidManifest.xml</code> los permisos de ubicación fina y cámara:
            </p>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-amber-300 overflow-x-auto">
{`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.location.gps" android:required="true" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

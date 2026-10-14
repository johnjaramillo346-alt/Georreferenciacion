import { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Code2, 
  Layers, 
  BookOpen, 
  Camera, 
  Database, 
  History, 
  WifiOff, 
  Terminal
} from 'lucide-react';

import { AppTab, AppScreen, CaptureRecord, GpsLocation } from './types/android';
import { loadRecordsFromStorage, saveRecordsToStorage } from './utils/database';
import { AndroidFrame } from './components/AndroidFrame';
import { NewCaptureScreen } from './components/screens/NewCaptureScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { SimControls, FIELD_SCENERIES } from './components/SimControls';
import { DependenciesTab } from './components/tabs/DependenciesTab';
import { StructureTab } from './components/tabs/StructureTab';
import { SourceCodeTab } from './components/tabs/SourceCodeTab';
import { GuideTab } from './components/tabs/GuideTab';

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('simulator');
  const [androidScreen, setAndroidScreen] = useState<AppScreen>('new_capture');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Persistence State
  const [records, setRecords] = useState<CaptureRecord[]>(() => loadRecordsFromStorage());

  // GPS Simulation State
  const [isGpsEnabled, setIsGpsEnabled] = useState<boolean>(true);
  const [isGpsRefreshing, setIsGpsRefreshing] = useState<boolean>(false);
  const [selectedScenery, setSelectedScenery] = useState(FIELD_SCENERIES[0]);
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);

  const [gpsLocation, setGpsLocation] = useState<GpsLocation | null>({
    latitude: FIELD_SCENERIES[0].lat,
    longitude: FIELD_SCENERIES[0].lon,
    accuracyMeters: 8.4,
    altitudeMeters: FIELD_SCENERIES[0].alt,
    timestamp: Date.now(),
  });

  // Save to LocalStorage whenever records change
  useEffect(() => {
    saveRecordsToStorage(records);
  }, [records]);

  // Try real browser geolocation if available
  useEffect(() => {
    if (isGpsEnabled && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracyMeters: Math.max(pos.coords.accuracy || 10, 4.5),
            altitudeMeters: pos.coords.altitude || selectedScenery.alt,
            timestamp: pos.timestamp,
          });
        },
        (err) => {
          console.log('Browser GPS Fallback to selected scenery:', err.message);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, [isGpsEnabled]);

  const handleRefreshGps = () => {
    setIsGpsRefreshing(true);
    setTimeout(() => {
      if (isGpsEnabled) {
        // Slight jitter simulation
        const jitterLat = (Math.random() - 0.5) * 0.0008;
        const jitterLon = (Math.random() - 0.5) * 0.0008;
        setGpsLocation((prev) => ({
          latitude: (prev?.latitude || selectedScenery.lat) + jitterLat,
          longitude: (prev?.longitude || selectedScenery.lon) + jitterLon,
          accuracyMeters: prev?.accuracyMeters || 8.4,
          altitudeMeters: (prev?.altitudeMeters || selectedScenery.alt) + (Math.random() - 0.5) * 2,
          timestamp: Date.now(),
        }));
      }
      setIsGpsRefreshing(false);
    }, 600);
  };

  const handleSaveCapture = (newRecordData: Omit<CaptureRecord, 'id' | 'createdAt'>) => {
    const newRecord: CaptureRecord = {
      ...newRecordData,
      id: crypto.randomUUID ? crypto.randomUUID() : `cap-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    setRecords((prev) => [newRecord, ...prev]);
    setAndroidScreen('history');
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (selectedRecordId === id) {
      setSelectedRecordId(null);
      setAndroidScreen('history');
    }
  };

  const handleToggleSyncStatus = (id: string, currentStatus: 'PENDING' | 'SYNCED') => {
    const nextStatus = currentStatus === 'PENDING' ? 'SYNCED' : 'PENDING';
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, syncStatus: nextStatus } : r))
    );
  };

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => ({ ...r, syncStatus: 'SYNCED' })));
      setIsSyncingAll(false);
    }, 1200);
  };

  const handleResetData = () => {
    localStorage.removeItem('geocam_offline_records_v1');
    window.location.reload();
  };

  const handleSelectScenery = (scenery: typeof FIELD_SCENERIES[0]) => {
    setSelectedScenery(scenery);
    setGpsLocation({
      latitude: scenery.lat,
      longitude: scenery.lon,
      accuracyMeters: gpsLocation?.accuracyMeters || 8.4,
      altitudeMeters: scenery.alt,
      timestamp: Date.now(),
    });
  };

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Global Top Navbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Camera className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">GeoCam Offline</h1>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                <WifiOff className="w-3 h-3" /> Offline First
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Kotlin • Jetpack Compose • Room DB • MVVM
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden md:flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulador Interactivo</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'code'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Código Kotlin (12 Clases)</span>
          </button>
          <button
            onClick={() => setActiveTab('dependencies')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'dependencies'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Gradle & Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Arquitectura MVVM</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-sky-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guía Android Studio</span>
          </button>
        </nav>

        {/* Mobile Tab Selector */}
        <div className="md:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as AppTab)}
            className="bg-slate-950 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-semibold"
          >
            <option value="simulator">📱 Simulador Android</option>
            <option value="code">💻 Código Kotlin</option>
            <option value="dependencies">⚙️ build.gradle.kts</option>
            <option value="structure">🏗️ Arquitectura MVVM</option>
            <option value="guide">📖 Guía de Integración</option>
          </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto">
        {/* TAB 1: Android App Live Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phone Frame Column */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center">
              <AndroidFrame isOffline={isOffline}>
                {/* Screen Switcher */}
                {androidScreen === 'new_capture' && (
                  <NewCaptureScreen
                    gpsLocation={isGpsEnabled ? gpsLocation : null}
                    isGpsEnabled={isGpsEnabled}
                    isGpsRefreshing={isGpsRefreshing}
                    onRefreshGps={handleRefreshGps}
                    onSaveCapture={handleSaveCapture}
                    onNavigateToHistory={() => setAndroidScreen('history')}
                    selectedSceneryUrl={selectedScenery.url}
                    useWebcam={useWebcam}
                  />
                )}

                {androidScreen === 'history' && (
                  <HistoryScreen
                    records={records}
                    onSelectRecord={(id) => {
                      setSelectedRecordId(id);
                      setAndroidScreen('detail');
                    }}
                    onSyncAll={handleSyncAll}
                    isSyncing={isSyncingAll}
                  />
                )}

                {androidScreen === 'detail' && (
                  <DetailScreen
                    record={selectedRecord}
                    onBack={() => setAndroidScreen('history')}
                    onDeleteRecord={handleDeleteRecord}
                    onToggleSyncStatus={handleToggleSyncStatus}
                  />
                )}

                {/* Jetpack Compose NavigationBar Bottom Bar */}
                <div className="bg-slate-950 border-t border-slate-800 px-4 py-2 flex items-center justify-around z-30">
                  <button
                    onClick={() => setAndroidScreen('new_capture')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition cursor-pointer ${
                      androidScreen === 'new_capture' ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>Nueva Captura</span>
                  </button>

                  <button
                    onClick={() => setAndroidScreen('history')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition cursor-pointer relative ${
                      androidScreen === 'history' || androidScreen === 'detail' ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <History className="w-4 h-4" />
                    <span>Historial ({records.length})</span>
                    {records.filter(r => r.syncStatus === 'PENDING').length > 0 && (
                      <span className="absolute -top-1 -right-2 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-slate-950" />
                    )}
                  </button>
                </div>
              </AndroidFrame>
            </div>

            {/* Side Controls & Live Info Column */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6">
              <SimControls
                gpsLocation={gpsLocation}
                isGpsEnabled={isGpsEnabled}
                onToggleGpsEnabled={() => setIsGpsEnabled(!isGpsEnabled)}
                onChangeAccuracy={(meters) => {
                  if (gpsLocation) {
                    setGpsLocation({ ...gpsLocation, accuracyMeters: meters });
                  }
                }}
                onSelectScenery={handleSelectScenery}
                selectedSceneryId={selectedScenery.id}
                useWebcam={useWebcam}
                onToggleWebcam={() => setUseWebcam(!useWebcam)}
                isOffline={isOffline}
                onToggleOffline={() => setIsOffline(!isOffline)}
                onResetData={handleResetData}
              />

              {/* Real-time Room DB Inspector Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Estado de Base de Datos Local Room</h3>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                    Persistent Storage Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-mono">TOTAL REGISTROS</p>
                    <p className="text-xl font-bold text-white font-mono mt-0.5">{records.length}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-amber-500/30">
                    <p className="text-[10px] text-amber-400 font-mono">PENDING SYNC</p>
                    <p className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                      {records.filter(r => r.syncStatus === 'PENDING').length}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-500/30">
                    <p className="text-[10px] text-emerald-400 font-mono">SYNCED</p>
                    <p className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                      {records.filter(r => r.syncStatus === 'SYNCED').length}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  💡 <strong className="text-slate-200">Persistence offline:</strong> Cada registro incluye identificador UUID único, coordenadas GPS capturadas, precisión en metros, timestamp ISO 8601 y ruta privada de almacenamiento <code className="text-amber-300 font-mono">context.filesDir</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Source Code */}
        {activeTab === 'code' && <SourceCodeTab />}

        {/* TAB 3: Dependencies & Gradle */}
        {activeTab === 'dependencies' && <DependenciesTab />}

        {/* TAB 4: Architecture */}
        {activeTab === 'structure' && <StructureTab />}

        {/* TAB 5: Android Studio Guide */}
        {activeTab === 'guide' && <GuideTab />}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <span>GeoCam Offline v1.0.0 • Clean Architecture Android MVVM</span>
          <span>Kotlin 2.0 • Jetpack Compose • Room 2.6 • FusedLocation</span>
        </div>
      </footer>
    </div>
  );
}
export default App;

import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  MapPin, 
  CloudUpload, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Database,
  Filter
} from 'lucide-react';
import { CaptureRecord } from '../../types/android';
import { formatCoordinates } from '../../utils/database';

interface HistoryScreenProps {
  records: CaptureRecord[];
  onSelectRecord: (recordId: string) => void;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  records,
  onSelectRecord,
  onSyncAll,
  isSyncing,
}) => {
  const [searchTerm, setSearchText] = useState('');
  const [filterSync, setFilterSync] = useState<'ALL' | 'PENDING' | 'SYNCED'>('ALL');

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      (r.note || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.latitude.toString().includes(searchTerm) ||
      r.longitude.toString().includes(searchTerm) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterSync === 'PENDING') return matchesSearch && r.syncStatus === 'PENDING';
    if (filterSync === 'SYNCED') return matchesSearch && r.syncStatus === 'SYNCED';
    return matchesSearch;
  });

  const pendingCount = records.filter(r => r.syncStatus === 'PENDING').length;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 font-sans relative overflow-hidden">
      {/* Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-400" />
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Historial de Capturas</h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Room DB local • {records.length} registros
            </p>
          </div>
        </div>

        {/* Sync All Button */}
        {pendingCount > 0 && (
          <button
            onClick={onSyncAll}
            disabled={isSyncing}
            className="px-2.5 py-1 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition shadow cursor-pointer"
          >
            <CloudUpload className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : `Sincronizar (${pendingCount})`}</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nota, id o coordenadas..."
            value={searchTerm}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Estado:
          </span>
          <button
            onClick={() => setFilterSync('ALL')}
            className={`px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
              filterSync === 'ALL' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({records.length})
          </button>
          <button
            onClick={() => setFilterSync('PENDING')}
            className={`px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
              filterSync === 'PENDING' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Pendientes ({pendingCount})
          </button>
          <button
            onClick={() => setFilterSync('SYNCED')}
            className={`px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
              filterSync === 'SYNCED' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Sincronizados ({records.length - pendingCount})
          </button>
        </div>
      </div>

      {/* LazyColumn Records List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredRecords.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-2">
            <Database className="w-10 h-10 text-slate-700" />
            <p className="text-xs">No hay registros guardados que coincidan.</p>
            <p className="text-[10px] text-slate-600">
              Captura fotos desde el visor para guardar datos en la Room DB local.
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const coords = formatCoordinates(record.latitude, record.longitude);
            const dateFormatted = new Date(record.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record.id)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl p-2.5 flex items-center gap-3 transition cursor-pointer group active:scale-98 shadow-sm"
              >
                {/* Photo Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-slate-800">
                  <img
                    src={record.photoUri || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80'}
                    alt="Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-mono text-center text-slate-300 py-0.5">
                    {record.accuracyMeters.toFixed(0)}m
                  </div>
                </div>

                {/* Record Metadata */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {dateFormatted}
                    </span>

                    {/* Sync Status Badge */}
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 ${
                        record.syncStatus === 'SYNCED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {record.syncStatus === 'SYNCED' ? (
                        <>
                          <CheckCircle2 className="w-2.5 h-3" />
                          <span>SYNCED</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-2.5 h-3" />
                          <span>PENDING</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Coordinates & Accuracy */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300 truncate">
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      {coords.latStr}, {coords.lonStr}
                    </span>
                  </div>

                  {/* Optional Note snippet */}
                  {record.note ? (
                    <p className="text-[11px] text-slate-300 truncate italic">
                      "{record.note}"
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-500 font-mono truncate">
                      Path: {record.photoPath.split('/').pop()}
                    </p>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 shrink-0" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

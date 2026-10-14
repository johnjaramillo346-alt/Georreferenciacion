import React, { useState } from 'react';
import { FileCode, Copy, Check, Search, Download, Code } from 'lucide-react';
import { KOTLIN_FILES } from '../../data/kotlinCode';

export const SourceCodeTab: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('capture-entity');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentFile = KOTLIN_FILES.find(f => f.id === selectedFileId) || KOTLIN_FILES[0];

  const filteredFiles = KOTLIN_FILES.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCurrentCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const combinedContent = KOTLIN_FILES.map(f => `// ==========================================\n// FILE: ${f.path}\n// ${f.description}\n// ==========================================\n\n${f.code}\n\n`).join('\n');
    const blob = new Blob([combinedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GeoCam_Offline_Android_Kotlin_SourceCode.kt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Explorador de Código Fuente Kotlin & Android</h2>
            <p className="text-xs text-slate-400">
              Clases de Arquitectura MVVM, Room DB, FusedLocation, CameraX y Jetpack Compose
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Todo el Código (.kt)</span>
        </button>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
        {/* File Tree Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar archivo (Entity, DAO, ViewModel...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 max-h-[580px] pr-1">
            {filteredFiles.map((file) => {
              const isSelected = file.id === selectedFileId;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-500/50 text-sky-300 font-semibold shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs truncate">{file.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {file.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      {file.path}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content Area */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* File Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{currentFile.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono truncate">{currentFile.path}</p>
              </div>
            </div>

            <button
              onClick={copyCurrentCode}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sky-400" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* Description banner */}
          <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800/60 text-xs text-sky-300/90 font-mono flex items-center gap-2">
            <span className="font-bold text-slate-500">RESUMEN:</span>
            <span>{currentFile.description}</span>
          </div>

          {/* Syntax Code Editor Container */}
          <div className="flex-1 bg-slate-950 overflow-auto p-4 max-h-[560px]">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
              <code>{currentFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

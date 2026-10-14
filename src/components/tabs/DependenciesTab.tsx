import React, { useState } from 'react';
import { Copy, Check, FileCode, Layers, ShieldCheck } from 'lucide-react';
import { KOTLIN_FILES } from '../../data/kotlinCode';

export const DependenciesTab: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gradleFile = KOTLIN_FILES.find(f => f.id === 'build-gradle-kts');
  const catalogFile = KOTLIN_FILES.find(f => f.id === 'libs-versions-toml');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Stack Tecnológico & Dependencias Android</h2>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verificado para Android Studio Hedgehog / Iguana
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Lista exacta de librerías oficiales para un desarrollo <strong className="text-white">OFFLINE-FIRST</strong>. Incluye Jetpack Compose (Material3), Room DB (2.6+), Fused Location Provider de Google Play Services con prioridad <code className="text-sky-400 font-mono">PRIORITY_HIGH_ACCURACY</code>, CameraX para captura de fotos de alta resolución y Hilt para inyección de dependencias.
            </p>
          </div>
        </div>
      </div>

      {/* Grid with Both Files */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. build.gradle.kts */}
        {gradleFile && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{gradleFile.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{gradleFile.path}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(gradleFile.code, 'gradle')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              >
                {copiedId === 'gradle' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Gradle</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-200 bg-slate-950/70 overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{gradleFile.code}</code>
            </pre>
          </div>
        )}

        {/* 2. libs.versions.toml */}
        {catalogFile && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{catalogFile.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{catalogFile.path}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(catalogFile.code, 'catalog')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              >
                {copiedId === 'catalog' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar TOML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-200 bg-slate-950/70 overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{catalogFile.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

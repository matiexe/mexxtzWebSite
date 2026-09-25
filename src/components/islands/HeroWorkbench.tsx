import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Layout, Play, CheckCircle2, Sparkles, Layers, Activity } from 'lucide-react';

export default function HeroWorkbench() {
  const [activeTab, setActiveTab] = useState<'code' | 'pipeline' | 'dashboard'>('code');
  const [simulating, setSimulating] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(2);

  useEffect(() => {
    if (!simulating) return;
    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 1400);
    return () => clearInterval(interval);
  }, [simulating]);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-[#080d18]/90 backdrop-blur-xl shadow-2xl overflow-hidden font-sans">
      {/* Blueprint corner markers */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

      {/* Header bar / Window title */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#060911]/90">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400">mexxtz-studio://workbench</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
            ENGINE ONLINE
          </span>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">14ms latency</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0f1d]/50 px-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono transition-all border-b-2 ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300 bg-white/[0.03]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>api/deploy.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono transition-all border-b-2 ${
              activeTab === 'pipeline'
                ? 'border-violet-400 text-violet-300 bg-white/[0.03]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ai_agent.pipeline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-mono transition-all border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-blue-400 text-blue-300 bg-white/[0.03]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>telemetry.view</span>
          </button>
        </div>

        <button
          onClick={() => setSimulating(!simulating)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 text-[11px] font-mono rounded border transition-colors ${
            simulating
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
          }`}
        >
          <Play className={`w-3 h-3 ${simulating ? 'text-cyan-400 animate-spin' : ''}`} />
          <span>{simulating ? 'Pausar' : 'Simular'}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-5 text-left min-h-[290px] flex flex-col justify-between">
        {activeTab === 'code' && (
          <div className="space-y-2 font-mono text-[12px] leading-relaxed">
            <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-white/5">
              <span>// Arquitectura limpia, tipada y sin dependencias superfluas</span>
              <span className="text-emerald-400">TypeScript 5.7</span>
            </div>
            <p className="text-slate-400">
              <span className="text-violet-400">import</span> &#123; createEngine, qualifyLead &#125; <span className="text-violet-400">from</span> <span className="text-emerald-300">'@mexxtz/core'</span>;
            </p>
            <p className="text-slate-400">
              <span className="text-violet-400">export async function</span> <span className="text-cyan-300">processSolution</span>(req: <span className="text-yellow-300">ClientRequest</span>) &#123;
            </p>
            <p className="text-slate-400 pl-4">
              <span className="text-blue-400">const</span> solution = <span className="text-violet-400">await</span> createEngine(&#123;
            </p>
            <p className="text-slate-400 pl-8">
              stack: [<span className="text-emerald-300">'Astro'</span>, <span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'AI-Agent'</span>],
            </p>
            <p className="text-slate-400 pl-8">
              performance: <span className="text-cyan-300">'100/100 CoreWebVitals'</span>,
            </p>
            <p className="text-slate-400 pl-8">
              automation: <span className="text-violet-300">true</span>,
            </p>
            <p className="text-slate-400 pl-4">&#125;);</p>
            <p className="text-slate-400 pl-4">
              <span className="text-violet-400">return</span> solution.<span className="text-cyan-300">deploy</span>(&#123; domain: <span className="text-emerald-300">'mexxtz.dev'</span> &#125;);
            </p>
            <p className="text-slate-400">&#125;</p>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Build test passing · 0 errors
              </span>
              <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                200 OK · 18ms
              </span>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-white/5 text-slate-400">
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 mr-1.5" />
                Agente de Calificación Automatizada
              </span>
              <span className="text-violet-400">STREAMING</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">01</span>
                <div>
                  <div className="text-slate-300 font-semibold">Visitante envía requerimiento</div>
                  <div className="text-slate-500 text-[11px]">"Necesito un sistema web con cobros recurrentes y panel"</div>
                </div>
              </div>

              <div className="p-2.5 rounded bg-violet-950/20 border border-violet-500/20 flex items-start space-x-3">
                <span className="text-violet-400 font-bold">02</span>
                <div>
                  <div className="text-violet-200 font-semibold flex items-center">
                    Agente IA analiza alcance y tecnologías
                    <span className="ml-2 w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  </div>
                  <div className="text-slate-400 text-[11px]">Stack: PostgreSQL + Stripe + Auth + React · Scope: Tier 4</div>
                </div>
              </div>

              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-start space-x-3">
                <span className="text-emerald-400 font-bold">03</span>
                <div>
                  <div className="text-slate-300 font-semibold">Lead calificado & notificación instantánea</div>
                  <div className="text-slate-500 text-[11px]">Presupuesto estimado: US$500+ · Notificación enviada a WhatsApp</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-white/5 text-slate-400 font-mono">
              <span className="flex items-center">
                <Activity className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                Telemetría en Producción
              </span>
              <span className="text-emerald-400">Todos los sistemas operativos</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[11px] font-mono text-slate-500">Uptime</div>
                <div className="text-lg font-bold text-white font-mono">99.98%</div>
                <div className="text-[10px] text-emerald-400 font-mono">Sin interrupciones</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[11px] font-mono text-slate-500">Velocidad FCP</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">0.42s</div>
                <div className="text-[10px] text-cyan-400 font-mono">Lighthouse 100/100</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[11px] font-mono text-slate-500">Automatizaciones</div>
                <div className="text-lg font-bold text-violet-400 font-mono">24/7</div>
                <div className="text-[10px] text-violet-400 font-mono">Agentes activos</div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Despliegues continuos con 0 downtime</span>
              <span className="text-slate-500">Edge Network</span>
            </div>
          </div>
        )}

        {/* Blueprint bottom info bar */}
        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center space-x-3">
            <span>MOD: WORKBENCH_V1</span>
            <span className="hidden sm:inline">ARCH: ASTRO_ISLANDS</span>
          </div>
          <div className="text-cyan-400/80">LATAM & GLOBAL CLIENTS</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { PRICING_TIERS } from '../../config/site';
import { Check, Sparkles, Sliders, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ModuleOption {
  id: string;
  name: string;
  code: string;
  price: number;
  description: string;
}

export default function InteractivePricingEstimator() {
  const [viewMode, setViewMode] = useState<'cards' | 'estimator'>('cards');

  // Estimator state
  const [selectedBase, setSelectedBase] = useState<'landing' | 'sitio' | 'profesional' | 'sistema'>('sitio');
  const [activeAddons, setActiveAddons] = useState<string[]>(['ia']);

  const basePlans: Record<string, { name: string; basePrice: number; desc: string }> = {
    landing: { name: 'Landing Page', basePrice: 120, desc: 'Página única orientada a conversión directa' },
    sitio: { name: 'Sitio Web Estándar', basePrice: 200, desc: 'Hasta 5 secciones personalizadas con SEO y responsive' },
    profesional: { name: 'Sitio Web Profesional', basePrice: 350, desc: 'Panel autogestionable, analítica y funciones a medida' },
    sistema: { name: 'Sistema Web a Medida', basePrice: 500, desc: 'Base de datos, roles de usuario, API y arquitectura custom' },
  };

  const addonModules: ModuleOption[] = [
    {
      id: 'ia',
      name: 'Agente IA Conversacional',
      code: 'MOD-AI',
      price: 150,
      description: 'Atención 24/7 y pre-calificación automática de leads',
    },
    {
      id: 'whatsapp-auto',
      name: 'Automatización WhatsApp & CRM',
      code: 'MOD-AUTO',
      price: 80,
      description: 'Envío de notificaciones y captura de pedidos automatizada',
    },
    {
      id: 'payments',
      name: 'Pasarela de Cobros (MercadoPago / Stripe)',
      code: 'MOD-PAY',
      price: 90,
      description: 'Checkout seguro, webhooks y confirmación de transacciones',
    },
    {
      id: 'support-month',
      name: 'Soporte y Mantenimiento (Primer Mes)',
      code: 'SRV-SUP',
      price: 30,
      description: 'Monitoreo, backups y optimización continua de código',
    },
  ];

  const toggleAddon = (id: string) => {
    setActiveAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const base = basePlans[selectedBase].basePrice;
    const addonsTotal = addonModules
      .filter((m) => activeAddons.includes(m.id))
      .reduce((sum, m) => sum + m.price, 0);
    return base + addonsTotal;
  };

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-sans">
      {/* Selector de Modo (Tarjetas Clásicas vs Calculador Blueprint) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === 'cards'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Planes Estructurados
          </button>
          <button
            onClick={() => setViewMode('estimator')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all ${
              viewMode === 'estimator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Cotizador Modular Blueprint</span>
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        /* Tarjetas de Precios Transparentes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? 'border-2 border-cyan-400/60 bg-[#0c1424] shadow-xl shadow-cyan-950/40 lg:-translate-y-2'
                  : 'border border-white/10 bg-[#090e1a]/80 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-[10px] tracking-wider uppercase font-bold shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px] mb-2">
                  <span>{tier.code}</span>
                  <span className="text-cyan-400/80">ALCANCE A MEDIDA</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-400 min-h-[36px] mb-4">{tier.subtitle}</p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-xs text-slate-500 font-mono block">Inversión:</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{tier.price}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 italic block mt-1">
                    *Precio orientativo según requerimientos
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToContact}
                className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs transition-all flex items-center justify-center space-x-2 ${
                  tier.highlight
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-950'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Cotizador Modular Blueprint (Opción 3 Combinada) */
        <div className="rounded-2xl border border-cyan-500/30 bg-[#090e1c] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COTIZADOR TÉCNICO INTERACTIVO</span>
              </div>
              <h3 className="text-xl font-bold text-white">Configura los módulos de tu proyecto</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Presupuesto Estimado</span>
              <span className="text-3xl font-mono font-extrabold text-cyan-300">
                Desde US${calculateTotal()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Paso 1: Base */}
            <div className="lg:col-span-6 space-y-4">
              <span className="block text-xs font-mono uppercase text-slate-400">
                Paso 1: Selecciona la Arquitectura Base
              </span>
              <div className="space-y-2.5">
                {Object.entries(basePlans).map(([key, plan]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedBase(key as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedBase === key
                        ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-sm'
                        : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-200">{plan.name}</span>
                      <span className="font-mono text-xs text-cyan-400 font-bold">
                        US${plan.basePrice}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{plan.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Paso 2: Módulos Add-on */}
            <div className="lg:col-span-6 space-y-4">
              <span className="block text-xs font-mono uppercase text-slate-400">
                Paso 2: Sumar Módulos Técnicos Opcionales
              </span>
              <div className="space-y-2.5">
                {addonModules.map((addon) => {
                  const isActive = activeAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-violet-400/60 bg-violet-950/30 text-white'
                          : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                            isActive
                              ? 'bg-violet-500 border-violet-400 text-white'
                              : 'border-white/20 bg-black/40'
                          }`}
                        >
                          {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-semibold text-slate-200">{addon.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">{addon.code}</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{addon.description}</p>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-violet-300 font-bold ml-2 shrink-0">
                        +US${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Blueprint Footer / CTA */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>El valor final dependerá del alcance formal acordado.</span>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2"
            >
              <span>Solicitar presupuesto con esta configuración</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

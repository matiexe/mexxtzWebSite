import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  service_type: string;
  project_details: string;
  budget_range: string;
  urgency: string;
}

export default function LeadQualificationForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    whatsapp: '',
    service_type: 'Landing page',
    project_details: '',
    budget_range: 'US$250–500',
    urgency: '1–2 semanas',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | null>(null);

  const services = [
    'Landing page',
    'Sitio web',
    'Sistema web',
    'Automatización',
    'Inteligencia artificial',
    'Mantenimiento',
    'Otro',
  ];

  const budgets = [
    'Menos de US$100',
    'US$100–250',
    'US$250–500',
    'US$500–1000',
    'Más de US$1000',
    'No estoy seguro',
  ];

  const urgencies = [
    'Lo antes posible',
    '1–2 semanas',
    'Este mes',
    'Sin urgencia',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || 'Error al enviar el formulario');
        }
      } else {
        setSubmitted(true);
        setCreatedLeadId(data.leadId);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLeadLink = () => {
    const text = encodeURIComponent(
      `Hola mexxtz.dev! Acabo de enviar una solicitud de presupuesto (ID: ${createdLeadId || 'WEB'}). Mi proyecto es sobre: ${formData.service_type}.`
    );
    return `https://wa.me/${SITE_CONFIG.social.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  if (submitted) {
    return (
      <div className="relative p-8 rounded-2xl border border-cyan-500/30 bg-[#090e1c] text-center shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">¡Solicitud recibida con éxito!</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          Guardamos tus datos y requerimientos. Analizaremos el alcance técnico y te responderemos en menos de 24 horas hábiles.
        </p>

        {createdLeadId && (
          <div className="inline-block px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-slate-400 mb-6">
            ID de Referencia: <span className="text-cyan-400 font-bold">{createdLeadId}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppLeadLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-950/40"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Avisar por WhatsApp (Opcional)
          </a>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                whatsapp: '',
                service_type: 'Landing page',
                project_details: '',
                budget_range: 'US$250–500',
                urgency: '1–2 semanas',
              });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-colors font-mono"
          >
            Nueva Consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-[#090e1c]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Blueprint header markers */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs text-slate-400">
        <span className="flex items-center text-cyan-400">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          CALIFICADOR DE ALCANCE Y PRESUPUESTO
        </span>
        <span className="text-slate-500">FORM_V1.2</span>
      </div>

      <div className="space-y-6">
        {/* 1. Selección de servicio */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
            1. ¿Qué tipo de solución necesitás?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {services.map((srv) => (
              <button
                type="button"
                key={srv}
                onClick={() => setFormData({ ...formData, service_type: srv })}
                className={`px-3 py-2 text-xs rounded-lg border transition-all text-left font-medium ${
                  formData.service_type === srv
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-950'
                    : 'border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                {srv}
              </button>
            ))}
          </div>
          {errors.service_type && (
            <p className="mt-1 text-xs text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.service_type[0]}
            </p>
          )}
        </div>

        {/* 2. Detalle del proyecto */}
        <div>
          <label htmlFor="project_details" className="block text-xs font-mono uppercase text-slate-300 mb-2">
            2. Contanos sobre tu proyecto o problema a resolver
          </label>
          <textarea
            id="project_details"
            rows={3}
            value={formData.project_details}
            onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
            placeholder="Ej: Necesitamos automatizar los pedidos que llegan por WhatsApp y guardarlos en una base de datos con panel de control..."
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
          {errors.project_details && (
            <p className="mt-1 text-xs text-red-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.project_details[0]}
            </p>
          )}
        </div>

        {/* 3. Presupuesto estimado & Urgencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              3. Presupuesto aproximado
            </label>
            <select
              value={formData.budget_range}
              onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 font-mono"
            >
              {budgets.map((b) => (
                <option key={b} value={b} className="bg-slate-900 text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              4. ¿Cuándo necesitás tenerlo?
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 font-mono"
            >
              {urgencies.map((u) => (
                <option key={u} value={u} className="bg-slate-900 text-white">
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Datos de contacto */}
        <div className="pt-2 border-t border-white/10">
          <label className="block text-xs font-mono uppercase text-slate-300 mb-3">
            5. Datos para enviarte la propuesta
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                placeholder="Tu Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-400">{errors.name[0]}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email de contacto"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-400">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="WhatsApp (con cód. país)"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {errors.whatsapp && (
                <p className="mt-1 text-[11px] text-red-400">{errors.whatsapp[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="font-mono text-xs">Procesando y guardando lead...</span>
            ) : (
              <>
                <span>Solicitar presupuesto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sin spam. Presupuesto sin compromiso ni costos ocultos.</span>
        </div>
      </div>
    </form>
  );
}

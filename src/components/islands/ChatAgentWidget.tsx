import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, ExternalLink, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

export default function ChatAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Hola 👋 Soy el asistente de mexxtz.dev. Puedo ayudarte a encontrar la solución tecnológica que necesitás para tu negocio.',
      time: 'Ahora',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickOptions = [
    { label: 'Quiero una web', key: 'quiero-web' },
    { label: 'Quiero automatizar un proceso', key: 'quiero-automatizar' },
    { label: 'Quiero implementar IA', key: 'quiero-ia' },
    { label: 'Necesito arreglar una web', key: 'arreglar-web' },
    { label: 'Quiero hablar con alguien', key: 'hablar-humano' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string, optionKey?: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, optionKey }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Entendido. Si querés un presupuesto detallado, podés completar el formulario en la web o escribirme por WhatsApp.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Hubo una breve interrupción de red. Podés escribirme directamente por WhatsApp para coordinar.',
          time: 'Ahora',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hola mexxtz.dev! Estaba navegando en tu web y me gustaría hacerte una consulta.');
    window.open(`https://wa.me/${SITE_CONFIG.social.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-[#0a0f1d] hover:bg-[#10172c] text-white border border-cyan-500/30 shadow-xl shadow-cyan-950/40 transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <span className="text-xs font-mono font-medium text-slate-200">
            ¿Tenés una consulta?
          </span>

          <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-2xl border border-white/10 bg-[#090d18] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-white/10 bg-[#060911] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#060911]" />
              </div>

              <div>
                <div className="text-xs font-semibold text-white flex items-center">
                  <span>Asistente mexxtz.dev</span>
                  <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    AI AGENT
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Online · Respuesta inmediata
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-xs'
                      : 'bg-white/[0.04] text-slate-200 border border-white/5 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block mt-1 text-[9px] opacity-60 text-right font-mono">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-mono pl-7">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[10px]">Analizando requerimiento...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Pills */}
          <div className="px-3 py-2 border-t border-white/5 bg-[#060911]/60">
            <div className="text-[10px] font-mono text-slate-500 mb-1.5">Opciones rápidas:</div>
            <div className="flex flex-wrap gap-1.5">
              {quickOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => sendMessage(opt.label, opt.key)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all text-left"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Direct Option */}
          <div className="px-3 py-1.5 bg-emerald-950/20 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-300 flex items-center">
              ¿Preferís hablar con una persona?
            </span>
            <button
              onClick={openWhatsApp}
              className="text-[10px] font-mono font-bold text-emerald-400 hover:underline flex items-center"
            >
              WhatsApp <ExternalLink className="w-2.5 h-2.5 ml-1" />
            </button>
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputValue);
            }}
            className="p-3 border-t border-white/10 bg-[#070b14] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-colors disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../config/site';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 font-sans">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-cyan-500/40 bg-[var(--bg-surface-elevated)] shadow-sm'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-cyan-500/30'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between text-[var(--text-primary)] hover:text-cyan-500 transition-colors"
            >
              <span className="flex items-center space-x-3 text-sm sm:text-base font-medium">
                <span className="text-cyan-500 font-mono text-xs font-semibold">
                  0{index + 1}
                </span>
                <span>{item.question}</span>
              </span>

              <ChevronDown
                className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-cyan-500' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-4 pt-1 text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed border-t border-[var(--border-subtle)]">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

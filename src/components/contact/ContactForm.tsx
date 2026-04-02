'use client';

import { useState } from 'react';

const SUBJECTS = [
  { value: 'noticia', label: '📰 Sugestão de Notícia' },
  { value: 'critica', label: '📋 Crítica ou Sugestão' },
  { value: 'problema', label: '⚠️ Reportar um Problema' },
  { value: 'publicidade', label: '📢 Oportunidades de Negócio' },
  { value: 'outro', label: '💬 Outro Assunto' },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    } else if (formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Digite seu nome completo';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$|^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido. Use (XX) 9XXXX-XXXX';
    }

    if (!formData.subject) {
      newErrors.subject = 'Selecione um assunto';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    if (!formData.terms) {
      newErrors.terms = 'Aceite os termos para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return cleaned.slice(0, 11);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular envio - em produção, isso enviaria para sua API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
        terms: false,
      });
      
      // Limpar mensagem depois de 5 segundos
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-green-live/15 border border-green-live/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-headline font-semibold text-green-live">Mensagem enviada com sucesso!</p>
            <p className="font-body text-sm text-text-secondary">Entraremos em contato em breve.</p>
          </div>
        </div>
      )}

      {/* Nome Completo */}
      <div>
        <label htmlFor="name" className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
          Nome Completo <span className="text-red-news">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          required
          className={`w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none transition-all ${
            errors.name
              ? 'border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25'
              : 'border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25'
          }`}
        />
        {errors.name && (
          <p className="font-body text-xs text-red-news mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
          Email <span className="text-red-news">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
          className={`w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none transition-all ${
            errors.email
              ? 'border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25'
              : 'border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25'
          }`}
        />
        {errors.email && (
          <p className="font-body text-xs text-red-news mt-1">{errors.email}</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
          Telefone <span className="text-red-news">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              phone: formatPhone(e.target.value),
            }));
            if (errors.phone) {
              setErrors((prev) => ({ ...prev, phone: '' }));
            }
          }}
          placeholder="(XX) 9XXXX-XXXX"
          required
          className={`w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none transition-all ${
            errors.phone
              ? 'border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25'
              : 'border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25'
          }`}
        />
        {errors.phone && (
          <p className="font-body text-xs text-red-news mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Assunto */}
      <div>
        <label htmlFor="subject" className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
          Assunto <span className="text-red-news">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary outline-none transition-all appearance-none cursor-pointer ${
            errors.subject
              ? 'border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25'
              : 'border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300C8E8' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: '36px',
          }}
        >
          <option value="">Selecione um assunto...</option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="font-body text-xs text-red-news mt-1">{errors.subject}</p>
        )}
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="message" className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
          Mensagem <span className="text-red-news">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Conte-nos mais detalhes..."
          rows={6}
          required
          className={`w-full px-4 py-3 bg-surface border rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none transition-all resize-none ${
            errors.message
              ? 'border-red-news/50 focus:border-red-news focus:ring-1 focus:ring-red-news/25'
              : 'border-white/5 focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25'
          }`}
        />
        {errors.message && (
          <p className="font-body text-xs text-red-news mt-1">{errors.message}</p>
        )}
      </div>

      {/* Checkbox Termos */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
          className={`mt-1 w-4 h-4 cursor-pointer accent-cyan`}
        />
        <label htmlFor="terms" className="font-body text-text-secondary text-sm cursor-pointer leading-relaxed">
          Concordo que meus dados sejam utilizados para responder ao meu contato. Li e aceito a{' '}
          <a href="/politica-editorial" className="text-cyan hover:underline">
            política editorial
          </a>{' '}
          e a política de privacidade.{' '}
          <span className="text-red-news">*</span>
        </label>
      </div>
      {errors.terms && (
        <p className="font-body text-xs text-red-news">{errors.terms}</p>
      )}

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-cyan text-base font-mono font-semibold text-black rounded-lg hover:bg-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="inline-block animate-spin">⟳</span>
            Enviando...
          </>
        ) : (
          <>
            Solicitar Contato
            <span>→</span>
          </>
        )}
      </button>

      <p className="font-body text-xs text-text-muted text-center">
        A resposta geralmente chega em até 24 horas úteis.
      </p>
    </form>
  );
}

"use client";
import { useContactForm } from "@/hooks/useContactForm";
import { FormField, inputClass } from "@/components/ui/FormField";

const SUBJECTS = [
  { value: "noticia", label: "📰 Sugestão de Notícia" },
  { value: "critica", label: "📋 Crítica ou Sugestão" },
  { value: "problema", label: "⚠️ Reportar um Problema" },
  { value: "publicidade", label: "📢 Oportunidades de Negócio" },
  { value: "outro", label: "💬 Outro Assunto" },
];

export function ContactForm() {
  const { formData, errors, submitted, isLoading, handleChange, handleSubmit } = useContactForm();

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

      <FormField id="name" label="Nome Completo" error={errors.name} required>
        <input
          type="text" id="name" name="name"
          value={formData.name} onChange={handleChange}
          placeholder="Seu nome completo"
          className={inputClass(!!errors.name)}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email} required>
        <input
          type="email" id="email" name="email"
          value={formData.email} onChange={handleChange}
          placeholder="seu@email.com"
          className={inputClass(!!errors.email)}
        />
      </FormField>

      <FormField id="phone" label="Telefone" error={errors.phone} required>
        <input
          type="tel" id="phone" name="phone"
          value={formData.phone} onChange={handleChange}
          placeholder="(XX) 9XXXX-XXXX"
          className={inputClass(!!errors.phone)}
        />
      </FormField>

      <FormField id="subject" label="Assunto" error={errors.subject} required>
        <select
          id="subject" name="subject"
          value={formData.subject} onChange={handleChange}
          className={`${inputClass(!!errors.subject)} appearance-none cursor-pointer`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2300C8E8' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "36px",
          }}
        >
          <option value="">Selecione um assunto...</option>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </FormField>

      <FormField id="message" label="Mensagem" error={errors.message} required>
        <textarea
          id="message" name="message"
          value={formData.message} onChange={handleChange}
          placeholder="Conte-nos mais detalhes..."
          rows={6}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
      </FormField>

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox" id="terms" name="terms"
            checked={formData.terms} onChange={handleChange}
            className="mt-1 w-4 h-4 cursor-pointer accent-cyan"
          />
          <label htmlFor="terms" className="font-body text-text-secondary text-sm cursor-pointer leading-relaxed">
            Concordo que meus dados sejam utilizados para responder ao meu contato. Li e aceito a{" "}
            <a href="/politica-editorial" className="text-cyan hover:underline">política editorial</a>{" "}
            e a política de privacidade. <span className="text-red-news">*</span>
          </label>
        </div>
        {errors.terms && <p className="font-body text-xs text-red-news mt-1">{errors.terms}</p>}
      </div>

      <button
        type="submit" disabled={isLoading}
        className="w-full px-6 py-3 bg-cyan text-base font-mono font-semibold text-black rounded-lg hover:bg-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <><span className="inline-block animate-spin">⟳</span> Enviando...</>
        ) : (
          <>Solicitar Contato <span>→</span></>
        )}
      </button>

      <p className="font-body text-xs text-text-muted text-center">
        A resposta geralmente chega em até 24 horas úteis.
      </p>
    </form>
  );
}

"use client";
import { useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  terms: boolean;
}

const INITIAL: FormData = { name: "", phone: "", email: "", subject: "", message: "", terms: false };

function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 11) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  return cleaned.slice(0, 11);
}

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) errors.name = "Nome completo é obrigatório";
  else if (data.name.trim().split(" ").length < 2) errors.name = "Digite seu nome completo";

  if (!data.email.trim()) errors.email = "Email é obrigatório";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Email inválido";

  if (!data.phone.trim()) errors.phone = "Telefone é obrigatório";
  else if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido. Use (XX) 9XXXX-XXXX";

  if (!data.subject) errors.subject = "Selecione um assunto";

  if (!data.message.trim()) errors.message = "Mensagem é obrigatória";
  else if (data.message.trim().length < 10) errors.message = "Mensagem deve ter pelo menos 10 caracteres";

  if (!data.terms) errors.terms = "Aceite os termos para continuar";

  return errors;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData(INITIAL);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return { formData, errors, submitted, isLoading, handleChange, handleSubmit };
}

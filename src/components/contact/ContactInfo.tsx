export function ContactInfo() {
  const contactData = [
    {
      icon: "📧",
      title: "Email Geral",
      value: "contato@saoluisemfoco.com.br",
      description: "Para dúvidas gerais e sugestões",
      href: "mailto:contato@saoluisemfoco.com.br",
    },
    {
      icon: "📋",
      title: "Editorial",
      value: "editorial@saoluisemfoco.com.br",
      description: "Envie sugestões de notícias",
      href: "mailto:editorial@saoluisemfoco.com.br",
    },
    {
      icon: "📢",
      title: "Publicidade",
      value: "(98) 3218-9000",
      description: "Fale com nosso time comercial",
      href: "tel:+559832189000",
    },
    {
      icon: "📱",
      title: "Whatsapp",
      value: "(98) 98888-5000",
      description: "Contato rápido via Whatsapp",
      href: "https://wa.me/5598988885000",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {contactData.map((contact) => (
          <a
            key={contact.title}
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={
              contact.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="bg-surface border border-white/5 rounded-xl p-6 hover:border-cyan/30 transition-all group cursor-pointer"
          >
            <div className="text-4xl mb-4">{contact.icon}</div>
            <h3 className="font-headline font-bold text-text-primary text-lg mb-1">
              {contact.title}
            </h3>
            <p className="font-mono text-cyan text-sm font-semibold mb-2">
              {contact.value}
            </p>
            <p className="font-body text-text-secondary text-sm">
              {contact.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs">Clique para abrir</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Horário de Funcionamento */}
      <div className="bg-gradient-to-r from-cyan/10 to-cyan/5 border border-cyan/20 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-headline font-bold text-text-primary text-lg mb-4">
              <span className="text-cyan">Horário de</span> Atendimento
            </h3>
            <div className="space-y-3 font-body text-text-secondary">
              <div className="flex justify-between">
                <span>Segunda a Sexta</span>
                <span className="text-text-primary">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado</span>
                <span className="text-text-primary">10:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo e Feriados</span>
                <span className="text-text-primary">Fechado</span>
              </div>
              <p className="pt-4 text-xs italic">
                📌 Você pode enviar mensagens a qualquer hora. Responderemos em
                até 24 horas úteis.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold text-text-primary text-lg mb-4">
              <span className="text-cyan">Siga-nos</span> nas Redes
            </h3>
            <div className="flex gap-4 flex-wrap">
              {[
                { name: "Instagram", href: "#", icon: "📷" },
                { name: "Facebook", href: "#", icon: "👤" },
                { name: "Twitter", href: "#", icon: "𝕏" },
                { name: "LinkedIn", href: "#", icon: "💼" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="px-4 py-2 bg-elevated border border-white/5 rounded-lg hover:border-cyan/30 transition-all flex items-center gap-2 group"
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="font-body text-sm text-text-secondary group-hover:text-cyan transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

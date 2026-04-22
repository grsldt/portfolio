import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    cmd: 'cat dev.service',
    title: 'Développement & SaaS',
    items: [
      "Création d'applications web",
      "Développement SaaS",
      "API / backend sur mesure",
    ],
    accent: false,
    badge: null,
  },
  {
    cmd: 'cat ai.service',
    title: 'Automatisation & IA',
    items: [
      "Chatbots IA personnalisés",
      "Automatisation de tâches répétitives",
      "Intégration IA (OpenAI, etc.)",
    ],
    accent: true,
    badge: '★ PRIORITÉ',
  },
  {
    cmd: 'cat security.service',
    title: 'Cybersécurité & Réseaux',
    items: [
      "Audit basique de sécurité",
      "Sécurisation de sites web",
      "Configuration serveurs / déploiement",
      "Monitoring simple",
    ],
    accent: false,
    badge: 'TARIFS ADAPTÉS',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-4">
            <span className="text-primary/50">$</span> ls /etc/speed/services/
          </div>
          <p className="text-foreground/30 text-xs">total 3 — drwxr-xr-x</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="terminal-block flex flex-col"
            >
              <div className="terminal-header">
                <span className={`size-1.5 ${service.accent ? 'bg-accent' : 'bg-primary'} animate-pulse`} />
                <span>{service.cmd}</span>
                {service.badge && (
                  <span className={`ml-auto text-[9px] ${service.accent ? 'text-accent' : 'text-primary/60'}`}>
                    [{service.badge}]
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-bold tracking-tight mb-4 normal-case text-foreground">
                  <span className="text-primary">#</span> {service.title}
                </h3>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-foreground/50 normal-case">
                      <span className="text-primary mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="flex items-center gap-2 text-[10px] text-primary/60 hover:text-primary transition-colors tracking-wider mt-auto"
                >
                  <span className="text-primary">$</span> more --info <ArrowRight size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

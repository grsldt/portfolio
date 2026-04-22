import { motion } from 'framer-motion';
import { Code, Bot, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Développement & SaaS',
    description: "Applications web performantes et plateformes SaaS clé en main.",
    items: [
      "Création d'applications web",
      "Développement SaaS",
      "API / backend sur mesure",
    ],
    accent: false,
    badge: null,
  },
  {
    icon: Bot,
    title: 'Automatisation & IA',
    description: "Gagnez du temps et augmentez vos revenus grâce à l'intelligence artificielle.",
    items: [
      "Chatbots IA personnalisés",
      "Automatisation de tâches répétitives",
      "Intégration IA (OpenAI, etc.)",
    ],
    accent: true,
    badge: 'PRIORITÉ',
  },
  {
    icon: Shield,
    title: 'Cybersécurité & Réseaux',
    description: "Renforcez et maintenez vos infrastructures en toute sérénité.",
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
          className="mb-16 text-center"
        >
          <div className="text-primary text-xs tracking-widest flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            CE QUE JE PROPOSE
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight normal-case">
            Mes <span className="text-accent">services</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`relative bg-card border ${service.accent ? 'border-accent/30' : 'border-primary/10'} hover:border-primary/30 transition-all duration-300 flex flex-col`}
              >
                {service.badge && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] tracking-widest border-b border-l ${
                    service.accent ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-primary/10 border-primary/20 text-primary'
                  }`}>
                    {service.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className={`p-3 border ${service.accent ? 'border-accent/30 text-accent' : 'border-primary/30 text-primary'} w-fit mb-5`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="font-heading text-lg font-bold tracking-tight mb-2 normal-case">{service.title}</h3>
                  <p className="text-sm text-foreground/50 normal-case mb-5 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/70 normal-case">
                        <span className="text-primary mt-1 text-xs">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="flex items-center gap-2 text-xs text-primary hover:text-accent transition-colors tracking-wider mt-auto"
                  >
                    EN SAVOIR PLUS <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

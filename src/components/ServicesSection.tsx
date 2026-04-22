import { motion } from 'framer-motion';
import { Code, Bot, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Code,
    file: 'saas_suite.conf',
    title: 'Développement & SaaS',
    description: "Applications web et plateformes SaaS prêtes à l'emploi.",
    items: [
      'Applications web sur mesure',
      'Développement de plateformes SaaS',
      'API & backend',
    ],
    result: 'Un produit fonctionnel, prêt à être utilisé par vos clients.',
    highlight: true,
    badge: 'RECOMMANDÉ',
  },
  {
    icon: Bot,
    file: 'automation_ai.conf',
    title: 'Automatisation & IA',
    description: "Gagnez du temps et augmentez vos revenus grâce à l'IA.",
    items: [
      'Chatbots IA personnalisés',
      'Automatisation de tâches répétitives',
      'Intégration IA (OpenAI, etc.)',
    ],
    result: 'Moins de travail manuel, gain de temps et augmentation des revenus.',
    highlight: true,
    badge: 'RECOMMANDÉ',
  },
  {
    icon: Shield,
    file: 'security_stack.conf',
    title: 'Sécurité & Infrastructure',
    description: 'Renforcez la sécurité de votre présence en ligne.',
    items: [
      'Sécurisation de base de sites web',
      'Déploiement serveur (VPS, cloud)',
      'Configuration & monitoring',
    ],
    result: 'Une infrastructure stable et sécurisée.',
    highlight: false,
    badge: 'MISSIONS SIMPLES',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
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
          className="mb-14 text-center"
        >
          <p className="terminal-prompt mb-4">&gt; SERVICES</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Des solutions concrètes pour <span className="text-gradient">votre business</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
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
                className="terminal-card hover:border-primary/40 transition-all duration-300 flex flex-col"
              >
                <div className="terminal-bar">
                  <span className={`terminal-dot ${service.highlight ? 'bg-primary' : 'bg-foreground/20'} animate-pulse`} />
                  <span>{service.file}</span>
                  <span className={`ml-auto ${service.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                    [{service.badge}]
                  </span>
                </div>

                <div className="relative z-10 p-6 flex flex-col flex-1">
                  <div className={`p-3 border ${service.highlight ? 'border-primary/30 text-primary glow-primary' : 'border-border text-muted-foreground'} w-fit mb-5 bg-secondary/35`}>
                    <Icon size={22} />
                  </div>

                  <div className="terminal-prompt mb-2">&gt; {service.title.toUpperCase()}</div>
                  <h3 className="font-heading text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/68">
                        <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-primary/12">
                    <div className="terminal-prompt mb-2">&gt; RÉSULTAT</div>
                    <p className="text-sm text-primary/85 font-medium mb-4">{service.result}</p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors"
                    >
                      ./en_savoir_plus <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

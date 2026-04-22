import { motion } from 'framer-motion';
import { Rocket, Server, Shield, Code, ArrowRight } from 'lucide-react';

const missions = [
  { icon: Code, text: "Landing page en 48h" },
  { icon: Rocket, text: "Automatisation d'une tâche répétitive" },
  { icon: Shield, text: "Audit sécurité basique de votre site" },
  { icon: Server, text: "Configuration serveur / déploiement" },
];

export default function QuickMissionsSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-accent/20 p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <div className="text-accent text-xs tracking-widest flex items-center justify-center gap-3 mb-4">
              <Rocket size={14} />
              MISSIONS RAPIDES
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight normal-case">
              Besoin ponctuel ?{' '}
              <span className="text-accent">Je suis dispo.</span>
            </h2>
            <p className="text-sm text-foreground/50 normal-case mt-3 max-w-[50ch] mx-auto leading-relaxed">
              Petites missions, projets urgents ou besoins ponctuels — tarifs adaptés et livraison rapide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {missions.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 border border-foreground/5 text-sm text-foreground/70 normal-case"
                >
                  <Icon size={16} className="text-accent shrink-0" />
                  {m.text}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-foreground font-bold text-sm tracking-wider normal-case group overflow-hidden relative"
            >
              <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative group-hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2">
                Me contacter pour une mission
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

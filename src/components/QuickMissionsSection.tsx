import { motion } from 'framer-motion';
import { Server, Shield, Bug, Wrench, ArrowRight } from 'lucide-react';

const missions = [
  { icon: Server, text: "Installation & configuration serveur" },
  { icon: Shield, text: "Sécurisation de site web" },
  { icon: Wrench, text: "Automatisation simple d'une tâche" },
  { icon: Bug, text: "Correction de bugs & maintenance" },
];

export default function QuickMissionsSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl bg-card border border-accent/20 p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6">
            ⚡ Disponible pour des missions ponctuelles
          </div>

          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Missions rapides disponibles
          </h2>
          <p className="text-muted-foreground text-sm max-w-[50ch] mx-auto mb-8 leading-relaxed">
            Besoin ponctuel, petit projet ou urgence ? Je suis disponible pour des missions courtes à tarifs adaptés.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left max-w-lg mx-auto">
            {missions.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground/70"
                >
                  <Icon size={16} className="text-accent shrink-0" />
                  {m.text}
                </motion.div>
              );
            })}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all shadow-lg shadow-accent/20 group"
          >
            Me contacter pour une mission
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

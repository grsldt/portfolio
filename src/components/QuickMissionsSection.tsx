import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const missions = [
  "Landing page en 48h",
  "Automatisation d'une tâche répétitive",
  "Audit sécurité basique de votre site",
  "Configuration serveur / déploiement",
];

export default function QuickMissionsSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-block"
        >
          <div className="terminal-header">
            <span className="size-1.5 bg-accent animate-pulse" />
            <span>quick-missions.sh</span>
            <span className="ml-auto text-accent text-[9px]">[AVAILABLE]</span>
          </div>
          
          <div className="p-6 md:p-8 space-y-5">
            <div className="text-xs space-y-1">
              <p className="text-foreground/30"><span className="text-primary">$</span> ./quick-missions.sh --list</p>
              <p className="text-foreground/40 normal-case">Petites missions, projets urgents — tarifs adaptés et livraison rapide.</p>
            </div>

            <div className="space-y-2">
              {missions.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs text-foreground/60 normal-case py-1.5 border-b border-primary/5 last:border-0"
                >
                  <span className="text-primary text-[10px]">[{String(i + 1).padStart(2, '0')}]</span>
                  {m}
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-foreground font-bold text-xs tracking-wider normal-case group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative group-hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2">
                  ./contact --quick-mission
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

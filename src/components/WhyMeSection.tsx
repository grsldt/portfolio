import { motion } from 'framer-motion';
import { Zap, Target, Clock, MessageSquare, Star, ArrowRight } from 'lucide-react';

const reasons = [
  { icon: Zap, title: 'Développement rapide', text: 'Des solutions livrées en quelques jours, pas en mois.' },
  { icon: Target, title: 'Orienté résultats', text: 'Chaque projet est pensé pour générer un retour concret.' },
  { icon: Clock, title: 'Disponible & réactif', text: 'Réponse sous 24h, communication directe.' },
  { icon: MessageSquare, title: 'Flexible', text: 'Petites missions comme grands projets.' },
];

const testimonials = [
  {
    quote: 'Grégory a développé notre bot en 2 semaines. Le ROI a été immédiat — on économise 3h par jour.',
    author: 'Thomas R.',
    role: 'E-commerçant',
  },
  {
    quote: 'Solution IA propre et efficace. Communication au top, je recommande sans hésiter.',
    author: 'Sarah M.',
    role: 'CEO, startup SaaS',
  },
];

export default function WhyMeSection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="terminal-prompt mb-4">&gt; WHY_ME</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Ce qui fait la différence
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="terminal-card p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="relative z-10">
                  <div className="mx-auto p-3 border border-primary/22 text-primary w-fit mb-4 bg-secondary/35">
                    <Icon size={20} />
                  </div>
                  <div className="terminal-prompt mb-2">&gt; {r.title.toUpperCase()}</div>
                  <h3 className="font-heading font-bold text-base mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mb-6">
          <p className="terminal-prompt">&gt; TÉMOIGNAGES</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="terminal-card"
            >
              <div className="terminal-bar">
                <span className="terminal-dot bg-accent" />
                <span>review_{i + 1}.log</span>
                <span className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={8} className="text-accent fill-accent" />
                  ))}
                </span>
              </div>
              <div className="relative z-10 p-6">
                <p className="text-sm text-foreground/65 leading-relaxed italic mb-4">"{t.quote}"</p>
                <div className="border-t border-primary/12 pt-3">
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground font-mono tracking-[0.14em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-[0.16em] transition-all glow-primary group"
          >
            ./discuter_projet
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

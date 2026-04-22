import { motion } from 'framer-motion';
import { Zap, Clock, MessageSquare, Target, Star } from 'lucide-react';

const reasons = [
  { icon: Zap, title: "Réactivité", text: "Réponse sous 24h, livraison rapide." },
  { icon: Target, title: "Sur mesure", text: "Chaque solution est adaptée à votre besoin exact." },
  { icon: Clock, title: "Disponibilité", text: "Communication directe, pas d'intermédiaire." },
  { icon: MessageSquare, title: "Accompagnement", text: "Suivi après livraison et support inclus." },
];

const testimonials = [
  {
    quote: "Grégory a développé notre bot en 2 semaines. Le ROI a été immédiat — on économise 3h par jour.",
    author: "Thomas R.",
    role: "E-commerçant",
  },
  {
    quote: "Solution IA propre et efficace. Communication au top, je recommande sans hésiter.",
    author: "Sarah M.",
    role: "CEO, startup SaaS",
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
          className="mb-16 text-center"
        >
          <div className="text-primary text-xs tracking-widest flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            POURQUOI MOI
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight normal-case">
            Ce qui fait la <span className="text-accent">différence</span>
          </h2>
        </motion.div>

        {/* Reasons */}
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
                className="bg-card border border-primary/10 p-5 text-center"
              >
                <div className="mx-auto p-3 border border-primary/20 text-primary w-fit mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-sm tracking-tight mb-2 normal-case">{r.title}</h3>
                <p className="text-xs text-foreground/50 normal-case leading-relaxed">{r.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-primary/10 p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground/70 normal-case leading-relaxed italic mb-4">"{t.quote}"</p>
              <div className="border-t border-primary/10 pt-3">
                <p className="text-sm font-bold normal-case">{t.author}</p>
                <p className="text-[10px] text-foreground/40 tracking-widest">{t.role.toUpperCase()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Zap, Target, Clock, MessageSquare, Star } from 'lucide-react';

const reasons = [
  { icon: Zap, title: "Développement rapide", text: "Des solutions livrées en quelques jours, pas en mois." },
  { icon: Target, title: "Orienté résultats", text: "Chaque projet est pensé pour générer un retour concret." },
  { icon: Clock, title: "Disponible & réactif", text: "Réponse sous 24h, communication directe sans intermédiaire." },
  { icon: MessageSquare, title: "Flexible", text: "Petites missions comme grands projets, je m'adapte à vos besoins." },
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
          className="mb-14 text-center"
        >
          <p className="text-primary text-sm font-medium mb-3">Pourquoi me choisir</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Ce qui fait la différence
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
                className="rounded-xl bg-card border border-border p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="mx-auto p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-heading font-bold text-base mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl bg-card border border-border p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed italic mb-4">"{t.quote}"</p>
              <div className="border-t border-border pt-3">
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg shadow-primary/20 group"
          >
            Discuter de mon projet
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

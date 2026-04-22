import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reasons = [
  { key: 'reactivity', val: 'true', desc: "Réponse sous 24h, livraison rapide." },
  { key: 'custom', val: 'true', desc: "Chaque solution adaptée à votre besoin." },
  { key: 'direct_contact', val: 'true', desc: "Communication directe, pas d'intermédiaire." },
  { key: 'support', val: 'true', desc: "Suivi après livraison et support inclus." },
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
          className="mb-12"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-4">
            <span className="text-primary/50">$</span> cat /etc/speed/why.conf
          </div>
        </motion.div>

        {/* Reasons as config file */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-block mb-8"
        >
          <div className="terminal-header">
            <span className="size-1.5 bg-primary animate-pulse" />
            <span>why.conf</span>
            <span className="ml-auto text-foreground/20">read-only</span>
          </div>
          <div className="p-5 space-y-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs"
              >
                <span className="text-foreground/30 w-4 shrink-0">{i + 1}</span>
                <span className="shrink-0">
                  <span className="text-primary">{r.key}</span>
                  <span className="text-foreground/30">=</span>
                  <span className="text-accent">{r.val}</span>
                </span>
                <span className="text-foreground/30 normal-case">
                  # {r.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-4">
          <span className="text-primary/50">$</span> cat /var/log/reviews.log
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="terminal-block"
            >
              <div className="terminal-header">
                <span className="size-1.5 bg-accent" />
                <span>review_{i + 1}.log</span>
                <span className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={8} className="text-accent fill-accent" />
                  ))}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-foreground/60 normal-case leading-relaxed italic mb-4">"{t.quote}"</p>
                <div className="border-t border-primary/10 pt-3 text-[10px]">
                  <span className="text-foreground/70">{t.author}</span>
                  <span className="text-foreground/30 ml-2">// {t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

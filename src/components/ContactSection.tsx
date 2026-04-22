import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, Github, MapPin, Send } from 'lucide-react';
import { useRef } from 'react';
import MiniMelodyPlayer from './MiniMelodyPlayer';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section id="contact" className="py-24 px-6" ref={sectionRef}>
      <motion.div style={{ scale }} className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Parlons de votre <span className="text-gradient">projet</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Un besoin en développement, automatisation, cybersécurité ou IA ? Contactez-moi.
            Réponse sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6 space-y-5">
              <a href="mailto:gregsordel@icloud.com" className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors">gregsordel@icloud.com</p>
                </div>
              </a>

              <a href="tel:+33610643831" className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium group-hover:text-primary transition-colors">+33 6 10 64 38 31</p>
                </div>
              </a>

              <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-all">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium group-hover:text-primary transition-colors">github.com/grsldt</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localisation</p>
                  <p className="font-medium">Rennes, Vannes, Paris — France</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 flex flex-col justify-center items-center text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Send size={28} className="text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold">Prêt à démarrer ?</h3>
            <p className="text-muted-foreground">
              Décrivez-moi votre projet par email et recevez un devis gratuit sous 24h.
            </p>
            <a
              href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary"
            >
              <Mail size={18} />
              Envoyer un email
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

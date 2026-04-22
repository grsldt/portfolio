import { motion } from 'framer-motion';
import { Mail, Phone, Github, MapPin, Send, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="text-primary text-xs tracking-widest flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            PRÊT À DÉMARRER
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight normal-case">
            Discutons de votre{' '}
            <span className="text-accent">projet</span>
          </h2>
          <p className="text-sm text-foreground/50 normal-case mt-4 max-w-[50ch] mx-auto leading-relaxed">
            Décrivez-moi votre besoin par email et recevez un devis gratuit sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/10"
          >
            <div className="border-b border-primary/10 px-4 py-3">
              <span className="text-xs text-primary tracking-widest">MES COORDONNÉES</span>
            </div>
            <div className="p-5 space-y-4">
              <a href="mailto:gregsordel@icloud.com" className="flex items-center gap-4 group py-2 border-b border-foreground/5">
                <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail size={16} />
                </div>
                <div className="normal-case">
                  <p className="text-[10px] text-foreground/30 tracking-widest uppercase">EMAIL</p>
                  <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors">gregsordel@icloud.com</p>
                </div>
              </a>

              <a href="tel:+33610643831" className="flex items-center gap-4 group py-2 border-b border-foreground/5">
                <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone size={16} />
                </div>
                <div className="normal-case">
                  <p className="text-[10px] text-foreground/30 tracking-widest uppercase">TÉLÉPHONE</p>
                  <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors">+33 6 10 64 38 31</p>
                </div>
              </a>

              <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group py-2 border-b border-foreground/5">
                <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Github size={16} />
                </div>
                <div className="normal-case">
                  <p className="text-[10px] text-foreground/30 tracking-widest uppercase">GITHUB</p>
                  <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors">github.com/grsldt</p>
                </div>
              </a>

              <div className="flex items-center gap-4 py-2">
                <div className="p-2 border border-accent/20 text-accent">
                  <MapPin size={16} />
                </div>
                <div className="normal-case">
                  <p className="text-[10px] text-foreground/30 tracking-widest uppercase">LOCALISATION</p>
                  <p className="text-sm text-foreground/80">Rennes · Vannes · Paris</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/10 flex flex-col"
          >
            <div className="border-b border-primary/10 px-4 py-3">
              <span className="text-xs text-primary tracking-widest">DÉMARRER</span>
            </div>
            <div className="flex-1 p-5 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div className="absolute -inset-4 border border-accent/10" />
                <div className="absolute -inset-4 border border-primary/10 translate-x-1 translate-y-1" />
                <div className="p-4 border border-primary/20 bg-secondary">
                  <Send size={28} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-foreground/50 text-center normal-case max-w-[30ch] leading-relaxed">
                Décrivez votre projet et recevez une proposition détaillée sous 24h.
              </p>
              <a
                href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wider overflow-hidden normal-case"
              >
                <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                  <Mail size={16} />
                  Discuter de mon projet
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

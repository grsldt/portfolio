import { motion } from 'framer-motion';
import { Mail, Phone, Github, MapPin, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="terminal-prompt mb-4">&gt; CONTACT</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Discutons de votre projet
          </h2>
          <p className="text-muted-foreground mt-4 max-w-[50ch] mx-auto leading-relaxed">
            Décrivez-moi votre besoin et recevez un devis gratuit sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-card"
          >
            <div className="terminal-bar">
              <span className="terminal-dot bg-primary animate-pulse" />
              <span>contact.conf</span>
            </div>
            <div className="relative z-10 p-5 space-y-3">
              {[
                { icon: Mail, label: 'EMAIL', value: 'gregsordel@icloud.com', href: 'mailto:gregsordel@icloud.com' },
                { icon: Phone, label: 'TÉLÉPHONE', value: '+33 6 10 64 38 31', href: 'tel:+33610643831' },
                { icon: Github, label: 'GITHUB', value: 'github.com/grsldt', href: 'https://github.com/grsldt', external: true },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group p-3 hover:bg-secondary/40 transition-colors border border-transparent hover:border-primary/10">
                    <div className="p-2 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-secondary/35">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-[0.18em]">{item.label}</p>
                      <p className="text-sm text-foreground/75 group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}
              <div className="flex items-center gap-4 p-3 border border-transparent">
                <div className="p-2 border border-accent/20 text-accent bg-secondary/35">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-mono tracking-[0.18em]">LOCALISATION</p>
                  <p className="text-sm text-foreground/75">Rennes · Vannes · Paris</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-card border-primary/20"
          >
            <div className="terminal-bar">
              <span className="terminal-dot bg-primary animate-pulse" />
              <span>start_project.exe</span>
            </div>
            <div className="relative z-10 p-8 text-center flex flex-col items-center justify-center min-h-full">
              <div className="p-4 border border-primary/20 mb-6 bg-secondary/35 glow-primary">
                <Mail size={28} className="text-primary" />
              </div>
              <p className="terminal-prompt mb-3">&gt; DEMANDE DE DEVIS</p>
              <h3 className="font-heading text-xl font-bold mb-2">Envoyez-moi un message</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-[30ch] leading-relaxed">
                Décrivez votre projet et recevez une proposition détaillée sous 24h.
              </p>
              <a
                href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-[0.16em] transition-all glow-primary group"
              >
                ./discuter_projet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

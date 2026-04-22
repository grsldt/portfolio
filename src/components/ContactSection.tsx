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
          <p className="text-primary text-xs font-mono tracking-widest mb-4">// CONTACT</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Discutons de votre projet
          </h2>
          <p className="text-muted-foreground mt-4 max-w-[50ch] mx-auto leading-relaxed">
            Décrivez-moi votre besoin et recevez un devis gratuit sous 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-card"
          >
            <div className="p-6 space-y-3">
              {[
                { icon: Mail, label: 'Email', value: 'gregsordel@icloud.com', href: 'mailto:gregsordel@icloud.com' },
                { icon: Phone, label: 'Téléphone', value: '+33 6 10 64 38 31', href: 'tel:+33610643831' },
                { icon: Github, label: 'GitHub', value: 'github.com/grsldt', href: 'https://github.com/grsldt', external: true },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group p-3 hover:bg-secondary/50 transition-colors">
                    <div className="p-2.5 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-mono tracking-widest">{item.label.toUpperCase()}</p>
                      <p className="text-sm text-foreground/75 group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}
              <div className="flex items-center gap-4 p-3">
                <div className="p-2.5 border border-accent/20 text-accent">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-mono tracking-widest">LOCALISATION</p>
                  <p className="text-sm text-foreground/75">Rennes · Vannes · Paris</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-card border-primary/20 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="p-4 border border-primary/20 mb-6">
              <Mail size={28} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Envoyez-moi un message</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[30ch] leading-relaxed">
              Décrivez votre projet et recevez une proposition détaillée sous 24h.
            </p>
            <a
              href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wide transition-all glow-primary group"
            >
              Discuter de mon projet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

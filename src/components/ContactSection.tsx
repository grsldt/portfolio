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
          <p className="text-primary text-sm font-medium mb-3">Prêt à démarrer ?</p>
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
            className="rounded-xl bg-card border border-border"
          >
            <div className="p-6 space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'gregsordel@icloud.com', href: 'mailto:gregsordel@icloud.com' },
                { icon: Phone, label: 'Téléphone', value: '+33 6 10 64 38 31', href: 'tel:+33610643831' },
                { icon: Github, label: 'GitHub', value: 'github.com/grsldt', href: 'https://github.com/grsldt' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target={item.label === 'GitHub' ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 group p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}
              <div className="flex items-center gap-4 p-3">
                <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Localisation</p>
                  <p className="text-sm text-foreground/80">Rennes · Vannes · Paris</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl bg-card border border-primary/20 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="p-4 rounded-xl bg-primary/10 mb-6">
              <Mail size={32} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Envoyez-moi un message</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[30ch] leading-relaxed">
              Décrivez votre projet et recevez une proposition détaillée sous 24h.
            </p>
            <a
              href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg shadow-primary/20 group"
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

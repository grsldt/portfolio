import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-4">
            <span className="text-primary/50">$</span> ssh contact@speed-services
          </div>
          <p className="text-foreground/30 text-xs normal-case">Connection established. Awaiting input...</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-block"
          >
            <div className="terminal-header">
              <span className="size-1.5 bg-primary animate-pulse" />
              <span>contact.conf</span>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="space-y-1.5">
                <p>
                  <span className="text-foreground/30">1</span>
                  <span className="text-primary ml-3">email</span>
                  <span className="text-foreground/30">=</span>
                  <a href="mailto:gregsordel@icloud.com" className="text-foreground/70 hover:text-primary transition-colors normal-case">"gregsordel@icloud.com"</a>
                </p>
                <p>
                  <span className="text-foreground/30">2</span>
                  <span className="text-primary ml-3">phone</span>
                  <span className="text-foreground/30">=</span>
                  <a href="tel:+33610643831" className="text-foreground/70 hover:text-primary transition-colors normal-case">"+33 6 10 64 38 31"</a>
                </p>
                <p>
                  <span className="text-foreground/30">3</span>
                  <span className="text-primary ml-3">github</span>
                  <span className="text-foreground/30">=</span>
                  <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors normal-case">"github.com/grsldt"</a>
                </p>
                <p>
                  <span className="text-foreground/30">4</span>
                  <span className="text-primary ml-3">location</span>
                  <span className="text-foreground/30">=</span>
                  <span className="text-foreground/70 normal-case">"Rennes · Vannes · Paris"</span>
                </p>
                <p>
                  <span className="text-foreground/30">5</span>
                  <span className="text-primary ml-3">response_time</span>
                  <span className="text-foreground/30">=</span>
                  <span className="text-accent normal-case">"&lt;24h"</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="terminal-block flex flex-col"
          >
            <div className="terminal-header">
              <span className="size-1.5 bg-accent animate-pulse" />
              <span>start-project.sh</span>
            </div>
            <div className="flex-1 p-5 flex flex-col items-center justify-center gap-5">
              <div className="text-xs text-foreground/40 text-center space-y-1 normal-case">
                <p><span className="text-primary">$</span> ./start-project.sh</p>
                <p className="text-foreground/30">Décrivez votre projet et recevez</p>
                <p className="text-foreground/30">une proposition détaillée sous 24h.</p>
              </div>
              <a
                href="mailto:gregsordel@icloud.com?subject=Demande%20de%20devis%20-%20Speed%20Services"
                className="group relative px-6 py-3 bg-primary text-primary-foreground font-bold text-xs tracking-wider overflow-hidden normal-case"
              >
                <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                  <Mail size={14} />
                  ./send --proposal
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

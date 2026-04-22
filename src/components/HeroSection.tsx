import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

  const benefits = [
    { icon: Clock, text: 'Livraison rapide' },
    { icon: TrendingUp, text: 'Résultats mesurables' },
    { icon: Zap, text: 'Automatisation efficace' },
  ];

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto max-w-5xl relative z-10">
        <div className="terminal-card max-w-4xl mx-auto">
          <div className="terminal-bar">
            <span className="terminal-dot bg-primary animate-pulse" />
            <span className="terminal-dot bg-accent" />
            <span className="terminal-dot bg-primary/40" />
            <span className="ml-3">mission_overview.sys</span>
            <span className="ml-auto text-foreground/20">ONLINE</span>
          </div>

          <div className="relative z-10 p-6 md:p-10 text-center flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-primary/30 text-primary text-xs font-mono tracking-[0.2em]"
            >
              <span className="terminal-dot bg-primary animate-pulse" />
              FREELANCE IT — DISPONIBLE
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="terminal-prompt"
            >
              &gt; MISSION PRINCIPALE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight"
            >
              Je développe des outils <span className="text-gradient">SaaS et IA</span> pour automatiser votre business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-[58ch] text-lg text-muted-foreground leading-relaxed"
            >
              Chatbots IA, automatisation, applications web — livrés rapidement et efficacement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="grid sm:grid-cols-3 gap-3 w-full max-w-3xl"
            >
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="border border-primary/12 bg-secondary/35 px-4 py-3 text-left">
                  <div className="flex items-center gap-2 mb-1 text-primary font-mono text-[10px] tracking-[0.18em]">
                    <Icon size={12} />
                    OUTPUT
                  </div>
                  <div className="text-sm text-foreground/75">{text}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-4 pt-2"
            >
              <a
                href="#contact"
                className="group px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-[0.16em] transition-all duration-300 flex items-center gap-2 glow-primary"
              >
                ./discuter_projet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="px-8 py-4 border border-primary/30 hover:border-primary hover:text-primary font-mono text-xs tracking-[0.16em] transition-colors text-muted-foreground"
              >
                ./voir_services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
              className="pt-6 flex flex-wrap justify-center gap-2 text-xs"
            >
              {['PYTHON', 'REACT', 'NODE.JS', 'OPENAI', 'DOCKER'].map((tech) => (
                <span key={tech} className="terminal-chip">{tech}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-primary/30 font-mono"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

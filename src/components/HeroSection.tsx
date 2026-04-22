import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Clock } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

  const benefits = [
    { icon: Clock, text: "Gain de temps" },
    { icon: TrendingUp, text: "Revenus en hausse" },
    { icon: Zap, text: "Automatisation totale" },
  ];

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-16">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto max-w-5xl relative z-10">
        
        <div className="flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-primary text-xs tracking-widest"
          >
            <span className="size-2 bg-primary animate-pulse" />
            GRÉGORY SORDELET — FREELANCE IT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Automatisez votre business<br />
            avec des{' '}
            <span className="relative inline-block">
              <span className="absolute -inset-2 blur-xl bg-accent/20" />
              <span className="relative text-accent">solutions IA</span>
            </span>
            {' '}sur mesure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-[60ch] text-base md:text-lg text-foreground/60 leading-relaxed normal-case"
          >
            Je développe des solutions SaaS et des outils IA pour automatiser et faire gagner du temps aux entreprises. Je propose aussi des services en cybersécurité et réseaux.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap justify-center gap-6 text-sm normal-case"
          >
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-foreground/70">
                <Icon size={16} className="text-primary" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wider overflow-hidden normal-case"
            >
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                Discuter de votre projet
                <ArrowRight size={16} />
              </span>
            </a>
            <a
              href="#services"
              className="px-8 py-4 border border-foreground/20 hover:border-primary hover:text-primary text-sm tracking-wider transition-colors normal-case"
            >
              Voir mes services
            </a>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="pt-8 border-t border-foreground/10 flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-foreground/40"
          >
            {['PYTHON', 'REACT', 'NODE.JS', 'OPENAI', 'DOCKER', 'LINUX'].map((tech) => (
              <span key={tech} className="px-3 py-1 border border-foreground/10 text-foreground/60">{tech}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-primary/40 tracking-widest"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Mail, Shield, Code, Cpu, Zap } from 'lucide-react';
import { useRef } from 'react';

const floatingTags = [
  { icon: Code, label: 'Web Dev', delay: 0 },
  { icon: Shield, label: 'Cybersecurity', delay: 1 },
  { icon: Cpu, label: 'Automation', delay: 2 },
  { icon: Zap, label: 'AI / ML', delay: 0.5 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-medium">Disponible pour vos projets</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
        >
          <span className="text-gradient">Speed</span>{' '}
          <span className="text-foreground">Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground font-heading"
        >
          Solutions IT sur mesure — Dev · Automatisation · Cyber · IA
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          De la création de sites web à l'automatisation avancée, en passant par la cybersécurité
          et l'intelligence artificielle — je transforme vos besoins en solutions concrètes et performantes.
        </motion.p>

        {/* Floating capability tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          {floatingTags.map((tag) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: tag.delay }}
                className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm"
              >
                <Icon size={14} className="text-primary" />
                <span className="text-foreground/80">{tag.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-6"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary"
          >
            Voir mes projets
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border hover:border-primary/50 text-foreground transition-colors"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-center gap-4 pt-2"
        >
          <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="mailto:gregsordel@icloud.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

  const benefits = [
    { icon: Clock, text: "Livraison rapide" },
    { icon: TrendingUp, text: "Résultats mesurables" },
    { icon: Zap, text: "Automatisation efficace" },
  ];

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto max-w-4xl relative z-10">
        
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm"
          >
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Freelance IT — Disponible
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight"
          >
            Je développe des outils{' '}
            <span className="text-gradient">SaaS et IA</span>{' '}
            pour automatiser votre business
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-[55ch] text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Chatbots IA, automatisation, applications web — livrés rapidement et efficacement.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Icon size={14} className="text-primary" />
                </div>
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
              className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Discuter de mon projet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 border border-border hover:border-primary/50 hover:text-primary rounded-lg transition-colors text-muted-foreground"
            >
              Voir mes services
            </a>
          </motion.div>

          {/* Tech stack subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="pt-10 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground/60"
          >
            {['Python', 'React', 'Node.js', 'OpenAI', 'Docker'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50">{tech}</span>
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
          className="text-sm text-muted-foreground/30"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

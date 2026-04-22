import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { useRef } from 'react';
import MiniMelodyPlayer from './MiniMelodyPlayer';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-16">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        
        {/* Left: Typography & Identity */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-primary text-xs tracking-widest flex items-center gap-3"
          >
            <div className="h-px w-8 bg-primary" />
            SPEED_SERVICES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.85] tracking-tighter"
          >
            ROOT<br />
            <span className="text-outline">ACCESS</span>{' '}
            <span className="relative inline-block">
              <span className="absolute -inset-2 blur-xl bg-accent/20" />
              <span className="relative text-accent">GRANTED</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-[55ch] text-sm text-foreground/60 leading-relaxed normal-case"
          >
            Dev · Automatisation · Cybersécurité · IA — Solutions IT sur mesure par Grégory Sordelet. Réponse sous 24h.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group relative px-8 py-3.5 bg-primary text-primary-foreground font-bold text-xs tracking-widest overflow-hidden"
            >
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative group-hover:text-foreground transition-colors duration-300">VOIR_PROJETS</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-foreground/20 hover:border-accent hover:text-accent text-xs tracking-widest transition-colors"
            >
              CONTACT
            </a>
          </motion.div>

          {/* Mini player */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="pt-4"
          >
            <MiniMelodyPlayer />
          </motion.div>

          {/* Stack ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="pt-4 border-t border-foreground/10 flex flex-wrap gap-4 md:gap-6 text-xs text-foreground/30"
          >
            <span>&gt; STACK:</span>
            {['PYTHON', 'REACT', 'NODE.JS', 'DOCKER', 'LINUX'].map((tech) => (
              <span key={tech} className="text-foreground/70">{tech}</span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-4 pt-2"
          >
            <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-primary transition-colors">
              <Github size={16} />
            </a>
            <a href="mailto:gregsordel@icloud.com" className="text-foreground/30 hover:text-primary transition-colors">
              <Mail size={16} />
            </a>
          </motion.div>
        </div>

          {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          {/* Glitch borders */}
          <div className="absolute -inset-2 border border-accent/20 translate-x-2 translate-y-2 pointer-events-none hidden lg:block" />
          <div className="absolute -inset-2 border border-primary/20 -translate-x-2 -translate-y-2 pointer-events-none hidden lg:block" />
          
          <div className="bg-card border border-primary/30">
            <div className="h-8 border-b border-primary/20 bg-secondary flex items-center justify-between px-3">
              <div className="flex gap-2">
                <div className="size-2 bg-accent/50" />
                <div className="size-2 bg-primary/50" />
              </div>
              <span className="text-[10px] text-foreground/30">root@speed:~#</span>
            </div>
            <div className="p-5 flex flex-col gap-2.5 text-xs text-primary/70 normal-case font-mono">
              <span className="text-foreground/30">$ nmap -sV target.local</span>
              <span className="text-foreground/40">Starting scan... <span className="text-primary">[██████████]</span> 100%</span>
              <span className="text-foreground/40">Open ports: <span className="text-accent">22</span>, <span className="text-accent">80</span>, <span className="text-accent">443</span>, <span className="text-accent">8080</span></span>
              <span className="text-foreground/30 mt-1">$ cat /etc/speed/skills.conf</span>
              <span className="text-foreground/50">web_dev=<span className="text-primary">enabled</span></span>
              <span className="text-foreground/50">automation=<span className="text-primary">enabled</span></span>
              <span className="text-foreground/50">cybersec=<span className="text-primary">enabled</span></span>
              <span className="text-foreground/50">ai_ml=<span className="text-primary">enabled</span></span>
              <span className="text-foreground/30 mt-1">$ systemctl status speed-services</span>
              <span className="text-primary">● active (running)</span>
              <span className="text-foreground/40">  Projets livrés: <span className="text-foreground">47+</span> | Uptime: <span className="text-foreground">99.9%</span></span>
              <span className="text-foreground/30 mt-1">$ _<span className="animate-blink text-primary">█</span></span>
            </div>
          </div>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-primary/40 tracking-widest"
        >
          SCROLL_DOWN
        </motion.div>
      </motion.div>
    </section>
  );
}

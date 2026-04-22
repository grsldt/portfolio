import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

function TypeWriter({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    }
  }, [started, displayed, text, speed]);

  return <>{displayed}<span className="animate-blink">_</span></>;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-16">
      <motion.div style={{ y: textY, opacity }} className="container mx-auto max-w-4xl relative z-10">
        
        <div className="flex flex-col gap-6">
          {/* Terminal window */}
          <div className="terminal-block">
            <div className="terminal-header">
              <span className="size-2 bg-primary animate-pulse" />
              <span>speed@services:~</span>
              <span className="ml-auto text-foreground/20">bash</span>
            </div>
            
            <div className="p-6 space-y-4 text-sm">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">$</span> cat /etc/speed/identity.conf
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-foreground/50 text-xs pl-4 border-l border-primary/20"
              >
                <p>NAME="Grégory Sordelet"</p>
                <p>ROLE="Freelance IT"</p>
                <p>STATUS=<span className="text-primary font-bold">active</span></p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">$</span> echo $MISSION
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight normal-case"
              >
                <TypeWriter 
                  text="Automatisez votre business avec des solutions IA sur mesure" 
                  delay={1800} 
                  speed={25}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">$</span> cat services.log
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8 }}
                className="text-foreground/60 text-xs pl-4 border-l border-primary/20 space-y-1 normal-case"
              >
                <p>[<span className="text-primary">INFO</span>] Solutions SaaS & applications web</p>
                <p>[<span className="text-primary">INFO</span>] Automatisation & outils IA</p>
                <p>[<span className="text-primary">INFO</span>] Cybersécurité & réseaux</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">$</span> cat benefits.txt
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.8 }}
                className="flex flex-wrap gap-4 text-xs normal-case"
              >
                <span className="text-primary">→ Gain de temps</span>
                <span className="text-primary">→ Revenus en hausse</span>
                <span className="text-primary">→ Automatisation totale</span>
              </motion.div>
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group relative px-6 py-3 bg-primary text-primary-foreground font-bold text-xs tracking-wider overflow-hidden normal-case"
            >
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                ./contact --start-project
                <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="#services"
              className="px-6 py-3 border border-primary/30 hover:border-primary hover:text-primary text-xs tracking-wider transition-colors normal-case text-foreground/50"
            >
              ls ./services
            </a>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5 }}
            className="flex flex-wrap gap-2 text-[10px] text-foreground/30"
          >
            {['PYTHON', 'REACT', 'NODE.JS', 'OPENAI', 'DOCKER', 'LINUX'].map((tech) => (
              <span key={tech} className="px-2 py-0.5 border border-primary/10 text-primary/50 hover:text-primary hover:border-primary/30 transition-colors">{tech}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-primary/40 tracking-widest"
        >
          ↓ scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

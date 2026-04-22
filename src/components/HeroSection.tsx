import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Disponible pour vos projets</span>
          </motion.div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Grégory{' '}
            <span className="text-gradient">Sordelet</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-heading">
            Freelance IT & Développeur Web
          </p>

          <p className="text-muted-foreground max-w-lg leading-relaxed">
            Je conçois des solutions digitales sur mesure — sites web, bots d'automatisation,
            outils de scraping et applications IA. De l'idée au déploiement, je transforme
            vos besoins en résultats concrets.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary"
            >
              Voir mes projets
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-primary/50 text-foreground transition-colors"
            >
              Me contacter
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a href="https://github.com/grsldt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:gregsordel@icloud.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 glow-primary">
              <img
                src="/gregory-profile.png"
                alt="Grégory Sordelet"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-8 glass px-3 py-2 rounded-lg text-xs font-medium text-primary"
            >
              🤖 Automation
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-12 glass px-3 py-2 rounded-lg text-xs font-medium text-accent"
            >
              🌐 Web Dev
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

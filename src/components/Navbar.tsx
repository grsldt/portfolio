import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'services', href: '#services' },
  { label: 'projets', href: '#projects' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/15 bg-background/88 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#hero" className="flex items-center gap-3 font-mono text-sm tracking-[0.18em] text-primary">
            <span className="terminal-dot bg-primary animate-pulse" />
            speed_services.exe
          </a>

          <div className="hidden md:flex gap-6 text-xs font-mono tracking-[0.16em] text-muted-foreground">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-primary transition-colors duration-200">
                ./{item.label}
              </a>
            ))}
            <Link to="/melody" className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200">
              <Music size={12} />
              ./melody
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2 border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-[0.16em] hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            ./contact
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-primary/15 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-3 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors py-2"
              >
                ./{item.label}
              </a>
            ))}
            <Link
              to="/melody"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted-foreground hover:text-accent transition-colors py-2"
            >
              <Music size={12} />
              ./melody
            </Link>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="border border-primary/30 bg-primary/10 text-primary px-4 py-2.5 font-mono text-xs tracking-[0.16em] text-center mt-2"
            >
              ./contact
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

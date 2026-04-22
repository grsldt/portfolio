import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#hero" className="flex items-center gap-2 font-heading font-bold text-lg">
            <span className="size-2.5 rounded-full bg-primary animate-pulse" />
            Speed Services
          </a>
          <div className="hidden md:flex gap-6 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/melody"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              <Music size={14} />
              Melody
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Me contacter
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
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors py-2 text-sm"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/melody"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors py-2 text-sm"
            >
              <Music size={14} />
              Melody
            </Link>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium rounded-lg text-center mt-2"
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

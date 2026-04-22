import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: '// PROJETS', href: '#projects' },
  { label: '// SKILLS', href: '#skills' },
  { label: '// CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between text-xs tracking-widest">
        <div className="flex items-center gap-6">
          <a href="#hero" className="flex items-center gap-2 text-primary">
            <span className="size-2 bg-primary animate-pulse" />
            <span>SYS.ONLINE</span>
          </a>
          <div className="hidden md:flex gap-6 text-foreground/50">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/melody"
              className="flex items-center gap-1.5 text-foreground/50 hover:text-accent transition-colors duration-300"
            >
              <Music size={12} />
              // MELODY
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="border border-primary/50 px-4 py-1.5 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            INITIATE_CONTACT
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-md"
        >
          <div className="px-6 py-4 flex flex-col gap-3 text-xs tracking-widest">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground/50 hover:text-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/melody"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors py-2"
            >
              <Music size={12} />
              // MELODY
            </Link>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="border border-primary/50 px-4 py-2 text-primary text-center mt-2"
            >
              INITIATE_CONTACT
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

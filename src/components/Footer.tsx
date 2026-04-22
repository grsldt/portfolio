import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Speed Services — Grégory Sordelet</p>
        <Link
          to="/melody"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Music size={14} />
          Melody Lab
        </Link>
        <p>Solutions IT sur mesure 🚀</p>
      </div>
    </footer>
  );
}

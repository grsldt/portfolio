import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p className="font-mono tracking-wider">© {new Date().getFullYear()} SPEED_SERVICES — GRÉGORY_SORDELET</p>
        <Link
          to="/melody"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Music size={13} />
          Melody Lab
        </Link>
        <p className="font-mono tracking-wider">RENNES · VANNES · PARIS</p>
      </div>
    </footer>
  );
}

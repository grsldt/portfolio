import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-foreground/20 tracking-widest">
        <p><span className="text-primary/40">$</span> echo "© {new Date().getFullYear()} SPEED_SERVICES — GRÉGORY_SORDELET"</p>
        <Link
          to="/melody"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Music size={10} />
          ./melody
        </Link>
        <p className="text-foreground/15">pid: 1337 · uptime: 99.9%</p>
      </div>
    </footer>
  );
}

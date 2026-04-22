export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Grégory Sordelet — Freelance IT</p>
        <p>Conçu avec passion 🚀</p>
      </div>
    </footer>
  );
}

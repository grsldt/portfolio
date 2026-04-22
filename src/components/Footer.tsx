export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Speed Services — Grégory Sordelet</p>
        <p>Solutions IT sur mesure 🚀</p>
      </div>
    </footer>
  );
}

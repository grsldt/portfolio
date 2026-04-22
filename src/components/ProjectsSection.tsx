import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'TikTok AI Video Creator',
    cmd: 'cat tiktok-ai.log',
    problem: "Créer du contenu vidéo monétisable demande du temps et des compétences techniques.",
    solution: "Plateforme SaaS qui génère automatiquement des vidéos optimisées pour l'algorithme TikTok grâce à l'IA.",
    result: "En développement — Automatisation complète de la création de contenu vidéo.",
    tags: ['IA', 'SAAS', 'PYTHON', 'VIDEO'],
    accent: true,
    inProgress: true,
    featured: true,
  },
  {
    title: 'Bot OnlyFans',
    cmd: 'cat onlyfans-bot.log',
    problem: "Répondre à des centaines de messages quotidiens manuellement.",
    solution: "Bot de réponse automatique intelligent basé sur du NLP, conversations 24/7.",
    result: "Temps de réponse réduit de 95%, engagement augmenté.",
    tags: ['IA', 'NLP', 'API', 'PYTHON'],
    accent: true,
    featured: true,
  },
  {
    title: 'Bot Vinted',
    cmd: 'cat vinted-bot.log',
    problem: "Surveiller manuellement des milliers d'articles.",
    solution: "Bot qui scrape Vinted en temps réel, filtre par marque/prix, notifie via Discord.",
    result: "Accès aux meilleures offres en premier.",
    tags: ['PYTHON', 'API', 'DISCORD', 'SCRAPING'],
    accent: false,
  },
  {
    title: 'BrandsCollectionBV',
    cmd: 'cat brands.log',
    problem: "Entreprise FMCG sans présence en ligne.",
    solution: "Site vitrine complet : identité visuelle, SEO, responsive.",
    result: "Visibilité accrue, nouveaux partenaires.",
    tags: ['REACT', 'SEO', 'BRANDING'],
    link: 'https://brandscollectionbv.com',
    accent: false,
  },
  {
    title: 'FMCG Lead Scraper',
    cmd: 'cat scraper.log',
    problem: "Identifier les entreprises FMCG sans site web.",
    solution: "Outil de scraping qui collecte et génère des prospects qualifiés automatiquement.",
    result: "Pipeline de prospection automatisé.",
    tags: ['PYTHON', 'GOOGLE_API', 'SCRAPING'],
    accent: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ProjectsSection() {
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-4">
            <span className="text-primary/50">$</span> ls -la /var/log/projects/
          </div>
          <p className="text-foreground/30 text-xs">total {projects.length} — case studies</p>
        </motion.div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="terminal-block"
            >
              <div className="terminal-header">
                <span className="size-1.5 bg-accent animate-pulse" />
                <span>{project.cmd}</span>
                {project.inProgress && (
                  <span className="ml-auto text-accent text-[9px]">[RUNNING]</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold tracking-tight normal-case text-foreground mb-4">
                  <span className="text-accent">#</span> {project.title}
                </h3>
                <div className="space-y-3 mb-4 text-xs normal-case">
                  <div className="pl-3 border-l border-accent/20">
                    <span className="text-[10px] text-accent/60 tracking-widest">ERROR:</span>
                    <p className="text-foreground/50 mt-0.5">{project.problem}</p>
                  </div>
                  <div className="pl-3 border-l border-primary/30">
                    <span className="text-[10px] text-primary/60 tracking-widest">FIX:</span>
                    <p className="text-foreground/50 mt-0.5">{project.solution}</p>
                  </div>
                  <div className="pl-3 border-l border-primary/30">
                    <span className="text-[10px] text-primary tracking-widest">OUTPUT:</span>
                    <p className="text-foreground/70 mt-0.5 font-medium">{project.result}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 border-t border-primary/10 pt-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 border border-primary/15 text-primary/50 tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Others */}
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="terminal-block"
            >
              <div className="terminal-header">
                <span className="size-1.5 bg-primary/50" />
                <span>{project.cmd}</span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold tracking-tight normal-case text-foreground mb-2">
                  <span className="text-primary">#</span> {project.title}
                </h3>
                <p className="text-[11px] text-foreground/40 normal-case mb-3 leading-relaxed">{project.solution}</p>
                <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-primary/10 text-primary/40 tracking-widest">{tag}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground/20 hover:text-primary transition-colors">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-xs tracking-wider normal-case group overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
              ./request --similar-project
              <ArrowRight size={14} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

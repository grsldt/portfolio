import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'TikTok AI Video Creator',
    file: 'tiktok_ai_build.log',
    subtitle: 'SaaS IA — En cours de développement',
    problem: "Créer du contenu vidéo monétisable demande du temps et des compétences techniques.",
    solution: "Plateforme SaaS qui génère automatiquement des vidéos optimisées pour TikTok grâce à l'IA.",
    result: "Automatisation complète de la création de contenu vidéo.",
    tags: ['IA', 'SAAS', 'PYTHON'],
    inProgress: true,
    featured: true,
  },
  {
    title: 'Bot OnlyFans',
    file: 'onlyfans_automation.log',
    subtitle: 'Automatisation IA',
    problem: "Répondre manuellement à des centaines de messages par jour.",
    solution: "Bot intelligent qui gère les conversations automatiquement 24h/24.",
    result: "95% de temps gagné sur les réponses, engagement en hausse.",
    tags: ['IA', 'NLP', 'PYTHON'],
    featured: true,
  },
  {
    title: 'Bot Vinted',
    file: 'vinted_watcher.log',
    subtitle: 'Automatisation achat-revente',
    problem: "Surveiller manuellement des milliers d'articles.",
    solution: "Bot qui surveille Vinted en temps réel et notifie les meilleures offres.",
    result: "Accès prioritaire aux bonnes affaires, marges augmentées.",
    tags: ['PYTHON', 'DISCORD', 'SCRAPING'],
  },
  {
    title: 'BrandsCollectionBV',
    file: 'brandsite_deploy.log',
    subtitle: 'Site vitrine professionnel',
    problem: "Entreprise internationale sans présence en ligne.",
    solution: "Site web complet avec identité visuelle, SEO et design responsive.",
    result: "Visibilité accrue, nouveaux partenaires.",
    tags: ['REACT', 'SEO'],
    link: 'https://brandscollectionbv.com',
  },
  {
    title: 'FMCG Lead Scraper',
    file: 'lead_scraper.log',
    subtitle: 'Prospection automatisée',
    problem: "Trouver des entreprises sans site web parmi des milliers de résultats.",
    solution: "Outil qui collecte et qualifie automatiquement des prospects.",
    result: "Pipeline de prospection entièrement automatisé.",
    tags: ['PYTHON', 'API', 'SCRAPING'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="terminal-prompt mb-4">&gt; PROJETS / CASE STUDIES</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Résultats concrets
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="terminal-card hover:border-accent/35 transition-all duration-300"
            >
              <div className="terminal-bar text-accent/70 border-accent/15">
                <span className="terminal-dot bg-accent animate-pulse" />
                <span>{project.file}</span>
                {project.inProgress && <span className="ml-auto text-accent">[RUNNING]</span>}
              </div>

              <div className="relative z-10 p-6">
                <h3 className="font-heading text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground font-mono mb-5 tracking-[0.16em]">{project.subtitle}</p>

                <div className="space-y-4 mb-5">
                  <div>
                    <div className="terminal-prompt text-destructive/80 mb-1">&gt; PROBLÈME</div>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  <div>
                    <div className="terminal-prompt mb-1">&gt; SOLUTION</div>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                  <div>
                    <div className="terminal-prompt text-accent/80 mb-1">&gt; RÉSULTAT</div>
                    <p className="text-sm text-foreground/82 font-medium">{project.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/12">
                  {project.tags.map((tag) => (
                    <span key={tag} className="terminal-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {others.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="terminal-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="terminal-bar">
                <span className="terminal-dot bg-primary/45" />
                <span>{project.file}</span>
              </div>

              <div className="relative z-10 p-5">
                <h3 className="font-heading text-base font-bold mb-1">{project.title}</h3>
                <p className="text-[10px] text-muted-foreground font-mono mb-3 tracking-[0.16em]">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.solution}</p>
                <div className="flex items-center justify-between pt-3 border-t border-primary/12">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="terminal-chip px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-[0.16em] transition-all glow-primary group"
          >
            ./projet_similaire
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

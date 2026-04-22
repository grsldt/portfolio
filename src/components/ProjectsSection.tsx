import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'TikTok AI Video Creator',
    subtitle: 'SaaS IA — En cours de développement',
    problem: "Créer du contenu vidéo monétisable demande du temps et des compétences techniques.",
    solution: "Plateforme SaaS qui génère automatiquement des vidéos optimisées pour TikTok grâce à l'IA.",
    result: "Automatisation complète de la création de contenu vidéo.",
    tags: ['IA', 'SaaS', 'Python'],
    accent: true,
    inProgress: true,
    featured: true,
  },
  {
    title: 'Bot OnlyFans',
    subtitle: 'Automatisation IA',
    problem: "Répondre manuellement à des centaines de messages par jour.",
    solution: "Bot intelligent qui gère les conversations automatiquement 24h/24.",
    result: "95% de temps gagné sur les réponses, engagement en hausse.",
    tags: ['IA', 'NLP', 'Python'],
    accent: true,
    featured: true,
  },
  {
    title: 'Bot Vinted',
    subtitle: 'Automatisation achat-revente',
    problem: "Surveiller manuellement des milliers d'articles pour acheter avant la concurrence.",
    solution: "Bot qui surveille Vinted en temps réel et notifie les meilleures offres.",
    result: "Accès prioritaire aux bonnes affaires, marges de revente augmentées.",
    tags: ['Python', 'Discord', 'Scraping'],
    accent: false,
  },
  {
    title: 'BrandsCollectionBV',
    subtitle: 'Site vitrine professionnel',
    problem: "Une entreprise internationale sans présence en ligne professionnelle.",
    solution: "Site web complet avec identité visuelle, SEO et design responsive.",
    result: "Visibilité en ligne accrue, nouveaux partenaires commerciaux.",
    tags: ['React', 'SEO'],
    link: 'https://brandscollectionbv.com',
    accent: false,
  },
  {
    title: 'FMCG Lead Scraper',
    subtitle: 'Prospection automatisée',
    problem: "Trouver des entreprises sans site web parmi des milliers de résultats.",
    solution: "Outil qui collecte et qualifie automatiquement des prospects.",
    result: "Pipeline de prospection entièrement automatisé.",
    tags: ['Python', 'API', 'Scraping'],
    accent: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
          className="mb-14 text-center"
        >
          <p className="text-primary text-sm font-medium mb-3">Résultats concrets</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Projets réalisés
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group rounded-xl bg-card border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
            >
              {project.inProgress && (
                <div className="px-4 py-1.5 bg-accent/10 text-accent text-xs font-medium text-center">
                  🚀 En cours de développement
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-5">{project.subtitle}</p>

                <div className="space-y-4 mb-5">
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-destructive shrink-0 mt-0.5">Problème</span>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-primary shrink-0 mt-0.5">Solution</span>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xs font-medium text-green-400 shrink-0 mt-0.5">Résultat</span>
                    <p className="text-sm text-foreground/80 font-medium">{project.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">{tag}</span>
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
              className="group rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-5">
                <h3 className="font-heading text-base font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.solution}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={14} />
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
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg shadow-primary/20 group"
          >
            Vous avez un projet similaire ?
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ExternalLink, Globe, Bot, Search, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'TikTok AI Video Creator',
    subtitle: 'SaaS IA — En cours',
    icon: Sparkles,
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
    subtitle: 'Automatisation IA',
    icon: Bot,
    problem: "Répondre à des centaines de messages quotidiens manuellement, impactant la conversion.",
    solution: "Bot de réponse automatique intelligent basé sur du NLP, capable de gérer les conversations 24/7.",
    result: "Temps de réponse réduit de 95%, engagement et rétention des abonnés augmentés significativement.",
    tags: ['IA', 'NLP', 'API', 'PYTHON'],
    accent: true,
    featured: true,
  },
  {
    title: 'Bot Vinted',
    subtitle: 'Automatisation achat-revente',
    icon: ShoppingBag,
    problem: "Surveiller manuellement des milliers d'articles pour acheter avant la concurrence.",
    solution: "Bot qui scrape Vinted en temps réel, filtre par marque/prix, et notifie instantanément via Discord.",
    result: "Accès aux meilleures offres en premier — marges de revente augmentées de manière mesurable.",
    tags: ['PYTHON', 'API', 'DISCORD', 'SCRAPING'],
    accent: false,
  },
  {
    title: 'BrandsCollectionBV',
    subtitle: 'Site vitrine professionnel',
    icon: Globe,
    problem: "Une entreprise FMCG internationale sans présence en ligne professionnelle.",
    solution: "Conception et développement complet : identité visuelle, SEO, responsive design.",
    result: "Site en production — visibilité accrue et acquisition de nouveaux partenaires commerciaux.",
    tags: ['REACT', 'SEO', 'BRANDING'],
    link: 'https://brandscollectionbv.com',
    accent: false,
  },
  {
    title: 'FMCG Lead Scraper',
    subtitle: 'Prospection automatisée',
    icon: Search,
    problem: "Identifier les entreprises FMCG sans site web parmi des milliers de résultats.",
    solution: "Outil de scraping qui collecte, vérifie la présence en ligne et génère des prospects qualifiés automatiquement.",
    result: "Pipeline de prospection entièrement automatisé — des heures de travail économisées par semaine.",
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
          className="mb-16 text-center"
        >
          <div className="text-primary text-xs tracking-widest flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            RÉSULTATS CONCRETS
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight normal-case">
            Projets <span className="text-accent">& case studies</span>
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative bg-card border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                {project.inProgress && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-accent/10 border-b border-l border-accent/20 text-accent text-[10px] tracking-widest">
                    EN COURS
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 border border-accent/30 text-accent">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold tracking-tight normal-case">{project.title}</h3>
                      <p className="text-[10px] text-accent/60 tracking-widest mt-1">{project.subtitle.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5 text-sm normal-case">
                    <div>
                      <span className="text-[10px] text-primary tracking-widest">▸ PROBLÈME</span>
                      <p className="text-foreground/60 mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-accent tracking-widest">▸ SOLUTION</span>
                      <p className="text-foreground/60 mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-primary tracking-widest">▸ RÉSULTAT</span>
                      <p className="text-foreground/70 mt-1 font-medium">{project.result}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 border-t border-primary/10 pt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 border border-accent/20 text-accent/70 tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Others */}
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative bg-card border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 border border-primary/30 text-primary">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold tracking-tight normal-case">{project.title}</h3>
                      <p className="text-[10px] text-foreground/40 tracking-widest">{project.subtitle.toUpperCase()}</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/50 normal-case mb-3 leading-relaxed">{project.solution}</p>
                  <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-foreground/10 text-foreground/50 tracking-widest">{tag}</span>
                      ))}
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-primary transition-colors">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wider normal-case group overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative group-hover:text-foreground transition-colors duration-300 flex items-center gap-2">
              Vous avez un projet similaire ?
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ExternalLink, Globe, Bot, Search, ShoppingBag, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'BrandsCollectionBV',
    subtitle: 'Site vitrine FMCG',
    icon: Globe,
    problem: "Une entreprise FMCG internationale avait besoin d'une présence en ligne professionnelle pour présenter ses marques et attirer des distributeurs.",
    solution: "Conception et développement d'un site web complet avec une identité visuelle sur mesure, optimisé SEO et responsive.",
    result: "Site en production sur brandscollectionbv.com — visibilité accrue et acquisition de nouveaux partenaires commerciaux.",
    tags: ['Web Design', 'SEO', 'Branding'],
    link: 'https://brandscollectionbv.com',
    color: 'primary' as const,
  },
  {
    title: 'Bot Vinted',
    subtitle: 'Automatisation achat-revente',
    icon: ShoppingBag,
    problem: "Un client spécialisé dans l'achat-revente avait besoin de surveiller des articles de marques spécifiques pour acheter avant la concurrence.",
    solution: "Développement d'un bot qui scrape Vinted en temps réel, filtre par marque et prix, et envoie les meilleures offres instantanément sur Discord.",
    result: "Le client accède aux articles les moins chers en premier, augmentant significativement ses marges de revente.",
    tags: ['Python', 'API', 'Discord', 'Scraping'],
    color: 'accent' as const,
  },
  {
    title: 'FMCG Lead Scraper',
    subtitle: 'Outil de prospection automatisé',
    icon: Search,
    problem: "Identifier manuellement les entreprises FMCG sans site web parmi des milliers de résultats est un travail colossal et inefficace.",
    solution: "Création d'un outil de scraping qui collecte les FMCG internationaux, vérifie leur présence en ligne via Google, et génère une liste de prospects qualifiés.",
    result: "Pipeline de prospection automatisé permettant de proposer des services de création de site à des entreprises sans présence digitale.",
    tags: ['Python', 'Scraping', 'Google API', 'Automatisation'],
    color: 'primary' as const,
  },
  {
    title: 'Bot OnlyFans',
    subtitle: 'Réponse automatique IA',
    icon: Bot,
    problem: "Un manager OnlyFans devait répondre à des centaines de messages quotidiens, un travail chronophage impactant la conversion.",
    solution: "Développement d'un bot de réponse automatique intelligent qui gère les conversations et maintient l'engagement des abonnés.",
    result: "Temps de réponse réduit de 95%, augmentation de l'engagement et de la rétention des abonnés.",
    tags: ['IA', 'API', 'Automatisation', 'NLP'],
    color: 'accent' as const,
  },
  {
    title: 'TikTok AI Video Creator',
    subtitle: 'Création vidéo IA — En cours',
    icon: Sparkles,
    problem: "Créer du contenu vidéo monétisable pour TikTok demande du temps, des compétences et des outils coûteux.",
    solution: "Développement d'une IA capable de générer des vidéos complètes optimisées pour l'algorithme TikTok et la monétisation.",
    result: "Projet en cours de développement — Automatisation complète de la création de contenu vidéo.",
    tags: ['IA', 'Vidéo', 'TikTok', 'Python'],
    color: 'primary' as const,
    inProgress: true,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Projets <span className="text-gradient">& Case Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des solutions concrètes pour des problèmes réels. Chaque projet suit une approche
            Problème → Solution → Résultat.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className={`group relative glass rounded-xl p-6 hover:border-${project.color}/30 transition-all duration-500 ${
                  project.inProgress ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''
                }`}
                whileHover={{ y: -4 }}
              >
                {project.inProgress && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    🚧 En cours
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-${project.color}/10 text-${project.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Problème</span>
                    <p className="text-sm text-muted-foreground mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">Solution</span>
                    <p className="text-sm text-muted-foreground mt-1">{project.solution}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Résultat</span>
                    <p className="text-sm text-muted-foreground mt-1">{project.result}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

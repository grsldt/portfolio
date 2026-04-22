import { motion } from 'framer-motion';
import { ExternalLink, Globe, Bot, Search, ShoppingBag, Sparkles, Shield, Radio } from 'lucide-react';

const projects = [
  {
    title: 'BrandsCollectionBV',
    subtitle: 'Site vitrine FMCG',
    icon: Globe,
    problem: "Une entreprise FMCG internationale avait besoin d'une présence en ligne professionnelle.",
    solution: "Conception et développement d'un site web complet avec identité visuelle sur mesure, SEO et responsive.",
    result: "Site en production — visibilité accrue et acquisition de nouveaux partenaires.",
    tags: ['WEB', 'SEO', 'BRANDING'],
    link: 'https://brandscollectionbv.com',
    accent: false,
  },
  {
    title: 'Bot Vinted',
    subtitle: 'Automatisation achat-revente',
    icon: ShoppingBag,
    problem: "Surveiller des articles de marques spécifiques pour acheter avant la concurrence.",
    solution: "Bot qui scrape Vinted en temps réel, filtre par marque/prix, envoie sur Discord.",
    result: "Accès aux articles les moins chers en premier, marges de revente augmentées.",
    tags: ['PYTHON', 'API', 'DISCORD'],
    accent: true,
  },
  {
    title: 'FMCG Lead Scraper',
    subtitle: 'Prospection automatisée',
    icon: Search,
    problem: "Identifier les FMCG sans site web parmi des milliers de résultats.",
    solution: "Outil de scraping qui collecte, vérifie la présence en ligne, génère des prospects qualifiés.",
    result: "Pipeline de prospection automatisé pour proposer des services web.",
    tags: ['PYTHON', 'GOOGLE_API', 'SCRAPING'],
    accent: false,
  },
  {
    title: 'Bot OnlyFans',
    subtitle: 'Réponse automatique IA',
    icon: Bot,
    problem: "Répondre à des centaines de messages quotidiens, chronophage et impactant la conversion.",
    solution: "Bot de réponse automatique intelligent qui gère les conversations.",
    result: "Temps de réponse réduit de 95%, engagement et rétention augmentés.",
    tags: ['IA', 'NLP', 'API'],
    accent: true,
  },
  {
    title: 'Android Security Tool',
    subtitle: 'Audit de sécurité mobile',
    icon: Shield,
    problem: "Tester la résilience d'appareils Android face à des vecteurs d'attaque courants.",
    solution: "Outil d'audit permettant l'analyse de vulnérabilités et surveillance à distance.",
    result: "Identification de failles critiques en environnement de test contrôlé.",
    tags: ['JAVA', 'ANDROID', 'PENTEST'],
    accent: false,
  },
  {
    title: 'RF Signal Jammer',
    subtitle: 'Projet hardware embarqué',
    icon: Radio,
    problem: "Étude des vulnérabilités des protocoles radio 433 MHz.",
    solution: "Brouilleur de signal Arduino avec firmware custom et antenne directionnelle.",
    result: "Démonstration des faiblesses des systèmes radio non chiffrés.",
    tags: ['ARDUINO', 'HARDWARE', 'RF'],
    accent: true,
  },
  {
    title: 'TikTok AI Video Creator',
    subtitle: 'Création vidéo IA — En cours',
    icon: Sparkles,
    problem: "Créer du contenu vidéo monétisable demande du temps et des compétences.",
    solution: "IA générant des vidéos complètes optimisées pour l'algorithme TikTok.",
    result: "En cours — Automatisation complète de la création de contenu.",
    tags: ['IA', 'VIDEO', 'PYTHON'],
    accent: false,
    inProgress: true,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            DEPLOYMENTS
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            PROJETS{' '}
            <span className="text-accent">&</span>{' '}
            CASE_STUDIES
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className={`group relative bg-card border border-primary/10 hover:border-primary/30 transition-all duration-300 ${
                  project.inProgress ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''
                }`}
              >
                {project.inProgress && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-accent/10 border-b border-l border-accent/20 text-accent text-[10px] tracking-widest">
                    IN_PROGRESS
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 border ${project.accent ? 'border-accent/30 text-accent' : 'border-primary/30 text-primary'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold tracking-tight">{project.title}</h3>
                      <p className="text-[10px] text-foreground/40 tracking-widest">{project.subtitle.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 text-xs normal-case">
                    <div>
                      <span className="text-[10px] text-primary tracking-widest">&gt; PROBLÈME</span>
                      <p className="text-foreground/60 mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-accent tracking-widest">&gt; SOLUTION</span>
                      <p className="text-foreground/60 mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-primary tracking-widest">&gt; RÉSULTAT</span>
                      <p className="text-foreground/60 mt-1">{project.result}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 border border-foreground/10 text-foreground/50 tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-primary transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

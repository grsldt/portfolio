import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Langages & Frameworks',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'PHP', 'SQL', 'Java', 'Bash'],
  },
  {
    title: 'Spécialités',
    skills: ['Web Scraping', 'Bots & Automatisation', 'IA / NLP', 'API REST', 'SEO', 'E-commerce'],
  },
  {
    title: 'Outils & Infra',
    skills: ['Git / GitHub', 'VS Code', 'Linux / Ubuntu', 'Docker', 'Discord API', 'CMS'],
  },
  {
    title: 'Soft Skills',
    skills: ['Autonomie', 'Communication', 'Gestion de projet', 'Adaptabilité', 'Pédagogie'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Stack <span className="text-gradient">Technique</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Les technologies que j'utilise au quotidien pour livrer des projets solides.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-4 text-gradient">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

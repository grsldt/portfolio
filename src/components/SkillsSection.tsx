import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Langages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'PHP', 'SQL', 'HTML/CSS', 'Bash'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'Flask', 'Express', 'Three.js'],
  },
  {
    title: 'Spécialités',
    skills: ['Web Scraping', 'Bots', 'IA / NLP', 'Cybersécurité', 'API REST', 'SEO'],
  },
  {
    title: 'Infrastructure',
    skills: ['Git', 'Linux', 'Docker', 'Supabase', 'Firebase', 'Vercel', 'Netlify'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-primary text-sm font-medium mb-3">Technologies</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Stack technique
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="px-5 py-3 border-b border-border">
                <h3 className="text-sm font-heading font-bold text-primary">{cat.title}</h3>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
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

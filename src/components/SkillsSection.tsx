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
          <p className="text-primary text-xs font-mono tracking-widest mb-4">// STACK</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Technologies
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
              className="terminal-card hover:border-primary/30 transition-colors overflow-hidden"
            >
              <div className="terminal-bar">
                <span className="size-1.5 bg-primary animate-pulse" />
                <span>{cat.title.toLowerCase()}.module</span>
                <span className="ml-auto text-foreground/15">{String(catIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
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

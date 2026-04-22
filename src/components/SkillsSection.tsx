import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'LANGAGES',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'PHP', 'SQL', 'HTML/CSS', 'Bash', 'Lua'],
  },
  {
    title: 'FRAMEWORKS',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'Flask', 'Express', 'Three.js', 'Framer Motion'],
  },
  {
    title: 'SPÉCIALITÉS',
    skills: ['Web Scraping', 'Bots', 'IA / NLP', 'Cybersécurité', 'Pentest', 'API REST', 'SEO', 'E-commerce', 'RF / Hardware'],
  },
  {
    title: 'INFRA',
    skills: ['Git', 'Linux', 'Docker', 'Android Studio', 'Arduino IDE', 'VirtualBox', 'Supabase', 'Firebase', 'Netlify', 'Vercel', 'Discord API', 'Figma'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-primary text-xs tracking-widest flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            PROTOCOLS
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
            STACK{' '}
            <span className="text-accent">TECHNIQUE</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <div className="border-b border-primary/10 px-4 py-3 flex items-center justify-between">
                <h3 className="text-xs text-primary tracking-widest font-bold">{cat.title}</h3>
                <span className="text-[10px] text-foreground/20">{String(catIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.08 + i * 0.02 }}
                    className="text-[11px] px-2.5 py-1 border border-foreground/10 text-foreground/60 hover:border-primary/40 hover:text-primary transition-colors cursor-default normal-case"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

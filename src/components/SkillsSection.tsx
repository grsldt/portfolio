import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Langages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'PHP', 'SQL', 'HTML/CSS', 'Bash', 'Lua'],
  },
  {
    title: 'Frameworks & Libs',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'Flask', 'Express', 'Three.js', 'Framer Motion'],
  },
  {
    title: 'Spécialités',
    skills: ['Web Scraping', 'Bots & Automatisation', 'IA / NLP', 'Cybersécurité', 'Pentest', 'API REST', 'SEO', 'E-commerce', 'RF / Hardware'],
  },
  {
    title: 'Outils & Infra',
    skills: ['Git / GitHub', 'VS Code', 'Linux / Ubuntu', 'Docker', 'Android Studio', 'Arduino IDE', 'VirtualBox', 'Supabase', 'Firebase', 'Netlify', 'Vercel', 'Discord API', 'CMS', 'Figma'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowX = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax glow */}
      <motion.div
        style={{ x: glowX }}
        className="absolute top-1/3 left-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto relative z-10">
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
            Les technologies et outils que j'utilise au quotidien pour livrer des projets solides.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-xl p-6 group"
            >
              <h3 className="font-heading text-lg font-semibold mb-4 text-gradient">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + i * 0.03 }}
                    className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
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

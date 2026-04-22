import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary glow orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]"
        animate={{
          x: ['-10%', '5%', '-10%'],
          y: ['-5%', '10%', '-5%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '20%' }}
      />
      {/* Accent glow orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/6 blur-[140px]"
        animate={{
          x: ['5%', '-8%', '5%'],
          y: ['8%', '-5%', '8%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '15%' }}
      />
      {/* Small subtle orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/4 blur-[120px]"
        animate={{
          x: ['-5%', '10%', '-5%'],
          y: ['5%', '-10%', '5%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '50%', left: '60%' }}
      />
      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

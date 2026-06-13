// resources/js/Components/Sections/Stats.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/Components/UI/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  {
    value: 200,
    suffix: '+',
    label: 'Companies Transformed',
    description: 'From seed-stage startups to Fortune 500 enterprises',
    color: 'from-primary to-secondary',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Measured via post-project NPS surveys',
    color: 'from-accent to-primary',
  },
  {
    value: 340,
    suffix: '+',
    label: 'AI Models Shipped',
    description: 'Production-ready models across every vertical',
    color: 'from-secondary to-accent',
  },
  {
    value: 4.8,
    suffix: '×',
    decimals: 1,
    label: 'Average ROI Delivered',
    description: 'Measured within 12 months of launch',
    color: 'from-primary to-accent',
  },
  {
    value: 99.97,
    suffix: '%',
    decimals: 2,
    label: 'Uptime Guaranteed',
    description: 'Across all production deployments in 2024',
    color: 'from-accent to-secondary',
  },
  {
    value: 42,
    suffix: 'ms',
    label: 'Avg. API Response Time',
    description: 'P95 latency across our client portfolio',
    color: 'from-secondary to-primary',
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="stats"
      ref={ref}
      className="py-24 relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            By the Numbers
          </span>
          <h2
            id="stats-heading"
            className="text-4xl font-bold text-white"
          >
            Results That{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Speak for Themselves
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mt-3">
            Every metric below is pulled from real client data — not marketing estimates.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden group hover:border-white/20 transition-colors duration-300"
            >
              {/* Subtle gradient bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(99,102,241,0.08), transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* Gradient line at top */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${stat.color} opacity-60`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Animated counter */}
                <div
                  className={`font-display font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
                  aria-label={`${stat.value}${stat.suffix}`}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    isInView={isInView}
                  />
                </div>

                <h3 className="font-display font-semibold text-white text-lg mb-1">
                  {stat.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

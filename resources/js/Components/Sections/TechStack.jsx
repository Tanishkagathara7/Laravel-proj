// resources/js/Components/Sections/TechStack.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Motion variants ────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Tech data — 3 categories (fix #10) ────────────────────────
const techCategories = [
  {
    label: 'Frontend',
    dotColor: 'bg-indigo-400',
    techs: [
      'React 19', 'Next.js', 'TypeScript', 'Tailwind CSS',
      'Framer Motion', 'GraphQL', 'Zustand', 'Radix UI',
    ],
  },
  {
    label: 'Backend',
    dotColor: 'bg-purple-400',
    techs: [
      'Laravel 12', 'Node.js', 'FastAPI', 'Django',
      'tRPC', 'gRPC', 'WebSockets', 'Redis',
    ],
  },
  {
    label: 'DevOps',
    dotColor: 'bg-cyan-400',
    techs: [
      'AWS', 'GCP', 'Kubernetes', 'Terraform',
      'Docker', 'ArgoCD', 'Datadog', 'GitHub Actions',
    ],
  },
];

// ── Pill component ─────────────────────────────────────────────
function TechPill({ name, dotColor }) {
  return (
    <motion.li
      variants={rowVariants}
      className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg
                 px-4 py-2 text-sm text-slate-300 cursor-default
                 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-white
                 transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} aria-hidden="true" />
      {name}
    </motion.li>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="tech"
      ref={ref}
      className="py-24 bg-[#0F172A]"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 3-layer header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              ✦ Our Stack
            </span>
          </div>
          <h2 id="tech-heading" className="text-4xl md:text-5xl font-bold text-white text-center">
            Best-in-Class{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Technology
            </span>
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mt-4">
            We're technology-agnostic but opinionated — we choose the right tool for each job
            and we know these tools deeply.
          </p>
        </motion.div>

        {/* ── 3 category columns (fix #10) ── */}
        <div className="grid md:grid-cols-3 gap-10">
          {techCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            >
              {/* Category label */}
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 font-medium">
                {cat.label}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5 mb-4" aria-hidden="true" />

              {/* Pills */}
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex flex-col gap-2"
                role="list"
                aria-label={`${cat.label} technologies`}
              >
                {cat.techs.map((tech) => (
                  <TechPill key={tech} name={tech} dotColor={cat.dotColor} />
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          Already have a preferred stack? We adapt to your existing infrastructure.{' '}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-indigo-400 hover:text-white transition-colors underline underline-offset-2
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Let's talk
          </a>
        </motion.p>
      </div>
    </section>
  );
}

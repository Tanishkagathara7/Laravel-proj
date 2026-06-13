// resources/js/Components/Sections/Portfolio.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ── Motion variants ────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Data ───────────────────────────────────────────────────────
const categories = ['All', 'AI / ML', 'SaaS', 'Data', 'Mobile'];

const projects = [
  {
    title: 'PulsePredict',
    category: 'AI / ML',
    description: 'Real-time churn prediction engine that reduced customer churn by 34% in Q1.',
    tags: ['PyTorch', 'Kafka', 'React', 'AWS'],
    gradient: 'from-indigo-900 via-purple-900 to-indigo-800',
    accentFrom: 'from-indigo-500',
    accentTo: 'to-purple-600',
  },
  {
    title: 'LexaLegal AI',
    category: 'SaaS',
    description: 'Contract review SaaS using fine-tuned GPT-4, delivering 10× faster legal review.',
    tags: ['LangChain', 'GPT-4', 'Next.js', 'Postgres'],
    gradient: 'from-cyan-900 via-indigo-900 to-purple-900',
    accentFrom: 'from-cyan-500',
    accentTo: 'to-indigo-600',
  },
  {
    title: 'FlowOps Platform',
    category: 'SaaS',
    description: 'Enterprise workflow automation that replaced 12 legacy tools, saving $8M/year.',
    tags: ['React', 'Node.js', 'Redis', 'GCP'],
    gradient: 'from-purple-900 via-violet-900 to-indigo-900',
    accentFrom: 'from-purple-500',
    accentTo: 'to-violet-600',
  },
  {
    title: 'DataNova Warehouse',
    category: 'Data',
    description: 'Modern data warehouse on 500TB+ of transactions — query time cut from 2s to 80ms.',
    tags: ['dbt', 'BigQuery', 'Airflow', 'Looker'],
    gradient: 'from-indigo-900 via-blue-900 to-cyan-900',
    accentFrom: 'from-indigo-500',
    accentTo: 'to-cyan-500',
  },
  {
    title: 'VisionGuard',
    category: 'AI / ML',
    description: 'Computer vision safety system for manufacturing with 99.2% PPE detection accuracy.',
    tags: ['YOLO', 'OpenCV', 'FastAPI', 'Edge AI'],
    gradient: 'from-teal-900 via-cyan-900 to-indigo-900',
    accentFrom: 'from-teal-500',
    accentTo: 'to-cyan-600',
  },
  {
    title: 'NomadPay',
    category: 'Mobile',
    description: 'Cross-border payments app processing $40M/month across 80 currencies.',
    tags: ['React Native', 'Stripe', 'Node.js', 'PostgreSQL'],
    gradient: 'from-violet-900 via-purple-900 to-pink-900',
    accentFrom: 'from-violet-500',
    accentTo: 'to-pink-600',
  },
];

// ── Project card (fix #8) ──────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]
                 hover:border-indigo-500/30 transition-colors duration-300"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      aria-labelledby={`proj-${project.title}`}
    >
      {/* ── Image area with gradient placeholder + hover overlay ── */}
      <div className="relative h-48 rounded-xl overflow-hidden mx-3 mt-3">
        {/* Gradient placeholder */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} aria-hidden="true" />

        {/* Decorative noise / shimmer on placeholder */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          }}
          aria-hidden="true"
        />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <motion.button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-white text-[#0F172A] font-semibold text-sm
                           hover:bg-slate-100 transition-colors"
                initial={{ scale: 0.85, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 8 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge on image */}
        <div className="absolute top-3 left-3 z-[5]">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold text-white
                        bg-gradient-to-r ${project.accentFrom} ${project.accentTo} shadow`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Below-image content ── */}
      <div className="px-5 py-4">
        <h3
          id={`proj-${project.title}`}
          className="font-semibold text-white text-base mb-1 truncate"
        >
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-snug mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full
                         bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 bg-[#0F172A]"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 3-layer header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              ✦ Our Work
            </span>
          </div>
          <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-bold text-white text-center">
            Projects That{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Redefine Industries
            </span>
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mt-4">
            A curated selection of work we're most proud of. Every project shipped on time and on budget.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeFilter === cat
                  ? 'bg-indigo-500 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-4">Ready to be our next success story?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                       bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold
                       hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-shadow
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Start a Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

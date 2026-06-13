// resources/js/Components/Sections/Features.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  Lock,
  RefreshCw,
  Globe,
  GitBranch,
  HeartHandshake,
} from 'lucide-react';

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

// ── Feature data ───────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: 'Rapid Iteration Cycles',
    description:
      '2-week sprints with live staging deployments. You see real progress every day, not every quarter.',
  },
  {
    icon: Lock,
    title: 'Security by Design',
    description:
      'OWASP Top 10 compliance baked into every layer. Encryption at rest and in transit with zero-trust architecture.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Delivery',
    description:
      'Automated CI/CD pipelines push features live in minutes, not days. One-click rollback when you need it.',
  },
  {
    icon: Globe,
    title: 'Global Scale Architecture',
    description:
      'Multi-region deployments with sub-100ms latency worldwide, engineered to handle 10M+ concurrent users.',
  },
  {
    icon: GitBranch,
    title: 'Transparent Collaboration',
    description:
      'Full GitHub access, weekly syncs, and a dedicated Slack channel. You\'re never kept in the dark.',
  },
  {
    icon: HeartHandshake,
    title: 'Post-Launch Partnership',
    description:
      '90-day warranty on all delivered code. SLA-backed support tiers. We ship and we stand behind it.',
  },
];

// ── Feature card (fix #7) ──────────────────────────────────────
function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <motion.article
      variants={cardVariants}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                 hover:border-indigo-500/50 transition-all duration-300 cursor-default"
      whileHover={{ y: -4 }}
    >
      {/* 48px gradient icon container */}
      <div
        className="inline-flex items-center justify-center w-12 h-12
                   bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 mb-5"
        aria-hidden="true"
      >
        <Icon className="w-full h-full text-white" />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.article>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 bg-[#0F172A]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 3-layer header (fix #3) ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          {/* Layer 1 — badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             bg-indigo-500/10 border border-indigo-500/20
                             text-indigo-400 text-sm font-medium">
              ✦ Why NexaAI
            </span>
          </div>

          {/* Layer 2 — heading */}
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Engineered for{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #06B6D4, #6366F1)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Excellence
            </span>
          </h2>

          {/* Layer 3 — subtitle */}
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mt-4">
            Our process is refined across hundreds of projects to deliver exceptional outcomes every
            time — without compromise on quality, security, or speed.
          </p>
        </motion.div>

        {/* ── 3-column icon card grid (fix #7) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10
                hover:border-indigo-500/50 hover:-translate-y-1
                transition-all duration-300 backdrop-blur-sm"
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br 
                from-indigo-500 to-purple-600 
                flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

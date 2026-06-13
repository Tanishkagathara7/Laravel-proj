// resources/js/Components/Sections/Services.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  Code2,
  BarChart3,
  Cloud,
  Shield,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Custom LLM integrations, RAG pipelines, computer vision models, and NLP systems tailored to your domain. We take you from prototype to production.',
    tags: ['GPT-4 / Claude', 'LangChain', 'RAG', 'Fine-tuning'],
    gradient: 'from-primary/20 to-secondary/20',
    iconColor: 'text-primary',
    borderColor: 'hover:border-primary/40',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Scalable web and API platforms built with modern stacks. We architect systems that grow with your business from day one.',
    tags: ['React', 'Laravel', 'Node.js', 'PostgreSQL'],
    gradient: 'from-accent/20 to-primary/20',
    iconColor: 'text-accent',
    borderColor: 'hover:border-accent/40',
  },
  {
    icon: BarChart3,
    title: 'Data Engineering & Analytics',
    description:
      'End-to-end data pipelines, real-time dashboards, and predictive analytics that turn raw data into strategic advantage.',
    tags: ['Spark', 'dbt', 'Tableau', 'BigQuery'],
    gradient: 'from-secondary/20 to-accent/20',
    iconColor: 'text-secondary',
    borderColor: 'hover:border-secondary/40',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & DevOps',
    description:
      'Zero-downtime deployments, auto-scaling Kubernetes clusters, and multi-cloud architectures with cost optimization built in.',
    tags: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
    gradient: 'from-primary/20 to-accent/20',
    iconColor: 'text-primary',
    borderColor: 'hover:border-primary/40',
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Compliance',
    description:
      'Security-first engineering, penetration testing, SOC 2 readiness, and compliance frameworks that protect your customers and your reputation.',
    tags: ['SOC 2', 'GDPR', 'Pen Testing', 'Zero Trust'],
    gradient: 'from-accent/20 to-secondary/20',
    iconColor: 'text-accent',
    borderColor: 'hover:border-accent/40',
  },
  {
    icon: Smartphone,
    title: 'Mobile & Cross-Platform Apps',
    description:
      'Native-quality iOS and Android apps with AI features baked in. Built with React Native for maximum velocity and code reuse.',
    tags: ['React Native', 'Expo', 'Swift', 'Kotlin'],
    gradient: 'from-secondary/20 to-primary/20',
    iconColor: 'text-secondary',
    borderColor: 'hover:border-secondary/40',
  },
];

function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={cardVariants}
      className={`group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] ${service.borderColor} transition-all duration-300 cursor-default overflow-hidden`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      aria-labelledby={`service-title-${index}`}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300`}
          aria-hidden="true"
        >
          <Icon className={`w-6 h-6 ${service.iconColor}`} />
        </div>

        {/* Title */}
        <h3
          id={`service-title-${index}`}
          className="font-display font-bold text-lg text-white mb-2"
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Learn more link */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-white transition-colors group/link focus:outline-none focus-visible:underline"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn more
          <ArrowRight
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 bg-[#111827] relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-primary/30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            What We Build
          </span>
          <h2
            id="services-heading"
            className="text-4xl font-bold text-white"
          >
            Services That{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Move Needles
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-3">
            We don't just write code — we architect competitive advantages. Every engagement is engineered to deliver measurable business outcomes.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {services.map((service, i) => (
            <div key={service.title} role="listitem">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

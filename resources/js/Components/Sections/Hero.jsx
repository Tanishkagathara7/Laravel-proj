// resources/js/Components/Sections/Hero.jsx
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Shield } from 'lucide-react';
import GlowButton from '@/Components/UI/GlowButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Floating stat card with y-axis loop animation
function StatCard({ icon: Icon, label, value, delay, className }) {
  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-3 px-4 py-3 rounded-2xl
        bg-white dark:bg-white/[0.07] backdrop-blur-md border border-slate-200 dark:border-white/10
        shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay, ease: 'backOut' },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
      aria-hidden="true"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="text-slate-900 dark:text-white font-bold text-sm leading-none">{value}</div>
        <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50 dark:bg-[#0F172A] pt-16 transition-colors duration-300"
      aria-label="Hero section"
    >
      {/* ── Radial glow (fix #5) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.30), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(500px circle at ${x}px ${y}px, rgba(99,102,241,0.10), transparent 60%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* ── Floating stat cards (fix #6) ── */}
      <StatCard
        icon={Rocket}
        label="Projects Delivered"
        value="200+"
        delay={1.0}
        className="top-[22%] right-[6%] md:right-[10%]"
      />
      <StatCard
        icon={Shield}
        label="Uptime Guarantee"
        value="99.97%"
        delay={1.4}
        className="bottom-[28%] right-[4%] md:right-[8%]"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              AI-Powered Software Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            Build Smarter.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Scale Faster.
            </span>
            {' '}Win Bigger.
          </motion.h1>

          {/* Subheadline — capped at 600px (fix #4) */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-[600px] mx-auto"
          >
            NexaAI engineers AI-native software that transforms how businesses operate — from intelligent
            automation and predictive analytics to custom LLM integrations and full-stack SaaS platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-14">
            <GlowButton
              href="#contact"
              onClick={scrollTo('#contact')}
              variant="primary"
              size="lg"
              aria-label="Start your project with NexaAI"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </GlowButton>

            <motion.a
              href="#portfolio"
              onClick={scrollTo('#portfolio')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white font-semibold text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex -space-x-2" aria-hidden="true">
              {['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0F172A]"
                  style={{ background: color, zIndex: 5 - i }}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-slate-400 text-xs">
                Trusted by <span className="text-slate-900 dark:text-white font-semibold">200+ companies</span> worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-indigo-500/60 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

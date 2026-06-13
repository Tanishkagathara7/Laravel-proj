// resources/js/Components/Sections/Testimonials.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// ── Motion variants ────────────────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ── Data ───────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, Meridian Health',
    avatar: 'SC',
    stars: 5,
    quote:
      "NexaAI didn't just build us a product — they gave us a competitive advantage we didn't know was possible. Our AI-powered diagnostic tool went live in 14 weeks and immediately reduced misdiagnosis rates by 22%.",
  },
  {
    name: 'Marcus Webb',
    role: 'VP Engineering, TradeSpark',
    avatar: 'MW',
    stars: 5,
    quote:
      "We'd tried two other agencies before NexaAI. The difference was night and day — not just technically, but in how they communicate and own the outcome. Our platform now processes $2B in monthly volume.",
  },
  {
    name: 'Priya Nair',
    role: 'Founder & CEO, LegalFlow',
    avatar: 'PN',
    stars: 5,
    quote:
      "The LLM pipeline NexaAI built processes 50,000 contracts per day with 98.7% accuracy. We went from Series A to Series B in 8 months largely because of the technical moat they helped us build.",
  },
  {
    name: 'David Okafor',
    role: 'Head of Data, RetailNation',
    avatar: 'DO',
    stars: 5,
    quote:
      "Our data warehouse had 6-hour query times and constant downtime. NexaAI rebuilt everything in 10 weeks. Now we run real-time analytics on 500TB with 80ms queries. ROI was evident within the first month.",
  },
  {
    name: 'Elena Rodriguez',
    role: 'COO, FleetMax Logistics',
    avatar: 'ER',
    stars: 5,
    quote:
      "We automated 73% of our manual workflows in a single engagement. NexaAI has a rare combination of deep AI expertise and an intuitive understanding of how real-world operations work.",
  },
];

// ── Star rating ────────────────────────────────────────────────
function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
      ))}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 bg-white dark:bg-[#111827] transition-colors duration-300"
      aria-labelledby="testimonials-heading"
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
              ✦ Client Stories
            </span>
          </div>
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center">
            Trusted by{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Industry Leaders
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mt-4">
            Don't take our word for it — hear directly from the teams we've partnered with.
          </p>
        </motion.div>

        {/* ── Testimonial carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative max-w-3xl mx-auto mt-16" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="p-8 md:p-10 rounded-3xl bg-slate-50 shadow-sm dark:shadow-none dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Opening quote mark */}
                <div className="text-7xl text-indigo-500 font-serif leading-none mb-2 -mt-2">"</div>

                {/* Quote text */}
                <p className="text-slate-700 dark:text-slate-300 text-xl italic leading-relaxed mb-8">
                  {testimonials[current].quote}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      {testimonials[current].name}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next arrows */}
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={prev} 
                className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-white" />
              </button>
              <button onClick={next}
                className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-white" />
              </button>
            </div>
          </div>

          {/* Company logos strip */}
          <div className="mt-16">
            <p className="text-center text-slate-500 dark:text-slate-500 text-sm mb-6 uppercase tracking-widest">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {['Meridian Health', 'TradeSpark', 'LegalFlow', 'RetailNation', 'FleetMax'].map((co) => (
                <motion.span
                  key={co}
                  className="text-slate-400 dark:text-slate-600 font-bold text-sm tracking-wide hover:text-slate-600 dark:hover:text-slate-400 transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  {co}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      className="py-24 bg-[#111827]"
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-indigo-500/10 border border-indigo-500/20
                           text-indigo-400 text-sm font-medium mb-4">
            Client Stories
          </span>
          <h2 id="testimonials-heading" className="text-4xl font-bold text-white">
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
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-3">
            Don't take our word for it — hear directly from the teams we've partnered with.
          </p>
        </motion.div>

        {/* ── Testimonial carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-3xl mx-auto" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset }) => {
                  if (offset.x < -50) next();
                  else if (offset.x > 50) prev();
                }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 cursor-grab active:cursor-grabbing select-none"
                aria-label={`Testimonial ${current + 1} of ${testimonials.length}`}
              >
                {/* Opening quote mark (fix #9) */}
                <div
                  className="text-6xl text-indigo-500 font-serif leading-none mb-4"
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Quote text */}
                <blockquote className="text-slate-300 text-lg italic leading-relaxed mb-8">
                  {t.quote}
                </blockquote>

                {/* Bottom row: avatar + name/role + stars */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                                 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      aria-hidden="true"
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-slate-400 text-sm">{t.role}</div>
                    </div>
                  </div>
                  <StarRating count={t.stars} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Prev / Next arrows + dots (fix #9) ── */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                           flex items-center justify-center text-slate-400
                           hover:text-white hover:bg-white/10 transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      i === current ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                           flex items-center justify-center text-slate-400
                           hover:text-white hover:bg-white/10 transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Company logos strip */}
          <div className="mt-16">
            <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {['Meridian Health', 'TradeSpark', 'LegalFlow', 'RetailNation', 'FleetMax'].map((co) => (
                <motion.span
                  key={co}
                  className="text-slate-600 font-bold text-sm tracking-wide hover:text-slate-400 transition-colors cursor-default"
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

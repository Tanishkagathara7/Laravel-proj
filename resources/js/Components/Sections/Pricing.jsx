// resources/js/Components/Sections/Pricing.jsx
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

// ── Motion variants ────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

// ── Plans ──────────────────────────────────────────────────────
const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for MVPs & proof of concepts',
    monthlyPrice: 8500,
    annualPrice: 7225,
    popular: false,
    features: [
      'Up to 2 developers assigned',
      '1 product / service scope',
      'Weekly sprint reviews',
      'Standard CI/CD setup',
      'Basic AI integration (API-based)',
      'Slack channel access',
      '30-day code warranty',
      'Documentation included',
    ],
    cta: 'Start With Starter',
  },
  {
    name: 'Growth',
    tagline: 'For scaling products with real traction',
    monthlyPrice: 19500,
    annualPrice: 16575,
    popular: true,          // ← featured card (fix #11)
    features: [
      'Up to 5 developers assigned',
      'Multi-product / service scope',
      'Daily standups available',
      'Full DevOps & infrastructure',
      'Custom ML model development',
      'Priority Slack + video calls',
      '90-day code warranty',
      'Architecture consultation',
      'Performance monitoring setup',
      'Security audit included',
    ],
    cta: 'Start With Growth',
  },
  {
    name: 'Enterprise',
    tagline: 'White-glove service for complex needs',
    monthlyPrice: null,
    annualPrice: null,
    popular: false,
    features: [
      'Dedicated engineering team (8+)',
      'Unlimited project scope',
      'Embedded team model',
      'Multi-cloud architecture',
      'Full AI/ML platform build-out',
      'CTO-level advisory',
      '12-month SLA warranty',
      'Compliance & security hardening',
      'Custom SLA & response times',
      'On-site workshops available',
    ],
    cta: 'Contact for Pricing',
  },
];

// ── Card ───────────────────────────────────────────────────────
function PricingCard({ plan, isAnnual }) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.div
      variants={cardVariants}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        plan.popular
          ? 'border-2 border-indigo-500 scale-105 shadow-[0_0_60px_rgba(99,102,241,0.25)] bg-gradient-to-b from-indigo-500/5 to-transparent'
          : 'border border-white/10 bg-white/[0.02]'
      }`}
      aria-label={`${plan.name} plan${plan.popular ? ', most popular' : ''}`}
    >
      {/* Most Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600
                           text-white text-xs font-bold px-5 py-1.5 rounded-full
                           whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex flex-col h-full p-7 pt-5">
        {/* Plan name */}
        <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
        <p className="text-slate-400 text-sm mb-6">{plan.tagline}</p>

        {/* Price */}
        <div className="mb-6">
          {price !== null ? (
            <div className="flex items-end gap-1">
              <span
                className={`font-display font-bold text-4xl sm:text-5xl ${
                  plan.popular
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'
                    : 'text-white'
                }`}
              >
                ${price.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm mb-2">/mo</span>
            </div>
          ) : (
            <div className="font-display font-bold text-4xl text-white">Custom</div>
          )}
          {isAnnual && price !== null && (
            <p className="text-green-400 text-xs mt-1">
              Save ${((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString()}/year
            </p>
          )}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-full text-center py-3 px-6 rounded-xl font-semibold text-sm mb-8
                      transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            plan.popular
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]'
              : 'border border-white/20 text-white hover:bg-white/5'
          }`}
          aria-label={`${plan.cta} — ${plan.name} plan`}
        >
          {plan.cta}
        </a>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-6" aria-hidden="true" />

        {/* Features */}
        <ul className="space-y-3 flex-1" role="list">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-green-400'}`}
                aria-hidden="true"
              />
              <span className="text-slate-300 text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 bg-[#111827]"
      aria-labelledby="pricing-heading"
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
              ✦ Transparent Pricing
            </span>
          </div>
          <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold text-white text-center">
            Invest in{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Outcomes, Not Hours
            </span>
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mt-4 mb-8">
            No hidden fees. No scope creep surprises. Fixed monthly engagements with clear deliverables.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              aria-pressed={!isAnnual}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                !isAnnual ? 'bg-white text-[#0F172A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              aria-pressed={isAnnual}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isAnnual ? 'bg-white text-[#0F172A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded bg-green-400/20 text-green-400 text-xs font-bold">
                -15%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards — use items-stretch so popular card's scale-105 doesn't clip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 items-start pt-4"
          role="list"
          aria-label="Pricing plans"
        >
          {plans.map((plan) => (
            <div key={plan.name} role="listitem">
              <PricingCard plan={plan} isAnnual={isAnnual} />
            </div>
          ))}
        </motion.div>

        {/* Risk-free note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">14-day risk-free start</div>
              <div className="text-slate-400 text-xs">Not happy in the first two weeks? You pay nothing.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

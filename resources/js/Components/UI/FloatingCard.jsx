// resources/js/Components/UI/FloatingCard.jsx
import { motion } from 'framer-motion';

/**
 * FloatingCard — a glassmorphism stat card that loops on the y-axis.
 *
 * Props:
 *   card {object}:
 *     id        {number}
 *     icon      {React component} - Lucide icon
 *     label     {string}          - Metric label
 *     value     {string}          - Metric value
 *     color     {string}          - Tailwind gradient classes for card background
 *     border    {string}          - Tailwind border class
 *     delay     {number}          - Animation start delay (seconds)
 *     position  {string}          - Tailwind positioning classes
 */
export default function FloatingCard({ card }) {
  const Icon = card.icon;

  return (
    <motion.div
      className={`absolute ${card.position}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -14, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: card.delay + 0.4 },
        scale: { duration: 0.6, delay: card.delay + 0.4, ease: 'backOut' },
        y: {
          duration: 4 + card.delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: card.delay,
          // Offset each card so they don't all peak at the same time
          repeatDelay: 0,
        },
      }}
      aria-hidden="true"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm bg-gradient-to-br ${card.color} border ${card.border} shadow-[0_8px_32px_rgba(0,0,0,0.3)] whitespace-nowrap`}
      >
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-white" />
        </div>

        {/* Text */}
        <div>
          <div className="text-white font-bold text-sm leading-none mb-0.5">
            {card.value}
          </div>
          <div className="text-white/60 text-xs leading-none">{card.label}</div>
        </div>
      </div>
    </motion.div>
  );
}

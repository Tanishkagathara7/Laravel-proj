// resources/js/Components/UI/GlowButton.jsx
import { motion } from 'framer-motion';

/**
 * GlowButton — a button/link with animated glow pulse on hover.
 *
 * Props:
 *   href      {string}   If provided, renders an <a> tag.
 *   onClick   {function} Click handler.
 *   variant   {'primary'|'secondary'|'outline'|'ghost'}
 *   size      {'sm'|'md'|'lg'}
 *   disabled  {boolean}
 *   children  React children (text + icons)
 *   className {string}   Extra classes to merge.
 */

const VARIANTS = {
  primary: {
    base: 'bg-gradient-to-r from-primary to-secondary text-white border-transparent',
    glow: 'rgba(99,102,241,0.6)',
    glowFull: '0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.25)',
  },
  secondary: {
    base: 'bg-gradient-to-r from-secondary to-accent text-white border-transparent',
    glow: 'rgba(139,92,246,0.6)',
    glowFull: '0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.25)',
  },
  outline: {
    base: 'bg-transparent text-white border border-white/20 hover:bg-white/5',
    glow: 'rgba(99,102,241,0.3)',
    glowFull: '0 0 20px rgba(99,102,241,0.3)',
  },
  ghost: {
    base: 'bg-transparent text-primary border-transparent hover:bg-primary/10',
    glow: 'rgba(99,102,241,0.2)',
    glowFull: '0 0 15px rgba(99,102,241,0.2)',
  },
};

const SIZES = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-sm rounded-xl',
};

// Glow keyframes animation using framer-motion
const glowVariants = {
  initial: { boxShadow: '0 0 0px rgba(99,102,241,0)' },
  hover: (v) => ({
    boxShadow: [
      `0 0 20px ${v.glow}`,
      v.glowFull,
      `0 0 20px ${v.glow}`,
    ],
    transition: {
      boxShadow: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }),
};

export default function GlowButton({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const variantStyles = VARIANTS[variant] ?? VARIANTS.primary;
  const sizeStyles = SIZES[size] ?? SIZES.md;

  const baseClasses = [
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles.base,
    sizeStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const motionProps = {
    variants: glowVariants,
    initial: 'initial',
    whileHover: disabled ? undefined : 'hover',
    whileTap: disabled ? undefined : { scale: 0.97 },
    custom: variantStyles,
  };

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={baseClasses}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

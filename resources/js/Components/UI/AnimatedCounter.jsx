// resources/js/Components/UI/AnimatedCounter.jsx
import { useEffect, useRef, useState } from 'react';
import { useSpring, motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * AnimatedCounter — smoothly counts up to a target number when triggered.
 *
 * Props:
 *   target    {number}  The final numeric value to count to.
 *   suffix    {string}  Text appended after the number (e.g. '+', '%', '×').
 *   decimals  {number}  How many decimal places to show (default: 0).
 *   duration  {number}  Animation duration in seconds (default: 2).
 *   isInView  {boolean} Triggers animation when true.
 */
export default function AnimatedCounter({
  target,
  suffix = '',
  decimals = 0,
  duration = 2,
  isInView = false,
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const startedRef = useRef(false);

  // Easing: ease-out-expo
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const durationMs = duration * 1000;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = easedProgress * target;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, target, duration]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <span aria-live="polite" aria-atomic="true">
      {formatted}{suffix}
    </span>
  );
}

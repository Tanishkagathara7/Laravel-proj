// resources/js/Components/Layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Tech', href: '#tech' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const navVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  hidden: { y: -100, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeIn' } },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = lastScrollY.current;
    if (current > previous && current > 80) {
      setIsVisible(false);
      setMobileOpen(false);
    } else {
      setIsVisible(true);
    }
    setIsScrolled(current > 20);
    lastScrollY.current = current;
  });

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={navVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="NexaAI Home"
        >
          <motion.div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </motion.div>
          <span className="font-display font-bold text-xl text-white">
            Nexa<span className="text-primary">AI</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-nexa-gray-300 hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                whileHover={{ color: '#ffffff' }}
              >
                <motion.span
                  className="absolute inset-0 rounded-lg bg-white/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 24px rgba(99,102,241,0.6)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Get Started
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-nexa-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden bg-[#111827]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="px-4 py-4 space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block px-4 py-3 rounded-lg text-nexa-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

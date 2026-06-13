// resources/js/Components/Layout/Footer.jsx
import { motion } from 'framer-motion';
import { Zap, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'AI & Machine Learning', href: '#services' },
    { label: 'Full-Stack Development', href: '#services' },
    { label: 'Data Engineering', href: '#services' },
    { label: 'Cloud & DevOps', href: '#services' },
    { label: 'Mobile Development', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Resources: [
    { label: 'Case Studies', href: '#' },
    { label: 'AI Readiness Guide', href: '#' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socials = [
  { icon: Twitter, label: 'NexaAI on Twitter', href: '#' },
  { icon: Linkedin, label: 'NexaAI on LinkedIn', href: '#' },
  { icon: Github, label: 'NexaAI on GitHub', href: '#' },
];

const scrollTo = (e, href) => {
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0F1E] border-t border-white/5" role="contentinfo">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => scrollTo(e, '#hero')}
              className="inline-flex items-center gap-2 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="NexaAI Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Nexa<span className="text-primary">AI</span>
              </span>
            </a>

            <p className="text-nexa-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              We build AI-powered software that gives businesses an unfair competitive advantage. Trusted by 200+ companies worldwide.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-nexa-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/5 border border-green-400/20">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="text-green-400 text-xs font-medium">All systems operational</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="text-nexa-gray-400 text-sm hover:text-white transition-colors focus:outline-none focus-visible:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-1">
                Ready to build with AI?
              </h3>
              <p className="text-nexa-gray-400 text-sm">
                Get a custom proposal in 48 hours — no commitment required.
              </p>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 24px rgba(99,102,241,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
              aria-label="Start a project with NexaAI"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-nexa-gray-600 text-xs">
            © {currentYear} NexaAI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-nexa-gray-600 text-xs hover:text-nexa-gray-400 transition-colors focus:outline-none focus-visible:underline"
            >
              Privacy Policy
            </a>
            <span className="text-nexa-gray-700 text-xs" aria-hidden="true">·</span>
            <a
              href="#"
              className="text-nexa-gray-600 text-xs hover:text-nexa-gray-400 transition-colors focus:outline-none focus-visible:underline"
            >
              Terms of Service
            </a>
            <span className="text-nexa-gray-700 text-xs" aria-hidden="true">·</span>
            <a
              href="#"
              className="text-nexa-gray-600 text-xs hover:text-nexa-gray-400 transition-colors focus:outline-none focus-visible:underline"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

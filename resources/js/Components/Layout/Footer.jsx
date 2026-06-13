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
    <footer className="bg-[#0A0F1E] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-white mb-3">NexaAI</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building future-ready digital products with AI.
            </p>
            {/* Social icons row */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2-4: Link groups */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} NexaAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

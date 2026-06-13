// resources/js/Components/Sections/Contact.jsx
import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm, usePage } from '@inertiajs/react';
import {
  Mail,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  Loader2,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@nexaai.dev',
    href: 'mailto:hello@nexaai.dev',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (415) 555-0192',
    href: 'tel:+14155550192',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'San Francisco, CA (Remote-First)',
    href: null,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

function InputField({ id, label, icon: Icon, error, required, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        {label}
        {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <Icon className={`w-4 h-4 ${error ? 'text-red-400' : 'text-slate-500'}`} />
        </div>
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <span aria-hidden="true">⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { props } = usePage();
  const flashSuccess = props.flash?.success;

  const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => reset(),
      preserveScroll: true,
    });
  };

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border text-white placeholder-slate-600 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white/[0.05] ${
      errors[field]
        ? 'border-red-500/50 focus:ring-red-500/30'
        : 'border-white/[0.08] focus:ring-indigo-500/30 focus:border-indigo-500/40'
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 relative bg-[#0F172A]"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.06), transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.06), transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="text-4xl font-bold text-white mb-4"
          >
            Let's Build{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 4s ease infinite',
              }}
            >
              Something Great
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mt-3">
            Ready to transform your business with AI? Tell us about your project and we'll get back to you within 4 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-6"
          >
            {/* Left column heading */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-2">Let's build something great</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Tell us about your project and we'll craft a tailored proposal within 48 hours.</p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-white/5" aria-hidden="true" />
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${info.bg} border ${info.border} flex items-center justify-center flex-shrink-0`}
                    aria-hidden="true"
                  >
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-medium mb-0.5 uppercase tracking-wider">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white font-medium hover:text-indigo-400 transition-colors focus:outline-none focus-visible:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-white font-medium">{info.value}</div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Divider */}
            <motion.div variants={itemVariants} className="h-px bg-white/5" aria-hidden="true" />

            {/* Why contact us box */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="font-display font-semibold text-white mb-3 text-sm">
                What happens next?
              </h3>
              <ol className="space-y-3">
                {[
                  'We review your message within 4 hours',
                  'A senior engineer schedules a discovery call',
                  'We send a custom proposal within 48 hours',
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 overflow-hidden max-w-2xl mx-auto shadow-2xl">
              {/* Glow top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {/* Success state */}
                {(wasSuccessful || flashSuccess) ? (
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center text-center py-10"
                    role="status"
                    aria-live="polite"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, delay: 0.25 }}
                      >
                        <CheckCircle className="w-10 h-10 text-green-400" aria-hidden="true" />
                      </motion.div>
                    </motion.div>

                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Message Received!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      {flashSuccess || "Thank you for reaching out! A member of our team will get back to you within 4 business hours."}
                    </p>

                    <motion.button
                      onClick={() => window.location.reload()}
                      className="mt-8 inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:underline"
                      whileHover={{ x: 2 }}
                    >
                      Send another message
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="space-y-5"
                  >
                    {/* Name */}
                    <InputField
                      id="name"
                      label="Full Name"
                      icon={User}
                      error={errors.name}
                      required
                    >
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Jane Smith"
                        autoComplete="name"
                        required
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={inputClass('name')}
                      />
                    </InputField>

                    {/* Email */}
                    <InputField
                      id="email"
                      label="Email Address"
                      icon={Mail}
                      error={errors.email}
                      required
                    >
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="jane@company.com"
                        autoComplete="email"
                        required
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={inputClass('email')}
                      />
                    </InputField>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Tell Us About Your Project
                        <span className="text-indigo-400 ml-1" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 pointer-events-none" aria-hidden="true">
                          <MessageSquare
                            className={`w-4 h-4 ${errors.message ? 'text-red-400' : 'text-slate-500'}`}
                          />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={data.message}
                          onChange={(e) => setData('message', e.target.value)}
                          placeholder="Describe your project, goals, timeline, and any technical requirements..."
                          required
                          aria-required="true"
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          className={`${inputClass('message')} pl-11 resize-none`}
                        />
                      </div>
                      <div className="flex items-start justify-between mt-1.5">
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              id="message-error"
                              role="alert"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-400 flex items-center gap-1"
                            >
                              <span aria-hidden="true">⚠</span> {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <span
                          className={`text-xs ml-auto flex-shrink-0 ${
                            data.message.length > 900
                              ? 'text-red-400'
                              : data.message.length > 700
                              ? 'text-yellow-400'
                              : 'text-slate-600'
                          }`}
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {data.message.length}/1000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={processing}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                      whileHover={!processing ? { scale: 1.01, boxShadow: '0 0 30px rgba(99,102,241,0.5)' } : {}}
                      whileTap={!processing ? { scale: 0.99 } : {}}
                      aria-label={processing ? 'Sending your message...' : 'Send message'}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-slate-600 text-xs">
                      By submitting, you agree to our{' '}
                      <a href="#" className="text-slate-400 hover:text-white transition-colors underline underline-offset-2">
                        Privacy Policy
                      </a>
                      . We never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

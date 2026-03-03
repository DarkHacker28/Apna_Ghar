'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Home, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, Heart, Code2, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const footerLinks = {
  Explore: ['Browse All', 'Featured', 'Penthouses', 'Villas', 'Apartments', 'Studios'],
  Cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Goa'],
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
};

const socials = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <footer ref={ref} className="bg-charcoal-950 border-t border-gold-700/15 relative overflow-hidden pt-20 pb-0">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20"
              >
                <Home size={20} className="text-charcoal-950" />
              </motion.div>
              <div>
                <span className="font-serif text-2xl font-bold text-gold-gradient">Apna Ghar</span>
                <div className="text-[9px] text-gold-600/60 tracking-[0.2em] uppercase -mt-1">Premium Rentals</div>
              </div>
            </div>

            <p className="text-charcoal-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted premium rental platform. From Mumbai penthouses to Goa villas — your dream home awaits across India.
            </p>

            <div className="flex gap-3 mb-8">
              {socials.map(({ Icon, label }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-all duration-300 border border-white/5"
                  title={label}
                >
                  <Icon size={17} />
                </motion.button>
              ))}
            </div>

            <div>
              <p className="text-xs text-charcoal-400 font-semibold uppercase tracking-wider mb-2.5">Get New Listings</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-charcoal-800/80 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold-500/50 placeholder-charcoal-600 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold px-4 py-2 rounded-lg text-sm font-bold"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([heading, links], colIdx) => (
            <motion.div key={heading} variants={itemVariants}>
              <h4 className="font-serif text-charcoal-100 font-semibold mb-4 text-sm">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + colIdx * 0.1 + i * 0.04 }}
                  >
                    <Link
                      href="/properties"
                      className="text-charcoal-500 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { Icon: MapPin, text: 'Delhi, New Delhi — 1009', sub: 'Head Office' },
            { Icon: Phone, text: '+91 98716 10878', sub: 'Mon–Sat 9AM–7PM IST' },
            { Icon: Mail, text: 'hassu1402@gmail.com', sub: 'Reply within 2 hours' },
          ].map(({ Icon, text, sub }) => (
            <motion.div
              key={text}
              whileHover={{ y: -3, borderColor: 'rgba(212,168,67,0.4)' }}
              className="flex items-center gap-3 glass border border-white/5 rounded-xl px-4 py-3 transition-all duration-300"
            >
              <div className="w-9 h-9 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-gold-500" />
              </div>
              <div>
                <div className="text-charcoal-200 text-sm font-medium">{text}</div>
                <div className="text-charcoal-600 text-xs">{sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="divider-gold" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-charcoal-500 text-xs">© 2024 Apna Ghar. All rights reserved.</p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-gold-500/15 hover:border-gold-500/40 transition-all duration-300 cursor-default"
          >
            <Code2 size={13} className="text-gold-500" />
            <span className="text-xs text-charcoal-400">Made with</span>
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={12} className="text-red-400 fill-red-400" />
            </motion.span>
            <span className="text-xs text-charcoal-400">by</span>
            <span className="text-xs font-bold text-gold-gradient">Himanshu Singh</span>
          </motion.div>

          <div className="flex gap-5">
            {['Privacy Policy', 'Terms', 'Cookies'].map(item => (
              <Link key={item} href="#" className="text-charcoal-600 hover:text-gold-400 text-xs transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

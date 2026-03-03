'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Search, Star, ArrowRight, TrendingUp, Shield, Award, ChevronDown, MapPin, Building2, Users, Trophy } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFeatured } from '../store/propertySlice';
import { PropertyCard } from '../components/sections/PropertyCard';

const stats = [
  { value: '5,200+', label: 'Premium Listings', icon: Building2 },
  { value: '98%', label: 'Satisfaction Rate', icon: Trophy },
  { value: '12+', label: 'Cities Covered', icon: MapPin },
  { value: '50,000+', label: 'Happy Families', icon: Users },
];

const cities = [
  { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400', count: '1,240 homes' },
  { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400', count: '980 homes' },
  { name: 'Bengaluru', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400', count: '860 homes' },
  { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400', count: '520 homes' },
  { name: 'Pune', img: 'https://images.unsplash.com/photo-1612810806546-0b8c8c1a6ef4?w=400', count: '410 homes' },
  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400', count: '190 homes' },
];

const features = [
  { icon: Shield, title: 'Verified Listings', desc: 'Every property personally inspected and verified by our expert team across India.' },
  { icon: TrendingUp, title: 'Real-Time Pricing', desc: 'Live market data and neighbourhood analytics tailored to each Indian city.' },
  { icon: Award, title: 'White Glove Service', desc: 'Dedicated agents in every city providing concierge-level support, in your language.' },
];

const testimonials = [
  { name: 'Priya Sharma', city: 'Mumbai', text: 'Found my dream apartment in Bandra within a week. The whole experience was absolutely seamless!', rating: 5, avatar: 'P' },
  { name: 'Rahul Verma', city: 'Bengaluru', text: 'Apna Ghar made relocating for my IT job so easy. Got a stunning 3BHK in Indiranagar.', rating: 5, avatar: 'R' },
  { name: 'Ananya Iyer', city: 'Hyderabad', text: 'The villa in Jubilee Hills was beyond expectations. Top-notch service from start to finish!', rating: 5, avatar: 'A' },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {value}
    </motion.span>
  );
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { featured } = useAppSelector(s => s.properties);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    dispatch(fetchFeatured());
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: parallaxY, scale }} className="absolute inset-0 -top-20">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury Indian Home"
            fill className="object-cover object-center" priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/75 via-charcoal-950/50 to-charcoal-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-charcoal-950/40" />
        </motion.div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { top: '20%', left: '15%', size: 'w-80 h-80', delay: 0 },
            { top: '60%', right: '10%', size: 'w-64 h-64', delay: 2 },
            { top: '40%', left: '60%', size: 'w-48 h-48', delay: 4 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
              className={`absolute ${orb.size} rounded-full bg-gold-500/10 blur-3xl`}
              style={{ top: orb.top, left: (orb as any).left, right: (orb as any).right }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-400/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-gold-500/20"
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Star size={11} className="text-gold-400 fill-gold-400" />
              </motion.span>
            ))}
            <span className="text-xs font-semibold text-gold-300 tracking-widest uppercase mx-1">
              India's #1 Premium Rental Platform
            </span>
            <Star size={11} className="text-gold-400 fill-gold-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          >
            Find Your
            <br />
            <motion.span
              className="text-gold-gradient italic"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              Apna Ghar
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg text-charcoal-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover India's most extraordinary rental properties. From Worli penthouses to Goa villas — curated exclusively for discerning renters across 12+ cities.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10"
          >
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="flex-1 flex items-center gap-3 glass border border-gold-500/20 rounded-xl px-5 py-4 focus-within:border-gold-500/50 transition-all"
            >
              <Search size={18} className="text-gold-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, locality, property type..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-charcoal-100 placeholder-charcoal-500 text-sm flex-1 outline-none"
                onKeyDown={e => {
                  if (e.key === 'Enter') window.location.href = `/properties?search=${searchQuery}`;
                }}
              />
            </motion.div>
            <Link href={`/properties${searchQuery ? `?search=${searchQuery}` : ''}`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Search size={16} /> Explore Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-default"
              >
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-400">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-charcoal-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal-500"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Why Apna Ghar</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              The Standard of<br /><span className="text-gold-gradient italic">Excellence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="luxury-card p-8 rounded-2xl relative group overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="w-14 h-14 bg-gradient-to-br from-gold-500/20 to-gold-700/10 rounded-xl flex items-center justify-center mb-5 border border-gold-500/20"
                >
                  <feature.icon size={24} className="text-gold-400" />
                </motion.div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-charcoal-400 text-sm leading-relaxed">{feature.desc}</p>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CITY ────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Across India</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Browse by <span className="text-gold-gradient italic">City</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 150 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-36"
              >
                <Image src={city.img} alt={city.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="font-serif font-bold text-white text-sm">{city.name}</div>
                  <div className="text-gold-400 text-[10px]">{city.count}</div>
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-gold-500/0 rounded-2xl"
                  whileHover={{ borderColor: 'rgba(212,168,67,0.5)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Hand-Picked</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                Featured <span className="text-gold-gradient italic">Properties</span>
              </h2>
            </div>
            <Link href="/properties">
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-gold-400 font-medium hover:text-gold-300 transition-colors group"
              >
                View All Properties
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {featured.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="luxury-card rounded-2xl h-96"
                />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featured.slice(0, 6).map((property, i) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/5 via-transparent to-gold-900/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Happy Renters</p>
            <h2 className="font-serif text-4xl font-bold text-white">
              What People <span className="text-gold-gradient italic">Say</span>
            </h2>
          </motion.div>

          <div className="relative h-52">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.08, type: 'spring' }}
                    >
                      <Star size={16} className="text-gold-400 fill-gold-400" />
                    </motion.span>
                  ))}
                </div>
                <p className="font-serif text-xl sm:text-2xl text-white italic mb-6 max-w-2xl leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center font-bold text-charcoal-950">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">{testimonials[activeTestimonial].name}</div>
                    <div className="text-charcoal-400 text-xs">{testimonials[activeTestimonial].city}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                animate={{ width: i === activeTestimonial ? 24 : 8, backgroundColor: i === activeTestimonial ? '#d4a843' : '#374151' }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="Luxury" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/60 to-transparent" />
        </div>

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent w-full"
              style={{ top: `${15 + i * 20}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">Begin Your Journey</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
              Ready to Find Your <span className="text-gold-gradient italic">Perfect Home?</span>
            </h2>
            <p className="text-charcoal-300 mb-8 leading-relaxed">
              Join 50,000+ happy families who found their dream home through Apna Ghar. Start your search across India today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/properties">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
                >
                  Browse Properties <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 rounded-xl font-semibold border border-gold-500/30 text-gold-300 hover:border-gold-400/60 transition-colors"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

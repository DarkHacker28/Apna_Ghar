'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Check, Share2, ArrowLeft, Phone, Mail, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCurrentProperty } from '../../../store/propertySlice';
import { toggleFavorite } from '../../../store/favoritesSlice';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentProperty: property } = useAppSelector(s => s.properties);
  const { ids: favorites } = useAppSelector(s => s.favorites);
  const isFav = property ? favorites.includes(property.id) : false;
  const [imgIdx, setImgIdx] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) dispatch(setCurrentProperty(id as string));
  }, [id, dispatch]);

  if (!property) return (
    <div className="min-h-screen bg-charcoal-950 pt-24 flex flex-col items-center justify-center gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full" />
      <p className="text-charcoal-400">Loading property...</p>
    </div>
  );

  const fmtPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;
  const prevImg = () => setImgIdx(i => (i - 1 + property.images.length) % property.images.length);
  const nextImg = () => setImgIdx(i => (i + 1) % property.images.length);

  return (
    <div className="min-h-screen bg-charcoal-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-charcoal-400 hover:text-gold-400 transition-colors text-sm mb-6">
          <ArrowLeft size={16} /> Back to Properties
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden h-[400px] sm:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div key={imgIdx} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <Image src={property.images[imgIdx]} alt={property.title} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent pointer-events-none" />

              {property.images.length > 1 && (
                <>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevImg}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center">
                    <ChevronLeft size={20} className="text-white" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextImg}
                    className="absolute right-14 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center">
                    <ChevronRight size={20} className="text-white" />
                  </motion.button>
                </>
              )}

              <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-1.5 text-xs text-white font-medium">
                {imgIdx + 1} / {property.images.length}
              </div>

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {property.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                {!property.available && <span className="tag-pill !bg-red-500/20 !border-red-500/40 !text-red-400">Unavailable</span>}
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center">
                  <Share2 size={16} className={copied ? 'text-gold-400' : 'text-white'} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleFavorite(property.id))}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center">
                  <Heart size={16} className={isFav ? 'text-red-400 fill-red-400' : 'text-white'} />
                </motion.button>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.03 }} onClick={() => setImgIdx(i)}
                    className={`relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-gold-500' : 'border-transparent'}`}>
                    <Image src={img} alt={`thumb ${i}`} fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Info Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="luxury-card rounded-2xl p-7">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs text-gold-500 font-semibold uppercase tracking-wider">{property.type}</span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-charcoal-400 text-sm mt-2">
                    <MapPin size={14} className="text-gold-600" />
                    {property.location.address}, {property.location.city}, {property.location.state}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-3xl font-bold text-gold-400">{fmtPrice(property.price)}</div>
                  <div className="text-charcoal-500 text-sm">per {property.priceUnit}</div>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <Star size={14} className="text-gold-400 fill-gold-400" />
                    <span className="text-sm font-semibold text-charcoal-200">{property.rating}</span>
                    <span className="text-charcoal-500 text-sm">({property.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/5 mb-5">
                {[
                  { Icon: Bed, label: 'Bedrooms', val: property.bedrooms === 0 ? 'Studio' : property.bedrooms },
                  { Icon: Bath, label: 'Bathrooms', val: property.bathrooms },
                  { Icon: Square, label: 'Area (sq ft)', val: property.area.toLocaleString('en-IN') },
                ].map(({ Icon, label, val }) => (
                  <div key={label} className="text-center">
                    <Icon size={20} className="text-gold-500 mx-auto mb-1" />
                    <div className="font-semibold text-white">{val}</div>
                    <div className="text-xs text-charcoal-500">{label}</div>
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-xl font-semibold text-white mb-3">About This Property</h2>
              <p className="text-charcoal-300 leading-relaxed">{property.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="luxury-card rounded-2xl p-7">
              <h2 className="font-serif text-xl font-semibold text-white mb-5">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <motion.div key={amenity} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-charcoal-300">
                    <div className="w-5 h-5 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-gold-400" />
                    </div>
                    {amenity}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="luxury-card rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-5">
                <div className="font-serif text-4xl font-bold text-gold-400">{fmtPrice(property.price)}</div>
                <div className="text-charcoal-400 text-sm">per {property.priceUnit}</div>
              </div>

              <div className={`text-center py-2 px-4 rounded-xl text-sm font-semibold mb-5 ${property.available ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
                {property.available ? '✓ Available Now' : '✕ Currently Unavailable'}
              </div>

              {property.available && (
                <>
                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="block text-xs text-charcoal-400 mb-1.5 font-medium">Move-in Date</label>
                      <input type="date" className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs text-charcoal-400 mb-1.5 font-medium">Lease Term</label>
                      <select className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50">
                        <option>11 Months</option>
                        <option>12 Months</option>
                        <option>24 Months</option>
                        <option>Month-to-Month</option>
                      </select>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setInquiryOpen(true)}
                    className="btn-gold w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3">
                    <Calendar size={18} /> Schedule Site Visit
                  </motion.button>
                </>
              )}

              <div className="space-y-2.5">
                <a href="tel:+919871610878">
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-gold-500/25 rounded-xl text-charcoal-200 hover:border-gold-400/50 text-sm transition-colors">
                    <Phone size={16} className="text-gold-500" /> +91 98716 10878
                  </button>
                </a>
                <a href="mailto:hassu1402@gmail.com">
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-gold-500/25 rounded-xl text-charcoal-200 hover:border-gold-400/50 text-sm transition-colors">
                    <Mail size={16} className="text-gold-500" /> hassu1402@gmail.com
                  </button>
                </a>
              </div>

              <div className="divider-gold my-5" />
              <div className="text-center text-xs text-charcoal-500">
                <p>🔒 Your inquiry is 100% confidential</p>
                <p className="mt-1">Typically responds within 2 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setInquiryOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={e => e.stopPropagation()} className="bg-charcoal-900 border border-gold-700/20 rounded-2xl p-8 max-w-md w-full">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">Schedule a Site Visit</h2>
              <p className="text-charcoal-400 text-sm mb-6">Our agent will confirm your visit within 2 hours.</p>
              <div className="space-y-4">
                {[{l:'Full Name',p:'Rahul Sharma',t:'text'},{l:'Email',p:'rahul@example.com',t:'email'},{l:'Phone Number',p:'+91 98765 43210',t:'tel'}].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs text-charcoal-400 mb-1.5 font-medium">{f.l}</label>
                    <input type={f.t} placeholder={f.p} className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-charcoal-400 mb-1.5 font-medium">Message (Optional)</label>
                  <textarea placeholder="Preferred time, questions..." rows={3} className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setInquiryOpen(false)} className="flex-1 py-3 border border-charcoal-700 rounded-xl text-charcoal-300 text-sm hover:border-charcoal-600 transition-colors">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { alert('✓ Visit request sent! We will contact you within 2 hours.'); setInquiryOpen(false); }}
                  className="flex-1 btn-gold py-3 rounded-xl font-semibold text-sm">Send Request</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

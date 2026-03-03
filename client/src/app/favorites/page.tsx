'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import { ALL_PROPERTIES } from '../../store/propertySlice';
import { PropertyCard } from '../../components/sections/PropertyCard';

export default function FavoritesPage() {
  const { ids: favorites } = useAppSelector(s => s.favorites);
  const favProperties = ALL_PROPERTIES.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Saved</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white flex items-center gap-3">
            My <span className="text-gold-gradient italic">Favourites</span>
            {favorites.length > 0 && <span className="text-2xl font-normal text-charcoal-500">({favorites.length})</span>}
          </h1>
        </motion.div>

        {favProperties.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Heart size={64} className="mx-auto text-charcoal-700 mb-6" />
            </motion.div>
            <h3 className="font-serif text-2xl text-white mb-3">No Favourites Yet</h3>
            <p className="text-charcoal-400 mb-8 max-w-sm mx-auto">Click the ♡ heart icon on any property to save it here.</p>
            <Link href="/properties">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto">
                Browse Properties <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

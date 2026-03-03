'use client';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFilters, clearFilters } from '../../store/propertySlice';
import { PropertyCard } from '../../components/sections/PropertyCard';

const PROPERTY_TYPES = ['', 'Apartment', 'Penthouse', 'Loft', 'Studio', 'Duplex', 'Villa'];

function PropertiesContent() {
  const dispatch = useAppDispatch();
  const { properties, filters } = useAppSelector(s => s.properties);
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    if (search) {
      setLocalSearch(search);
      dispatch(setFilters({ search }));
    }
  }, []);

  const handleSearch = () => dispatch(setFilters({ search: localSearch }));
  const handleClear = () => { dispatch(clearFilters()); setLocalSearch(''); };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Browse</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
            All <span className="text-gold-gradient italic">Properties</span>
          </h1>
          <p className="text-charcoal-400 mt-3">
            {properties.length} properties across India
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 glass border border-gold-500/20 rounded-xl px-5 py-3.5">
            <Search size={18} className="text-gold-400 flex-shrink-0" />
            <input
              type="text" placeholder="Search by city, state, type..."
              value={localSearch} onChange={e => setLocalSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="bg-transparent text-charcoal-100 placeholder-charcoal-500 text-sm flex-1 outline-none"
            />
            {localSearch && <button onClick={() => { setLocalSearch(''); dispatch(setFilters({ search: '' })); }}><X size={14} className="text-charcoal-400" /></button>}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearch} className="btn-gold px-6 py-3.5 rounded-xl font-semibold">Search</motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3.5 glass border border-gold-500/20 rounded-xl text-charcoal-200 hover:border-gold-400/40 transition-colors">
            <SlidersHorizontal size={16} className="text-gold-400" /> Filters
            {showFilters && <span className="w-2 h-2 bg-gold-500 rounded-full" />}
          </motion.button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <div className="glass border border-gold-500/15 rounded-2xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-xs text-charcoal-400 font-semibold uppercase tracking-wider mb-2">Property Type</label>
                    <select value={filters.type} onChange={e => dispatch(setFilters({ type: e.target.value }))}
                      className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50">
                      {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t || 'All Types'}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-400 font-semibold uppercase tracking-wider mb-2">Min Bedrooms</label>
                    <select value={filters.bedrooms} onChange={e => dispatch(setFilters({ bedrooms: parseInt(e.target.value) }))}
                      className="w-full bg-charcoal-800 border border-charcoal-700 text-charcoal-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold-500/50">
                      {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'Any' : `${n}+ Beds`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-400 font-semibold uppercase tracking-wider mb-2">
                      Min ₹{(filters.minPrice/1000).toFixed(0)}K/mo
                    </label>
                    <input type="range" min={0} max={500000} step={5000} value={filters.minPrice}
                      onChange={e => dispatch(setFilters({ minPrice: parseInt(e.target.value) }))} className="w-full accent-gold-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-400 font-semibold uppercase tracking-wider mb-2">
                      Max ₹{filters.maxPrice >= 9999999 ? 'Any' : `${(filters.maxPrice/1000).toFixed(0)}K/mo`}
                    </label>
                    <input type="range" min={10000} max={1500000} step={10000} value={Math.min(filters.maxPrice, 1500000)}
                      onChange={e => dispatch(setFilters({ maxPrice: parseInt(e.target.value) }))} className="w-full accent-gold-500" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleClear} className="text-sm text-charcoal-400 hover:text-gold-400 transition-colors flex items-center gap-1.5">
                    <X size={14} /> Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property Grid */}
        {properties.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <div className="text-6xl mb-6">🏠</div>
            <h3 className="font-serif text-2xl text-white mb-3">No Properties Found</h3>
            <p className="text-charcoal-400 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={handleClear} className="btn-gold px-6 py-3 rounded-xl font-semibold">Clear Filters</button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal-950 pt-24 flex items-center justify-center"><div className="animate-pulse text-gold-400 font-serif text-xl">Loading Properties...</div></div>}>
      <PropertiesContent />
    </Suspense>
  );
}

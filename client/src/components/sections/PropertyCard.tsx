'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square, Star, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import type { Property } from '../../store/propertySlice';

interface Props {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: Props) {
  const dispatch = useAppDispatch();
  const { ids: favorites } = useAppSelector(s => s.favorites);
  const isFav = favorites.includes(property.id);
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const fmtPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative luxury-card rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIdx}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: hovered ? 1.05 : 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={property.images[imgIdx] || property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="img-overlay absolute inset-0" />

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-gold-400 w-4' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {!property.available && (
            <span className="tag-pill !bg-red-500/20 !border-red-500/40 !text-red-400">Unavailable</span>
          )}
        </div>

        {/* Favorite */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); dispatch(toggleFavorite(property.id)); }}
          className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isFav ? 'filled' : 'empty'}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                size={16}
                className={isFav ? 'text-red-400 fill-red-400' : 'text-white'}
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 glass rounded-lg px-2 py-1">
          <Star size={11} className="text-gold-400 fill-gold-400" />
          <span className="text-xs font-bold text-white">{property.rating}</span>
          <span className="text-[10px] text-white/60">({property.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs text-gold-500 font-semibold uppercase tracking-wider">{property.type}</span>
            <h3 className="font-serif text-lg font-semibold text-white leading-snug mt-0.5">{property.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-charcoal-400 text-xs mb-4">
          <MapPin size={12} className="text-gold-600 flex-shrink-0" />
          {property.location.address}, {property.location.city}
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-5">
          {[
            { Icon: Bed, value: property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed` },
            { Icon: Bath, value: `${property.bathrooms} Bath` },
            { Icon: Square, value: `${property.area.toLocaleString()} ft²` },
          ].map(({ Icon, value }) => (
            <div key={value} className="flex items-center gap-1 text-charcoal-400 text-xs">
              <Icon size={12} className="text-gold-600" />
              {value}
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
          {property.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-[10px] bg-charcoal-800 text-charcoal-300 px-2 py-0.5 rounded-md">{a}</span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-[10px] bg-charcoal-800 text-charcoal-400 px-2 py-0.5 rounded-md">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <div className="font-serif text-xl font-bold text-gold-400">{fmtPrice(property.price)}</div>
            <div className="text-[11px] text-charcoal-500">/{property.priceUnit}</div>
          </div>
          <Link href={`/properties/${property.id}`}>
            <motion.button
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              View Details <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, LogOut, Home, Search, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/authSlice';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(s => s.auth);
  const { ids: favorites } = useAppSelector(s => s.favorites);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/favorites', label: 'Favorites' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal-950/95 backdrop-blur-xl border-b border-gold-700/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center"
            >
              <Home size={18} className="text-charcoal-950" />
            </motion.div>
            <div>
              <span className="font-serif text-xl font-bold text-gold-gradient">Apna Ghar</span>
              <div className="text-[9px] text-gold-600/60 tracking-[0.2em] uppercase -mt-1">Premium Rentals</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-charcoal-200 hover:text-gold-400 transition-colors relative group"
                >
                  {link.label}
                  {link.href === '/favorites' && favorites.length > 0 && (
                    <span className="ml-1 bg-gold-500 text-charcoal-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/favorites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-charcoal-300 hover:text-gold-400 transition-colors"
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full text-[9px] font-bold text-charcoal-950 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </motion.button>
            </Link>

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-charcoal-800/80 hover:bg-charcoal-700/80 border border-gold-700/20 rounded-full px-3 py-1.5 text-sm text-charcoal-200 transition-all"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-charcoal-950">{user.name[0]}</span>
                  </div>
                  <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-44 glass rounded-xl border border-gold-700/20 overflow-hidden shadow-xl"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-xs text-charcoal-400">Signed in as</p>
                        <p className="text-sm font-medium text-charcoal-100 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { dispatch(logout()); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-sm font-medium text-charcoal-200 hover:text-gold-400 transition-colors px-3 py-1.5"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/auth?mode=register">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-gold text-sm px-4 py-1.5 rounded-full"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-charcoal-200"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-charcoal-950/98 backdrop-blur-xl border-t border-gold-700/20"
            >
              <div className="p-4 space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-charcoal-200 hover:bg-gold-500/10 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-white/5 flex gap-2">
                  <Link href="/auth" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full py-2 border border-gold-700/40 rounded-lg text-sm text-charcoal-200 hover:border-gold-500/60 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/auth?mode=register" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <button className="w-full btn-gold py-2 rounded-lg text-sm">Get Started</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}

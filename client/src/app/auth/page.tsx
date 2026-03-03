'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Home, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser, registerUser, demoLogin, clearError } from '../../store/authSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector(s => s.auth);
  const [mode, setMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginForm) => {
    await dispatch(loginUser(data));
  };

  const onRegister = async (data: RegisterForm) => {
    await dispatch(registerUser({ name: data.name, email: data.email, password: data.password }));
  };

  const onDemo = async () => {
    await dispatch(demoLogin());
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-charcoal-800 border ${hasError ? 'border-red-500/60' : 'border-charcoal-700'} text-charcoal-100 placeholder-charcoal-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold-500/60 transition-colors`;

  return (
    <div className="min-h-screen bg-charcoal-950 flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <Home size={18} className="text-charcoal-950" />
            </div>
            <span className="font-serif text-xl font-bold text-gold-gradient">Apna Ghar</span>
          </Link>

          {/* Tab Toggle */}
          <div className="flex p-1 bg-charcoal-900 rounded-xl mb-8">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === m
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-950 shadow-lg'
                    : 'text-charcoal-400 hover:text-charcoal-200'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm mb-5"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    {...loginForm.register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(!!loginForm.formState.errors.email)}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-400 text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      {...loginForm.register('password')}
                      type={showPw ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`${inputClass(!!loginForm.formState.errors.password)} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-300"
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-400 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full" />
                  ) : (
                    <><ArrowRight size={18} /> Sign In</>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    {...registerForm.register('name')}
                    placeholder="John Doe"
                    className={inputClass(!!registerForm.formState.errors.name)}
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    {...registerForm.register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(!!registerForm.formState.errors.email)}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      {...registerForm.register('password')}
                      type={showPw ? 'text' : 'password'}
                      placeholder="Min 6 characters"
                      className={`${inputClass(!!registerForm.formState.errors.password)} pr-11`}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-charcoal-400 font-semibold mb-1.5 uppercase tracking-wider">Confirm Password</label>
                  <input
                    {...registerForm.register('confirmPassword')}
                    type="password"
                    placeholder="Repeat password"
                    className={inputClass(!!registerForm.formState.errors.confirmPassword)}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full" />
                  ) : (
                    <><Sparkles size={16} /> Create Account</>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Demo Login */}
          <div className="mt-4">
            <div className="relative flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-charcoal-800" />
              <span className="text-xs text-charcoal-600">or</span>
              <div className="flex-1 h-px bg-charcoal-800" />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onDemo}
              disabled={loading}
              className="w-full py-3.5 border border-gold-500/25 rounded-xl text-charcoal-200 font-medium text-sm hover:border-gold-400/50 transition-colors disabled:opacity-60"
            >
              🚀 Continue as Demo User
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
          alt="Luxury Property"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass border border-gold-500/15 rounded-2xl p-5 max-w-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-charcoal-950 text-sm">J</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Rohan M.</div>
                <div className="text-charcoal-400 text-xs">Bandra, Mumbai</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="text-gold-400 text-xs">★</div>
                ))}
              </div>
            </div>
            <p className="text-charcoal-300 text-xs leading-relaxed">
              "Apna Ghar made finding my dream penthouse effortless. The whole experience was world-class."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-charcoal-950 flex items-center justify-center"><div className="text-gold-400">Loading...</div></div>}>
      <AuthContent />
    </Suspense>
  );
}

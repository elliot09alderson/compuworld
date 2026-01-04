'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import Button from '@/components/Button';
import { Rocket, ShieldCheck, Mail, Lock, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function RegisterPage() {
  const [state, dispatch, isPending] = useActionState(register, undefined);
  
  if (state === 'success') {
      redirect('/login?registered=true');
  }

  // Helper safely cast state for comparison if needed
  const errorMessage = state !== ('success' as string) ? state : null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050510] font-sans">
       {/* Animated Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[20%] w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4 group transform transition-transform hover:scale-105">
              <Rocket className="h-10 w-10 text-[var(--color-neon-blue)]" />
              <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent font-[family-name:var(--font-orbitron)]">
                COMPU WORLD
              </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-white font-[family-name:var(--font-orbitron)]">
            NEW PLAYER <span className="text-[var(--color-neon-green)]">REGISTRATION</span>
          </h2>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form action={dispatch} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-white placeholder-gray-600 focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] focus:outline-none transition-all"
                  placeholder="Enter your name"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-white placeholder-gray-600 focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] focus:outline-none transition-all"
                  placeholder="name@example.com"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-white placeholder-gray-600 focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] focus:outline-none transition-all"
                  placeholder="Create a password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-3 text-white placeholder-gray-600 focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] focus:outline-none transition-all"
                  placeholder="Repeat password"
                />
                <ShieldCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div className="pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    glow
                    className="w-full justify-center py-2.5 text-sm font-bold tracking-wider font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)] border-0 hover:opacity-90 transform active:scale-95 transition-all text-black"
                    aria-disabled={isPending}
                >
                {isPending ? 'CREATING...' : 'CREATE ACCOUNT'}
                <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
            </div>
            
            <div
                className="flex items-center justify-center min-h-[1.5rem]"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                <p className="text-xs font-medium text-red-400">
                    {errorMessage}
                </p>
                )}
            </div>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[var(--color-neon-green)] hover:text-white transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

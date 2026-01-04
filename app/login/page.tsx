'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import Button from '@/components/Button';
import { Rocket, Gamepad2, Cpu, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050510] font-sans">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4 group transform transition-transform hover:scale-105">
              <Rocket className="h-12 w-12 text-[var(--color-neon-blue)] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
              <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent font-[family-name:var(--font-orbitron)]">
                COMPU WORLD
              </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-orbitron)]">
            WELCOME BACK <span className="text-[var(--color-neon-purple)]">PLAYER</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Resume your session and dominate the game.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form action={dispatch} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-[var(--color-neon-blue)] mb-2 font-[family-name:var(--font-orbitron)]">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="player@example.com"
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-3 px-4 text-white placeholder-gray-600 shadow-sm focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] focus:outline-none transition-all duration-300"
                />
                <Gamepad2 className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-[var(--color-neon-blue)] font-[family-name:var(--font-orbitron)]">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-gray-400 hover:text-white transition-colors text-xs">
                    Lost Key?
                  </a>
                </div>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-3 px-4 text-white placeholder-gray-600 shadow-sm focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] focus:outline-none transition-all duration-300"
                />
                <Cpu className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                glow
                className="w-full justify-center py-3 text-base font-bold tracking-wider font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] border-0 hover:opacity-90 transform active:scale-95 transition-all"
                aria-disabled={isPending}
            >
              {isPending ? 'CONNECTING...' : 'INITIALIZE LOGIN'}
              <Zap className="ml-2 h-5 w-5 fill-current" />
            </Button>
            
            <div
              className="flex items-center justify-center min-h-[1.5rem]"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <p className="text-sm font-medium text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/50">
                   ⚠ {errorMessage}
                </p>
              )}
            </div>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-gray-400">
              New Player?{' '}
              <Link href="/register" className="font-bold text-[var(--color-neon-blue)] hover:text-white transition-colors inline-flex items-center">
                Create Account <span className="ml-[2px]">→</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      if (error) {
        setError(error.message);
      } else {
        if (data.user && data.session === null) {
          setError("Account created! Please check your email to confirm.");
          setIsSignUp(false);
        } else {
          onClose();
          router.refresh();
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onClose();
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-display">
      {/* Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm z-10" 
        onClick={onClose}
      />
      
      {/* Login Modal */}
      <div className="relative z-20 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200 mt-10 md:mt-0 max-h-[90vh] overflow-y-auto custom-scrollbar rounded-xl">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col relative w-full">
          
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white/50 dark:bg-zinc-900/50 rounded-full p-1"
          >
            <span className="material-symbols-outlined block">close</span>
          </button>

          {/* Modal Header */}
          <div className="p-8 pb-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {isSignUp ? 'Create Account' : 'Industrial 3D Login'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              {isSignUp ? 'Register for enterprise manufacturing services' : 'Access your enterprise manufacturing dashboard'}
            </p>
          </div>
          
          {/* Main Content Area */}
          <div className="px-8 py-4 space-y-4">
            {/* Login/Signup Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 dark:text-red-400 text-sm px-3 py-2 rounded-lg text-center leading-tight">
                  {error}
                </div>
              )}

              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane" 
                      className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-lg py-3 px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe" 
                      className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-lg py-3 px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Work Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-xl">mail</span>
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@company.com" 
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-lg py-3 pl-11 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Password</label>
                  {!isSignUp && <a href="#" className="text-xs font-medium text-primary hover:text-amber-500 transition-colors">Forgot password?</a>}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-xl">lock</span>
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-lg py-3 pl-11 pr-11 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-amber-500 disabled:opacity-50 text-white dark:text-zinc-900 font-bold py-3.5 rounded-lg shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
              >
                <span>{loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN TO DASHBOARD')}</span>
                {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-zinc-700/50"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or connect with</span>
              <div className="flex-grow border-t border-slate-200 dark:border-zinc-700/50"></div>
            </div>
              
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 hover:bg-slate-50 dark:hover:bg-zinc-700/50 text-slate-700 dark:text-slate-200 py-2.5 rounded-lg transition-all font-medium text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"></path>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 hover:bg-slate-50 dark:hover:bg-zinc-700/50 text-slate-700 dark:text-slate-200 py-2.5 rounded-lg transition-all font-medium text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
                GitHub
              </button>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="bg-slate-50 dark:bg-zinc-800/30 p-6 text-center border-t border-slate-200 dark:border-zinc-700/30 mt-auto">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isSignUp ? 'Already have an account? ' : 'New to industrial 3D services? '}
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Create an account'}
              </button>
            </p>
          </div>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-6 flex items-center justify-center gap-6 opacity-60">
          <div className="flex items-center gap-2 text-slate-100 dark:text-slate-400 text-xs font-semibold grayscale">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            ISO 9001 CERTIFIED
          </div>
          <div className="flex items-center gap-2 text-slate-100 dark:text-slate-400 text-xs font-semibold grayscale">
            <span className="material-symbols-outlined text-sm">encrypted</span>
            AES-256 ENCRYPTED
          </div>
        </div>
      </div>
    </div>
  );
}

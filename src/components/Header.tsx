"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check active session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl">view_in_ar</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Print3D</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="/materials">Materials</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="/pricing">Pricing</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="/support">Support</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden sm:flex items-center relative w-full max-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">search</span>
              <input className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Search models..." type="text"/>
            </label>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-all">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/user/dashboard" className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20">
                  <span className="material-symbols-outlined">person</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-sm hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all"
              >
                Login
              </button>
            )}
            
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}

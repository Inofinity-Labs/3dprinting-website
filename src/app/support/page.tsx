import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function SupportPage() {
  return (
    <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-zinc-100 min-h-screen font-display flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Industrial <span className="text-primary">Precision</span> Support
            </h1>
            <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed">
              Access technical documentation, firmware updates, and direct engineering support for your Forge3D ecosystem.
            </p>
          </div>

          {/* Quick Search Large */}
          <div className="mt-8 max-w-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-amber-600/50 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden p-1 shadow-lg">
                <span className="material-symbols-outlined px-4 text-slate-400">search</span>
                <input 
                  type="text" 
                  placeholder="Search for calibration, materials, or error codes..." 
                  className="flex-1 border-none focus:ring-0 bg-transparent py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none"
                />
                <button className="bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 font-bold px-8 py-4 rounded-lg transition-colors">Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar Navigation & Quick Links */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Support Categories</h3>
              <nav className="space-y-1">
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-semibold group border-l-2 border-primary">
                  <span className="material-symbols-outlined">home</span>
                  <span>Support Home</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">print</span>
                  <span>Machine Profiles</span>
                </Link>
                <Link href="/materials" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">layers</span>
                  <span>Material Settings</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">terminal</span>
                  <span>API Documentation</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all group">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">forum</span>
                  <span>Community Forum</span>
                </Link>
              </nav>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl relative overflow-hidden group hover:bg-primary/20 transition-colors cursor-pointer">
              <div className="relative z-10">
                <h4 className="text-primary font-bold mb-2">Technical Guides</h4>
                <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">Download official PDF calibration manuals for all Forge Series machines and properties.</p>
                <button className="text-slate-900 dark:text-white font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Library <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-primary/10 text-9xl select-none">description</span>
            </div>
          </div>

          {/* Content Area: FAQ & Contact */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Knowledge Base / FAQ */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">quiz</span> Knowledge Base
                </h2>
                <Link href="#" className="text-primary text-sm font-semibold hover:underline">View all articles</Link>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors">How to design strictly for FDM limitations?</h4>
                      <p className="text-slate-500 dark:text-zinc-400 text-sm mt-2 line-clamp-2">This design guide covers the manual and automatic considerations for FDM technology including overhangs, support angles, and dimensional tolerances...</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 dark:text-zinc-500">chevron_right</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors">Choosing between Tough Resin and PA-CF</h4>
                      <p className="text-slate-500 dark:text-zinc-400 text-sm mt-2 line-clamp-2">Understand the mechanical differences and ideal use cases when deciding between SLA resin and reinforced thermoplastics for functional prototyping...</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 dark:text-zinc-500">chevron_right</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors">API Release Notes: Integrations Update v2</h4>
                      <p className="text-slate-500 dark:text-zinc-400 text-sm mt-2 line-clamp-2">Stability improvements for automated order submission and new webhooks for real-time tracking of enterprise production fleets.</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 dark:text-zinc-500">chevron_right</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 border-b border-slate-200 dark:border-zinc-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reach out to Engineering</h2>
                <p className="text-slate-600 dark:text-zinc-400 mt-2">Submit a ticket and our sales engineers will respond within 4 business hours.</p>
              </div>
              <form className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500">Order/Quote ID</label>
                    <input 
                      type="text" 
                      placeholder="#ORD-XXXXXX" 
                      className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-zinc-800 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-zinc-100 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500">Subject</label>
                    <select className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-zinc-800 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-zinc-100 appearance-none">
                      <option>Technical Question</option>
                      <option>Quote Clarification</option>
                      <option>Material Settings</option>
                      <option>API Support</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500">Detailed Description</label>
                  <textarea 
                    rows={4} 
                    placeholder="Describe your requirements, geometry concerns, or technical questions..." 
                    className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-zinc-800 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-zinc-100 placeholder:text-slate-400"
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button type="button" className="flex items-center justify-center gap-2 text-slate-500 hover:text-primary text-sm transition-colors border border-dashed border-slate-300 dark:border-zinc-700 py-3 px-4 rounded-lg bg-slate-50 dark:bg-transparent">
                    <span className="material-symbols-outlined text-sm">attach_file</span>
                    <span>Attach .stl or specs</span>
                  </button>
                  <button type="submit" className="bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 font-black px-10 py-3 rounded-lg transition-colors shadow-md">
                    SUBMIT TICKET
                  </button>
                </div>
              </form>
            </section>

            {/* Community Links */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-6 group hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                <div className="size-16 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-4xl">groups</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Community Forum</h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">Collaborate with fellow engineers.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-6 group hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                <div className="size-16 bg-slate-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-4xl">code</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Developer API</h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">Custom integration documentation.</p>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

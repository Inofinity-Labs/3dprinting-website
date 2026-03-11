import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-zinc-100 antialiased font-display">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 uppercase italic text-slate-900 dark:text-white">
            Precision <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Industrial-grade additive manufacturing tailored for speed and scale. No hidden fees. Just high-performance parts.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          {/* Prototype */}
          <div className="group flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
            <div className="space-y-2">
              <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-[0.2em]">Tier 01</h3>
              <h2 className="text-3xl font-black uppercase italic text-slate-900 dark:text-white">Prototype</h2>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic tracking-tighter text-primary">$49</span>
              <span className="text-slate-500 font-bold uppercase text-xs">/ startup cost</span>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
              Perfect for form-fit testing and rapid iterations with standard thermoplastics.
            </p>
            <button className="w-full h-12 rounded-lg border-2 border-slate-800 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Get Started
            </button>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>PLA / PETG / ABS Materials</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>48-Hour Standard Lead Time</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400 dark:text-zinc-500">
                <span className="material-symbols-outlined text-slate-400 dark:text-zinc-700 text-xl">cancel</span>
                <span className="line-through">Priority Queue Access</span>
              </li>
            </ul>
          </div>

          {/* Production */}
          <div className="group relative flex flex-col gap-6 rounded-xl border-2 border-primary bg-slate-900 dark:bg-zinc-900 p-8 shadow-xl shadow-primary/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              Most Selected
            </div>
            <div className="space-y-2">
              <h3 className="text-primary text-sm font-bold uppercase tracking-[0.2em]">Tier 02</h3>
              <h2 className="text-3xl font-black uppercase italic text-white">Production</h2>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic tracking-tighter text-primary">$499</span>
              <span className="text-slate-300 dark:text-zinc-400 font-bold uppercase text-xs">/ monthly base</span>
            </div>
            <p className="text-slate-400 dark:text-zinc-400 text-sm leading-relaxed">
              Scalable manufacturing with high-strength materials and automated QA processes.
            </p>
            <button className="w-full h-12 rounded-lg bg-primary text-white dark:text-zinc-950 font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all">
              Scale Production
            </button>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm text-slate-100 dark:text-zinc-100">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Carbon Fiber &amp; Engineering Resins</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-100 dark:text-zinc-100">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>24-Hour Express Shipping</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-100 dark:text-zinc-100">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Dedicated Batch Testing</span>
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="group flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
            <div className="space-y-2">
              <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-[0.2em]">Tier 03</h3>
              <h2 className="text-3xl font-black uppercase italic text-slate-900 dark:text-white">Enterprise</h2>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic tracking-tighter text-primary">Custom</span>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
              Full-service solutions including custom material development and on-site engineering.
            </p>
            <button className="w-full h-12 rounded-lg border-2 border-slate-800 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Contact Sales
            </button>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Aerospace Grade Super-polymers</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>Private Server API Access</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>On-Site Material Analysis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Custom Estimator Section */}
        <div className="bg-slate-100 dark:bg-zinc-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-zinc-800 mb-20 shadow-inner">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            <div className="flex-1 w-full">
              <h2 className="text-3xl font-black uppercase italic mb-2 text-slate-900 dark:text-white">Cost <span className="text-primary">Estimator</span></h2>
              <p className="text-slate-600 dark:text-zinc-400 mb-8 font-medium">Input your project parameters for an instant quote estimation.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Material Selection</label>
                    <div className="relative">
                      <select className="w-full bg-white dark:bg-background-dark border-slate-300 dark:border-zinc-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none text-slate-900 dark:text-white">
                        <option>PLA - Standard ($0.05/cm³)</option>
                        <option>Nylon-CF ($0.15/cm³)</option>
                        <option>Ultem 1010 ($0.45/cm³)</option>
                        <option>Bio-compatible Resin ($0.35/cm³)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-zinc-500">unfold_more</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Volume (cm³)</label>
                    <input type="number" placeholder="e.g. 150" className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-zinc-800 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Infill Density (%)</label>
                    <input type="range" className="w-full accent-primary h-2 bg-slate-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase">
                      <span>20%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Post-Processing</label>
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <input type="checkbox" className="hidden peer" />
                        <div className="h-12 border border-slate-300 dark:border-zinc-800 rounded-lg flex items-center justify-center text-xs font-bold uppercase text-slate-600 dark:text-zinc-400 peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all bg-white dark:bg-transparent">Sanding</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input type="checkbox" className="hidden peer" />
                        <div className="h-12 border border-slate-300 dark:border-zinc-800 rounded-lg flex items-center justify-center text-xs font-bold uppercase text-slate-600 dark:text-zinc-400 peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all bg-white dark:bg-transparent">Painting</div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full lg:w-96 bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-zinc-800 p-8 flex flex-col justify-between min-h-[300px] shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-500 text-sm font-bold uppercase">Material Cost</span>
                  <span className="font-bold text-slate-900 dark:text-white">$12.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-500 text-sm font-bold uppercase">Machine Hours</span>
                  <span className="font-bold text-slate-900 dark:text-white">$45.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-500 text-sm font-bold uppercase">Finishing</span>
                  <span className="font-bold text-slate-900 dark:text-white">$0.00</span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-zinc-800 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black uppercase italic text-slate-900 dark:text-white">Total Est.</span>
                  <span className="text-3xl font-black italic text-primary">$57.50</span>
                </div>
              </div>
              <Link href="/quote" className="w-full mt-8 h-12 bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all">
                <span className="material-symbols-outlined">upload_file</span>
                Upload STL to Confirm
              </Link>
            </div>
            
          </div>
        </div>

        {/* Material Reference Table */}
        <div className="mt-24">
          <h2 className="text-2xl font-black uppercase italic mb-8 border-l-4 border-primary pl-4 text-slate-900 dark:text-white">Industrial Material <span className="text-primary">Matrix</span></h2>
          <div className="overflow-x-auto bg-white dark:bg-transparent rounded-xl border border-slate-200 dark:border-none shadow-sm dark:shadow-none">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800">
                  <th className="py-4 px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Material</th>
                  <th className="py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Tensile Strength</th>
                  <th className="py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Heat Deflection</th>
                  <th className="py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Surface Finish</th>
                  <th className="py-4 pr-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Base Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-900">
                <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold uppercase tracking-tighter italic text-slate-900 dark:text-zinc-100">Nylon 12 Carbon Fiber</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">76 MPa</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">143°C</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">Matte / Industrial</td>
                  <td className="py-6 pr-4 font-bold text-primary">$0.18/cm³</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold uppercase tracking-tighter italic text-slate-900 dark:text-zinc-100">Ultem 9085 Aero</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">68 MPa</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">153°C</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">Layered / Dense</td>
                  <td className="py-6 pr-4 font-bold text-primary">$0.55/cm³</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold uppercase tracking-tighter italic text-slate-900 dark:text-zinc-100">Tough Resin V4</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">55 MPa</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">48°C</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">Smooth / Glossy</td>
                  <td className="py-6 pr-4 font-bold text-primary">$0.25/cm³</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold uppercase tracking-tighter italic text-slate-900 dark:text-zinc-100">Anisotropic PEEK</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">98 MPa</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">260°C</td>
                  <td className="py-6 text-sm text-slate-600 dark:text-zinc-400">Natural / Crystalline</td>
                  <td className="py-6 pr-4 font-bold text-primary">$1.10/cm³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}

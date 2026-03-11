import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function MaterialsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                Industrial Grade Selection
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                Engineering <span className="text-primary">Materials</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                High-performance filaments, resins, and composites for professional-grade additive manufacturing. Tested for durability, precision, and thermal resistance.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/30 flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span> All Materials
                </button>
                <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  Filaments <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  Resins <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <button className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  High-Strength <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-200 dark:border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 dark:from-background-dark via-transparent to-primary/20 z-10"></div>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBl0zHaM4a4Wj77BOVWt7vPM5znLn_N26GENG-3Vm2HYtk2Bn6Jo1IA91aztzjG_CGZhJxMQEJ5fMmhScnBw4auYHZl5xu8grqBf0fdPByZoR5y9MyQkI-W7SF1LkELK1GL4MWm8kbhdeVA-YKNEnIq1b2GzUj7RR1qiqFrgd9O8B7-qtYWPH9h5V-klt8m1f123IBnaQA7ULEZ0uhsjdcfT-KRS7DD5mrPNRtGwxiUxeO-q24VBCE-vjU0-E2WzQMvxQggJ_Ymc7U')" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            
            {/* Material 1: Carbon Fiber Nylon */}
            <div className="group bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/3 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="w-full h-full min-h-[250px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkixL6tYtmPm6GE8Jr3Z2EAU8bL8Q0vQxjaGb90ZdVnkctzoK7num8BbnL8RCytepiF8BcnhBlgpRPYQ463NxL3pxbQaVq7yi_OAMvLUmb6bbEAvRwSA29Z9t9m0hGmtvP2Waqw88Osu7VNUVd4SBFUPDk5tBHPMxdaai-BoxQHg0Dw7NbDU-k3F2u5cgKLdkHgmb5fnnqW-hZnLXl9JOhN3YRWC-9kgqCkPejSeZfKeryQLVBTNpWINGGPUpBBK9RolXDxrod3O4')" }}></div>
                <div className="absolute top-4 left-4 bg-primary text-zinc-950 px-3 py-1 rounded text-xs font-black uppercase shadow-lg">Industrial</div>
              </div>
              <div className="flex-1 p-8 lg:p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">PA-CF (Carbon Fiber Nylon)</h3>
                    <p className="text-primary font-mono text-sm mt-1">Nylon with 20% Carbon Fiber Reinforcement</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl hidden sm:block">precision_manufacturing</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Technical Props</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Tensile Strength</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">75 MPa</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Heat Deflection</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">160°C</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Impact Resistance</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">High</span></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Pros</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Superior Stiffness</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Chemical Resistant</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Low Warpage</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Cons</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Abrasive to Nozzles</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Moisture Sensitive</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> High Cost</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/quote" className="bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight transition-colors">Configure Build</Link>
                  <button className="bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">Download Datasheet</button>
                </div>
              </div>
            </div>

            {/* Material 2: Engineering Resin */}
            <div className="group bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row-reverse">
              <div className="lg:w-1/3 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="w-full h-full min-h-[250px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFfxx3nsFTEIhmGt849pf8qemP2uHu0jFuNOjtH7UCztNHjBilO8AN1tqi-UxB3TTinmFlW1tBhfWOSczUe2Ar2VxHc28-f8i4XlB_1tt5uMNUpcE8ugJ9d7E0-Hy_DjFJCoNmHWafsIYjMVW6CFPMjKcQWDM9UN-j8CR_rKC24GbKJ5Q7lnVqT5hqPgk_9hfW99jBqPj1Q1L8twDyB-eZpoeb9nlkafxn5wro-XUQ6bEniesJfTne5rGxMJnskLyOa1KuE51zi60')" }}></div>
                <div className="absolute top-4 right-4 bg-white dark:bg-zinc-800 text-primary px-3 py-1 rounded text-xs font-black uppercase shadow-lg">SLA / DLP</div>
              </div>
              <div className="flex-1 p-8 lg:p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Tough Resin V4</h3>
                    <p className="text-primary font-mono text-sm mt-1">Photopolymer for High Precision Prototyping</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl hidden sm:block">biotech</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Technical Props</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Elongation</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">25%</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Flexural Modulus</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">1.6 GPa</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Layer Height</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">25-100μm</span></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Pros</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Mirror-smooth Finish</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Watertight Prints</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Isotropic Strength</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Cons</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Requires Post-Curing</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> UV Degradable</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Messy Process</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/quote" className="bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight transition-colors">Configure Build</Link>
                  <button className="bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">Compare Resins</button>
                </div>
              </div>
            </div>

            {/* Material 3: PLA+ */}
            <div className="group bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/3 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="w-full h-full min-h-[250px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8EWbZuxYXuAiMJOr8F0Bd1IdvfnOfe1dsV6unL2v1LUvYXqMa6I4OxHKMW3QEbIVO_SZRAQEN_m-SkBAIdmu-_0LZxTm_FPqNSJZd9Xr3r5SSubXUB9OsbuB3DBqRFCob5A81-KZbRW1uuicdpBSlwXT9EYTBI4mZn3WMjz0TJXXZF-FZVtfTcRjDt_C492Xh4lr9mD_ULAUlhI7B76W8eRYC8H2Cn40TX_XXeg7QkmX5X9ZAwReAXQhnnDupLOYoJPvKHDP9Lxw')" }}></div>
                <div className="absolute top-4 left-4 bg-primary text-zinc-950 px-3 py-1 rounded text-xs font-black uppercase shadow-lg">Rapid Prototype</div>
              </div>
              <div className="flex-1 p-8 lg:p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Industrial PLA+</h3>
                    <p className="text-primary font-mono text-sm mt-1">Bioplastic with Enhanced Toughness</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl hidden sm:block">eco</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Technical Props</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Biodegradable</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">Yes</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Shrinkage</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">&lt; 0.5%</span></li>
                      <li className="flex justify-between border-b border-slate-200 dark:border-zinc-800 pb-1"><span>Shore Hardness</span> <span className="text-slate-900 dark:text-slate-200 font-semibold">80D</span></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Pros</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Easiest to Print</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Odorless Processing</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-xs">check_circle</span> Dimensional Accuracy</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Cons</h4>
                    <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Low Heat Resistance</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> Brittle Fracture</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-rose-500 text-xs">cancel</span> UV Sensitivity</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/quote" className="bg-primary hover:bg-amber-500 text-white dark:text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight transition-colors">Configure Build</Link>
                  <button className="bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-tight hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">Color Options</button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-slate-50 dark:bg-[#0a0f16] border-t border-slate-200 dark:border-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Technical Comparison</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Select the right material for your project's specific mechanical requirements.</p>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 min-w-[700px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">
                  <th className="p-6">Property</th>
                  <th className="p-6">PLA+</th>
                  <th className="p-6">PA-CF</th>
                  <th className="p-6">Tough Resin</th>
                  <th className="p-6">TPU (Flex)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-6 font-bold text-slate-800 dark:text-slate-200">Durability</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Fair</td>
                  <td className="p-6 text-primary font-semibold">Excellent</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Good</td>
                  <td className="p-6 text-primary font-semibold">Excellent</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-6 font-bold text-slate-800 dark:text-slate-200">Heat Resistance</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">55°C</td>
                  <td className="p-6 text-primary font-semibold">160°C</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">80°C</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">60°C</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-6 font-bold text-slate-800 dark:text-slate-200">Post-Processing</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Sanding</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Annealing</td>
                  <td className="p-6 text-primary font-semibold">Curing</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Minimal</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-6 font-bold text-slate-800 dark:text-slate-200">Typical Usage</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Visual models</td>
                  <td className="p-6 text-primary font-semibold">Structural</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Functional</td>
                  <td className="p-6 text-slate-700 dark:text-slate-300">Gaskets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

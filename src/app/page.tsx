import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">Professional Grade Printing</span>
                <h1 className="text-slate-900 dark:text-slate-100 text-5xl md:text-6xl font-black leading-tight tracking-tight">
                  Bring Your Ideas to <span className="text-primary">Life in 3D</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">
                  High-quality custom 3D printing at your fingertips. From rapid industrial prototypes to personalized artisan gifts.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Custom Prints
                </Link>
                <Link href="/shop" className="flex items-center justify-center rounded-xl h-14 px-8 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                  Browse Catalog
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-500"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-600"></div>
                </div>
                <p className="text-sm text-slate-500">Trusted by <span className="font-bold text-slate-900 dark:text-slate-100">2,000+</span> creators and engineers</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEXqM6ljByPm5gM-XyuCN8x824Wrr23vCBGlAw8zb1ICI_QSjlxW10ykbhWlYcP4vAVhkNYHcXiIZN8Fqkx9SNik8lFLzY2xdTtRyWKEz29S7PXj57NE8zmB2EmIbmUjg0ZN-5NwmnrIKOcy14v_27mUwanOwOaYMSqsnhSq4UI29DR8YMUhzY-AUbgGrCmo6alKTQPGB76Ku530g_XDxRNlBwSvM2VRM6WP0hGE-muiDUls-CDUizyr2pkOhOB2nbUb5s_n9sCJM")' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Simple Steps Section */}
        <section className="px-4 py-16 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl mx-4 my-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-500">From digital file to physical object in three easy steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload Model</h3>
              <p className="text-sm text-slate-500">Upload your STL, OBJ, or STEP file directly to our secure portal.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">palette</span>
              </div>
              <h3 className="text-xl font-bold mb-2">2. Pick Material</h3>
              <p className="text-sm text-slate-500">Choose from 20+ materials including PLA, Resin, Carbon Fiber, and Metal.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark rounded-2xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold mb-2">3. We Print & Ship</h3>
              <p className="text-sm text-slate-500">Our expert team handles the printing and ships it to your door.</p>
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="px-4 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight">New Arrivals</h2>
            <Link className="text-primary font-bold flex items-center gap-1 hover:underline" href="/shop">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBM37UdGsDrjtZebdoB-Rk7ExlyxnUiwsQ4k6R9Zw0oDOA8zFybds-d6xIn15v0w-KC7Ht409Gm7PDmsNW9y9NwxMkgGCAq2276p2V6Zw_j1x1qllhBwUpyjID9fS0X8D7sulK6bWBaG2xP86AZCR7eSAH2nZVrTBIUOENQwVvyIx-iDAec9nb-FkBIrKnYq8HQUZ6Rf6fEONlCV34wcfLyXB_jwDgn99LFfRORFcPlKfz-REwwpywX4hucaqgMLRZ0xNcxF6cFDZM")' }}></div>
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded">Pro</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Arch-Model v2</p>
                  <p className="text-slate-500 text-sm">Industrial Design</p>
                </div>
                <p className="text-primary font-bold">Rs. 13,500</p>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApcQg9xocFxJ9WaKLkrsrK2d2qjFY2faHCeqCPOFY2eRPzqMy9JioFiO5II6bHUCCIH3wLa_yJlgHMoOsuorFZKimNTGPuRfVDniFVESnoj3lZ4xrd6gSZ5R2_NhztTKvb-3BRykrjr1_moMJ--Bm31TzD0C1T0TnWzsEDZd3uj4O9t150c7MtR5QHMQMrDVo_PSP7j9s47tTcWLAyVyqiKPfTXpkj2zRB_V0LHBt-5UQaFWFqu-H--gFw5iKv0ibGhGLVg0hEayk")' }}></div>
                <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded">Fun</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Flexi-Dragon</p>
                  <p className="text-slate-500 text-sm">Articulated Toy</p>
                </div>
                <p className="text-primary font-bold">Rs. 7,500</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhBrWfqckzja41JsRUmQdGdLRsOG8anlQ_nmJXbx3XGksPqxIev6VLP81A3PI58bgy4Pi95IgttDF9LuzThWHCS9fjAzIvdfwfKIfCrUvHMfmz0Qt1rlI-d5r2t2nVd7xWgcyDRDAXPbxI3Bcc72toylDnbeTQU_kiAv_aGb3hk0QbErWHU5LEcCEg4rpXFZ0BDGtTNH8Q7vSLpsZUa3vemW3Q9pd_rtPGRP84Uw_bWnzLobmT0dROlOEwsFybk61P3guUPdhG0oE")' }}></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Neo-Planter</p>
                  <p className="text-slate-500 text-sm">Home Decor</p>
                </div>
                <p className="text-primary font-bold">Rs. 5,400</p>
              </div>
            </div>

            {/* Product 4 */}
            <div className="group flex flex-col gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBggIBsiOPwcR-_U0X4XMdEG7NyWdkl6WwZ13lyMvZRL-JfWmaIcO1TO5xiN73fTsTceoo-AZ1R5uJ6pkXU_o3QxMLCfgIYG3K0zafI8jVj82gy_dP6Pebx68YDzAbqDfXAXLVVkE7Z5F3KyTIdD-RZhcSf1f3XqV5vrczcTsQl5Js81gkvW3sQxHoGANOdA457mP-V2nF9OauohOCdXd6DScNWyGTOWHczPohdfpiGQMU80jrFF38IQkqwStCXfj8EzqXTWXJPAfo")' }}></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">MK-Case</p>
                  <p className="text-slate-500 text-sm">Tech Gear</p>
                </div>
                <p className="text-primary font-bold">Rs. 18,000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="px-4 py-16">
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight mb-10">Materials We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark/50 hover:border-primary transition-colors flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">layers</span>
                </div>
                <h3 className="text-xl font-bold">Standard PLA</h3>
              </div>
              <p className="text-slate-500 text-sm">Versatile, bio-degradable, and available in over 50 colors. Perfect for prototyping and decorative items.</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark/50 hover:border-primary transition-colors flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <h3 className="text-xl font-bold">Tough Resin</h3>
              </div>
              <p className="text-slate-500 text-sm">Ultra-high detail with smooth surface finish. Ideal for miniatures, dental models, and complex geometries.</p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark/50 hover:border-primary transition-colors flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">precision_manufacturing</span>
                </div>
                <h3 className="text-xl font-bold">Carbon Fiber</h3>
              </div>
              <p className="text-slate-500 text-sm">Industrial grade strength and heat resistance. For functional parts, automotive components, and heavy-duty tools.</p>
            </div>
          </div>
        </section>

        {/* CTA Newsletter */}
        <section className="px-4 py-16 mb-20">
          <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-black relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to start your project?</h2>
              <p className="text-black/80 font-medium text-lg">Join 10k+ designers receiving monthly tips and exclusive material discounts.</p>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Enter your email" type="email"/>
                <button className="h-14 px-8 rounded-xl bg-black text-white font-bold whitespace-nowrap hover:bg-zinc-900 transition-colors">Sign Up</button>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 size-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 size-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

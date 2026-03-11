import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

// Fallback mock data if the Supabase database is empty
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Geometric Polygon Vase",
    price: 45.00,
    description: "A sleek, minimalist decor piece printed in premium matte PLA. Features a complex Voronoi pattern.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3JUeNWWA__PlQCVkM85pT1fd9klFCgTXZxsQ04T1YN2rD2cEIXdnLhJqVBNeWH9zBR3S-82GVffRTyeoAU77hoHrivoA41EgAC9anrHnwWNJFweovBSJUzXzYKkq9mcmRcpzYhzcOGsNJ_1IteWnM4HfgFEBqhJqo_sIBkwhQcy8_nOz1yiuhRppRsH8GxRxi87Lgsi34DNzOkNUS-QyHAQbJc5hUbhiFsas4LUSFeDR6NbrbRucIw_YdK0ZUORHT3I6Q5lzPkEw",
    category: "Home Decor",
    isNew: true
  },
  {
    id: "2",
    title: "Industrial Gear Stand",
    price: 29.00,
    description: "Adjustable phone stand with functional rotating gears. Printed in high-strength Carbon Fiber PLA.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZMt04RHTLfCa2XtA6nc2oFQMuirZL_b3ly6pd1rfWjRiQkWcKJjhc2lhbAJTavdkAQ6EVVmxVxSX4FsUr2s2c4XXq6msNwgHlNhlhr3x0q9FH6MFIrBe8PZ5Jh80L1CTNJJ0WD_HTw9pgVG2QmR8dGbOVtJ23FkGI-d-PiuK7IrAhpmKYC_pdQaqiCz8x1fpq5JsaeU-V3PHo9tYjR9tWj_TGuv6VimcrxmtnaXVcOAaulLEVwEFhjXshpsaKDoenPWFYKQ-fmXw",
    category: "Tech Gear"
  },
  {
    id: "3",
    title: "Resin Abstract Head",
    price: 110.00,
    description: "High-detail 8k Resin print with a smooth satin finish. Perfect for desktops and modern shelving.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd_ag0xgBY-RpzpNLs0WBgLE0nyjmBKqEoKmfeKRsbDkXixsF-rF-v7EiAwc99M5q4yD2ogIIjC7X2RtQrVHe1Xhuhvj0pYaxsMYd94kBnZvAPyN1CcbUoZz1kPIJ2-395C7f92uJ2cQBupcNA_b3afiOUbpUR1f56eESXZavSsXZ01Dv6DUsl3KLxSyVxIP80NjtgH3qIobmeuDWbzh07UN0Fy-gYYCyksv_hflk7e8lIcLwdXpZ89YT7Dw-elCz53jh0AlyYkbw",
    category: "Art"
  },
  {
    id: "4",
    title: "Custom Motor Housing",
    price: 65.00,
    description: "Industrial-grade housing unit for NEMA motors. Heat resistant and impact durable materials.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuChoPO9ULY3HInKJ2iws8TvO29Yhwo79vp4NUbrzH12wHJieqfqJPizOMR8AiNg-oVd5lU29BIYogZTH9XCH-YaKO0DpNIABmJwWJF6MG7c_v0uokqel5By6q4LDbpkaVSOdTV--hGprb0B2VMa1WuIIWDX2bf44hY4MqWvkBpJu107oDlszHFJoOKBL90kK4hQgzDyS_dnZ3zHU2eAOgfuZFf7yXTmiW_kSMiW9eZBP2UDSesP2ST2TvBPPkPasbZFI0T_fG6rgpo",
    category: "Industrial"
  },
  {
    id: "5",
    title: "Honeycomb Wall Tiles",
    price: 18.00,
    description: "Modular acoustic-inspired wall tiles. Price per set of 3. Includes magnetic mounting kit.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBARYQlodxAlZTHg9DvVRpnvhFIraFUmAQ4E6izOICrTZIn3McPjk3alIGu_gbx7ek3HWVpbCksLUtippGZmjRmQEnqAGsrfwV4v_I_YM-ULws7l8iIm3aiIHP59neuvLUFFsmXGYNwy4Hx_-AmlrEW5qoSmhn8eWRVk2Mg7FPdfZ0-7wU8-KFd_Vidlt-ht-2OfAebEWbkUvjKNLmusfTCwPmNiJyfsufbH3NPIuPoiWH1az7Ol9TjDUuA7mH3nkrqhv_s6QE1hwA",
    category: "Home Decor"
  },
  {
    id: "6",
    title: "Cyber-Knight Figure",
    price: 85.00,
    description: "Highly articulated 1/12 scale figure. Printed in a mix of tough resin and flexible TPU.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWLMFVF-IzODG23aTpj4QY2OrJcoO6xY-Yq6bgJaSwC9v8YU1AMZh1L2DY08ohuKZVX84q7o0DjtVT3OGua_XEixEGCCKp4YAbnxQC7TsXF_y-LV23lZ6aLNV9gSVjIMLiQR3ttVkOXm1xx55uh6oUP-hvctwNAWBB1TsAANKYcHpfOZjld4lFXcG8QhKoFo7Fup-EwyiAPK0O1rnf0BVVo3hKJFWsIwXo4xU182pgYZNQIIvuoOfIy0u_xVOkrgZJcsUx0hE9LXw",
    category: "Art"
  }
];

export default async function ShopPage() {
  const supabase = await createClient();
  const { data: dbProducts } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  // Use database products if available, otherwise fall back to mock data
  const products = dbProducts && dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex max-w-[1440px] mx-auto w-full px-6 py-8 gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_list</span>
              Filters
            </h3>
            
            {/* Categories */}
            <div className="space-y-4">
              <p className="text-primary text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">Category</p>
              <ul className="space-y-2">
                <li><button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">home</span> Home Decor</button></li>
                <li><button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all text-sm">
                  <span className="material-symbols-outlined text-sm">memory</span> Tech Gear</button></li>
                <li><button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all text-sm">
                  <span className="material-symbols-outlined text-sm">palette</span> Art</button></li>
                <li><button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all text-sm">
                  <span className="material-symbols-outlined text-sm">precision_manufacturing</span> Industrial</button></li>
              </ul>
            </div>
            
            {/* Material */}
            <div className="mt-8 space-y-4">
              <p className="text-primary text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">Material</p>
              <div className="flex flex-col gap-3 px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark" type="checkbox"/>
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">PLA (Standard)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark" type="checkbox"/>
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Resin (High Detail)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark" type="checkbox"/>
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Carbon Fiber</span>
                </label>
              </div>
            </div>
            
            {/* Price */}
            <div className="mt-8 space-y-4">
              <p className="text-primary text-xs font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">Price Range</p>
              <div className="px-2">
                <input className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary" max="500" min="0" type="range" defaultValue="250"/>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500 outline-none" placeholder="Search 3D prints..." type="text"/>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
              <select className="h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-slate-900 dark:text-white text-sm px-4 focus:ring-primary pr-10 outline-none">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="aspect-square relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
                  {product.isNew && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary text-white dark:text-background-dark text-[10px] font-black uppercase px-2 py-1 rounded">New</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors line-clamp-1" title={product.title}>{product.title}</h3>
                    <span className="text-primary font-black ml-2 whitespace-nowrap">${Number(product.price).toFixed(2)}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{product.description}</p>
                  <Link href={`/shop/${product.id}`} className="w-full h-10 bg-primary hover:bg-primary/90 text-white dark:text-background-dark font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    View Details
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white dark:text-background-dark font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

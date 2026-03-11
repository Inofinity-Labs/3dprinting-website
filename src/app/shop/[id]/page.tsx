import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

// Fallback mock data if the Supabase database is empty
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Geometric Polygon Vase",
    price: 45.00,
    description: "Engineered for both aesthetic appeal and structural integrity, this geometric vase is printed using high-grade, sustainable PLA material. The sharp polygonal edges catch light and shadow uniquely from every angle, making it a centerpiece for modern industrial spaces. Each piece is printed with extra-fine layer heights for a premium, injection-molded feel.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3JUeNWWA__PlQCVkM85pT1fd9klFCgTXZxsQ04T1YN2rD2cEIXdnLhJqVBNeWH9zBR3S-82GVffRTyeoAU77hoHrivoA41EgAC9anrHnwWNJFweovBSJUzXzYKkq9mcmRcpzYhzcOGsNJ_1IteWnM4HfgFEBqhJqo_sIBkwhQcy8_nOz1yiuhRppRsH8GxRxi87Lgsi34DNzOkNUS-QyHAQbJc5hUbhiFsas4LUSFeDR6NbrbRucIw_YdK0ZUORHT3I6Q5lzPkEw",
    category: "Home Decor",
  },
  {
    id: "2",
    title: "Industrial Gear Stand",
    price: 29.00,
    description: "Adjustable phone stand with functional rotating gears. Printed in high-strength Carbon Fiber PLA. The interlocking mechanisms provide smooth adjustment angles while maintaining a robust, industrial aesthetic.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZMt04RHTLfCa2XtA6nc2oFQMuirZL_b3ly6pd1rfWjRiQkWcKJjhc2lhbAJTavdkAQ6EVVmxVxSX4FsUr2s2c4XXq6msNwgHlNhlhr3x0q9FH6MFIrBe8PZ5Jh80L1CTNJJ0WD_HTw9pgVG2QmR8dGbOVtJ23FkGI-d-PiuK7IrAhpmKYC_pdQaqiCz8x1fpq5JsaeU-V3PHo9tYjR9tWj_TGuv6VimcrxmtnaXVcOAaulLEVwEFhjXshpsaKDoenPWFYKQ-fmXw",
    category: "Tech Gear"
  },
  {
    id: "3",
    title: "Resin Abstract Head",
    price: 110.00,
    description: "High-detail 8k Resin print with a smooth satin finish. Perfect for desktops and modern shelving. The intricate curves and smooth surfaces demonstrate the peak capabilities of resin printing technology.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd_ag0xgBY-RpzpNLs0WBgLE0nyjmBKqEoKmfeKRsbDkXixsF-rF-v7EiAwc99M5q4yD2ogIIjC7X2RtQrVHe1Xhuhvj0pYaxsMYd94kBnZvAPyN1CcbUoZz1kPIJ2-395C7f92uJ2cQBupcNA_b3afiOUbpUR1f56eESXZavSsXZ01Dv6DUsl3KLxSyVxIP80NjtgH3qIobmeuDWbzh07UN0Fy-gYYCyksv_hflk7e8lIcLwdXpZ89YT7Dw-elCz53jh0AlyYkbw",
    category: "Art"
  },
  {
    id: "4",
    title: "Custom Motor Housing",
    price: 65.00,
    description: "Industrial-grade housing unit for NEMA motors. Heat resistant and impact durable materials. Designed with optimal airflow channels for passive cooling during heavy operational loads.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuChoPO9ULY3HInKJ2iws8TvO29Yhwo79vp4NUbrzH12wHJieqfqJPizOMR8AiNg-oVd5lU29BIYogZTH9XCH-YaKO0DpNIABmJwWJF6MG7c_v0uokqel5By6q4LDbpkaVSOdTV--hGprb0B2VMa1WuIIWDX2bf44hY4MqWvkBpJu107oDlszHFJoOKBL90kK4hQgzDyS_dnZ3zHU2eAOgfuZFf7yXTmiW_kSMiW9eZBP2UDSesP2ST2TvBPPkPasbZFI0T_fG6rgpo",
    category: "Industrial"
  },
  {
    id: "5",
    title: "Honeycomb Wall Tiles",
    price: 18.00,
    description: "Modular acoustic-inspired wall tiles. Price per set of 3. Includes magnetic mounting kit. The hexagonal design allows for infinite expansion and custom pattern creation on any flat surface.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBARYQlodxAlZTHg9DvVRpnvhFIraFUmAQ4E6izOICrTZIn3McPjk3alIGu_gbx7ek3HWVpbCksLUtippGZmjRmQEnqAGsrfwV4v_I_YM-ULws7l8iIm3aiIHP59neuvLUFFsmXGYNwy4Hx_-AmlrEW5qoSmhn8eWRVk2Mg7FPdfZ0-7wU8-KFd_Vidlt-ht-2OfAebEWbkUvjKNLmusfTCwPmNiJyfsufbH3NPIuPoiWH1az7Ol9TjDUuA7mH3nkrqhv_s6QE1hwA",
    category: "Home Decor"
  },
  {
    id: "6",
    title: "Cyber-Knight Figure",
    price: 85.00,
    description: "Highly articulated 1/12 scale figure. Printed in a mix of tough resin and flexible TPU. Features over 20 points of articulation and interchangeable weapons for ultimate display versatility.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWLMFVF-IzODG23aTpj4QY2OrJcoO6xY-Yq6bgJaSwC9v8YU1AMZh1L2DY08ohuKZVX84q7o0DjtVT3OGua_XEixEGCCKp4YAbnxQC7TsXF_y-LV23lZ6aLNV9gSVjIMLiQR3ttVkOXm1xx55uh6oUP-hvctwNAWBB1TsAANKYcHpfOZjld4lFXcG8QhKoFo7Fup-EwyiAPK0O1rnf0BVVo3hKJFWsIwXo4xU182pgYZNQIIvuoOfIy0u_xVOkrgZJcsUx0hE9LXw",
    category: "Art"
  }
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  let product = null;

  // Supabase uses UUIDs for IDs. If it's not a UUID, don't query the DB to prevent thrown errors.
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  if (isUUID) {
    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    product = data;
  }

  // Fallback to mock data
  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.id === id);
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 lg:py-12">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${product.image_url}")` }}
              ></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* For demo purposes, repeating the same image for thumbnails */}
              <div className="aspect-square rounded-lg border-2 border-primary overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
              </div>
              <div className="aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
              </div>
              <div className="aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
              </div>
              <div className="aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <nav className="flex text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-500 mb-4 gap-2">
              <Link className="hover:text-primary" href="/">Home</Link>
              <span>/</span>
              <Link className="hover:text-primary" href="/shop">Shop</Link>
              <span>/</span>
              <span className="text-slate-400 dark:text-slate-400">{product.category || 'Product'}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-slate-400 text-sm">star</span>
                <span className="text-xs font-bold ml-1 text-slate-500 uppercase">12 Reviews</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed min-h-[120px]">
                  {product.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Dimensions</h4>
                  <p className="font-semibold">Standard</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Weight</h4>
                  <p className="font-semibold">Varies</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Material</h4>
                  <p className="font-semibold text-primary">Matte Finish PLA+</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Print Resolution</h4>
                  <p className="font-semibold">0.12mm Ultra-Fine</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700 w-fit">
                <button className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">remove</span></button>
                <input className="w-12 bg-transparent border-none text-center font-bold focus:ring-0 outline-none" type="text" defaultValue="1"/>
                <button className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">add</span></button>
              </div>
              <button className="flex-1 bg-primary text-white dark:text-background-dark py-4 rounded-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors">
                <span className="material-symbols-outlined font-bold">shopping_cart</span>
                Add to Cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-transparent rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs font-bold uppercase text-slate-500">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                Free Global Shipping
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                2-Year Durability Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">Customer Reviews</h2>
            <button className="text-sm font-bold text-primary uppercase border-b border-primary">Write a Review</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1 mb-3 text-primary">
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-bold mb-2">&quot;Flawless surface finish!&quot;</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The print quality is outstanding. I can barely see the layers. The matte finish looks very premium on my desk.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">AL</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Alex L. - Verified Buyer</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1 mb-3 text-primary">
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="font-bold mb-2">&quot;Stunning geometry&quot;</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Larger than I expected, which is great. It holds dried flowers perfectly. Shipping was fast and the packaging was industrial-grade.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">SM</div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Sarah M. - Verified Buyer</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/shop/7" className="group block">
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkM7dPkID6DqYUReit7RmigLep6pf8p_6afqh-8L602XZ3RIklZiphojxCwfCJH0qQGwu-jEWjqcCHHhn_UxforA_J83sTYbrLwAbOYVw8BjtDvx_XynQtMSxkBz7mq4n-unA_IgkJMPthPPfOSpaguhcYOpyPr28_Yf0hIM93TzkQzr8_mAOh2zF6i0V2HGbgvMCUyQFmTEWeZJAqWfHDzSAgdoE_uhRbQZiVBHwFGerYoatyWuoCHHEyWsAZ6Neq_NfjEN8I09Q")' }}></div>
              </div>
              <h3 className="font-bold text-sm uppercase mb-1">Cyber Desk Organizer</h3>
              <p className="text-primary font-bold">$32.00</p>
            </Link>
            
            <Link href="/shop/8" className="group block">
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsMdoxFXiixPkCmdSPsOHPMnow-5jy00fUjmTzu9Hu3EsuflkuCpyOKTi7VdrovcSAkXknhK4-iAOptk0rQIB3jI-b5lwH1C-EsL5uqM4ixI8mxx4gxLSiTadnF1DzWHUDhTT5TvioA0PMSR3wwRGMtlFECV5pFlQtNGcn6wIM_OngbPT0lKT93KwP_5EGMg3cnSt--7WTmy0OAlqF7zoeaAo4TQpWOU88k4UmKZvaKBZ2psmG71BGLCnUtURi7PfaurYmhzXSbHI")' }}></div>
              </div>
              <h3 className="font-bold text-sm uppercase mb-1">Industrial Planter</h3>
              <p className="text-primary font-bold">$28.00</p>
            </Link>

            <Link href="/shop/9" className="group block">
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCltMoeNktud_onq1bb2Y-UnZiaSouS1XmZrHoBiY9p7DwWhj1g3SFRwcTAfyGsodIX8qKa5odZM4Vg_AQr31aNY5PdBPG1-v9xcHQaA4rJB_Og8EQUz0IQGVY16dPjHlGPYLHSeOYL4jn7ajRniVoo935klXRXIEd8SMPWFPHUjwdqrEThmrLN2Xu5aShyTbqi5T8Ibndv51nWXtBONZGdApLzXUwuHb47Js5sG0u7SjwcvpG-ViXgGeFt_JxvOxuiIHJMJJ0m9N8")' }}></div>
              </div>
              <h3 className="font-bold text-sm uppercase mb-1">Hexagon Wall Tiles</h3>
              <p className="text-primary font-bold">$18.00</p>
            </Link>

            <Link href="/shop/10" className="group block">
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCX0IX-OM5BwG4Ifza1pGrFVqVlzFXr_acDDz8ygR4DITF_Ttj7vH3ddxJOj-Ex1euGlStJZAI0QXCqgiJokTTq-4G2QlYEGeGYmeRaSgmYwNTY4V_8J7DvLIr8qUTCIRtw-Eb2XNrP8_m2pSLUd0L0yhLPLGfE3qZGSqR7ANlkYrIe_94gf7lvT-Q2PWgSC0ub39ZL4LiCyrypdyYuGll9-F6ZeU9sbSI29Eu8If9ZqMoamR_c9ku0fS1siW1DUYgBcv6gOZyf0jw")' }}></div>
              </div>
              <h3 className="font-bold text-sm uppercase mb-1">Vortex Lamp Shade</h3>
              <p className="text-primary font-bold">$55.00</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); // Redirect if not logged in
  }

  // Fetch quotes (custom print requests)
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*, materials(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch orders (checkout purchases)
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Mock data for fallback if they have no quotes yet
  const displayQuotes = quotes && quotes.length > 0 ? quotes : [
    {
      id: 'mock-1',
      file_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHQgml_OvlvmAL-ot9zr4ocCi37IkcMnM2f6zEtfL9uU8MD9xagOyDa69V4t3DKFEA-u9mycQG-ukwsvBDYYNAyR_HQJDKZOnaLRDSYeOLliil7YaGT2lTTL31xzsqlNJ1VmM7oZQpPwnlfjHZ_PmhAc4dg7FxVoTF1RVZOy-TNc2jSe0AUfeVYjqlthVEzM454ALMszOWLqEyYQZXewvVtiMpMI3huAQV27nD_JsLQpnRJfRz4kpnY93ttpVwWhSBomri3Zu7JQ0',
      status: 'printing',
      notes: 'Turbine_Housing_V4.stl',
      materials: { name: 'PETG-CF' },
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-2',
      file_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASalBY5Ok7y03pp-osNhnc0JgzSrGsO9AVFwTQBU-5qw0yv7ByB-hrk9iqacOZHbGDkZGOO2z2TTbMwecmEjRyq3tZ3BHqY-870qD3n_U5tH9XPCfAgU7Ggof0cO8eE9PbnOXdUUBMwMwSMserjudeF1c3fGUOi5DXIpJqTnjwd0pKHH_9-rs4pMnyW30qy75tIVZ2bozfyxgnxv6B-glsfhSJ8zlCon2W2Q9S1MsjdBDqzsvwypND8E3UmzcZIn4GuMNTNFwAQ8s',
      status: 'pending',
      notes: 'Actuator_Arm_Joint.obj',
      materials: { name: 'Rigid 10K Resin' },
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const displayOrders = orders || [];
  const activeOrdersCount = displayOrders.filter(o => ['processing', 'printing', 'shipping'].includes(o.status)).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 flex flex-col gap-8">
          
          {/* User Account Overview */}
          <div className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
            <div className="flex flex-col items-center text-center">
              <div className="size-24 rounded-2xl bg-gradient-to-br from-primary to-amber-600 p-1 mb-4">
                {/* Default Avatar for user */}
                <div className="w-full h-full rounded-xl bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate w-full px-2">
                {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
              </h3>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">Standard Tier</p>
              
              <div className="mt-4 flex gap-2 w-full">
                <Link href="/user/profile" className="flex-1 bg-primary text-white dark:text-background-dark text-xs font-bold py-2 rounded uppercase hover:bg-amber-500 transition-colors flex items-center justify-center">Edit Profile</Link>
                <button className="px-2 bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">
                  <span className="material-symbols-outlined text-sm">settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 mb-1">Navigation</p>
            <Link href="/user/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-semibold">Overview</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="text-sm font-semibold">My Library / Quotes</span>
            </Link>
            <Link href="#orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="text-sm font-semibold">Order History</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
              <span className="material-symbols-outlined">credit_card</span>
              <span className="text-sm font-semibold">Billing</span>
            </Link>
            <Link href="/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
              <span className="material-symbols-outlined">help</span>
              <span className="text-sm font-semibold">Tech Support</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          
          {/* Metrics Bar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">view_in_ar</span>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{quotes ? quotes.length : 0}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">layers</span>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">Active Orders</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{activeOrdersCount}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">Avg. Turnaround</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">48 <span className="text-sm font-normal text-slate-500 dark:text-slate-400">hrs</span></p>
              </div>
            </div>
          </section>

          {/* User Orders / Purchases */}
          <section id="orders">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                Order History
              </h2>
              <Link href="/shop" className="text-primary text-xs font-bold uppercase hover:underline">Shop Models</Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {displayOrders.length === 0 ? (
                <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-zinc-700 mb-3">shopping_bag</span>
                  <p className="text-slate-500 text-sm font-medium">You haven&apos;t placed any orders yet.</p>
                </div>
              ) : (
                displayOrders.map((order: any) => (
                  <div key={order.id} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined">local_shipping</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">Order #{order.id.slice(0, 8).toUpperCase()}</h4>
                        <p className="text-xs text-slate-500">Placed: {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-8 md:gap-12 w-full md:w-auto mt-4 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">${Number(order.total_amount).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</span>
                        <span className={`text-sm font-bold uppercase ${
                          ['processing', 'printing'].includes(order.status) ? 'text-primary' : 
                          order.status === 'delivered' ? 'text-green-500' : 'text-slate-600 dark:text-slate-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <Link href={`/track/${order.id}`} className="px-4 py-2 border border-slate-200 dark:border-zinc-700 hover:border-primary hover:bg-primary/5 hover:text-primary rounded-lg text-sm font-bold transition-all ml-auto md:ml-0">
                        View
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* User Quotes / Active Print Jobs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                My Projects & Quotes
              </h2>
              <Link href="/quote" className="text-primary text-xs font-bold uppercase hover:underline">New Request</Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {displayQuotes.map((quote: any, idx: number) => {
                const isMock = String(quote.id).startsWith('mock-');
                const title = quote.notes || `Quote Project #${String(quote.id).slice(0,5)}`;
                const matName = quote.materials?.name || 'Standard PLA';
                // For mock, use the embedded url. For real, we use a placeholder image.
                const bgUrl = isMock ? quote.file_url : "https://lh3.googleusercontent.com/aida-public/AB6AXuCHQgml_OvlvmAL-ot9zr4ocCi37IkcMnM2f6zEtfL9uU8MD9xagOyDa69V4t3DKFEA-u9mycQG-ukwsvBDYYNAyR_HQJDKZOnaLRDSYeOLliil7YaGT2lTTL31xzsqlNJ1VmM7oZQpPwnlfjHZ_PmhAc4dg7FxVoTF1RVZOy-TNc2jSe0AUfeVYjqlthVEzM454ALMszOWLqEyYQZXewvVtiMpMI3huAQV27nD_JsLQpnRJfRz4kpnY93ttpVwWhSBomri3Zu7JQ0";

                return (
                  <div key={quote.id} className="bg-slate-50 dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-32 aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
                    </div>
                    <div className="flex-1 w-full flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-sm" title={title}>{title}</h4>
                          <p className="text-slate-500 text-xs">Material: {matName} | Status: <span className="uppercase text-[10px] font-bold tracking-wider">{quote.status}</span></p>
                        </div>
                        {quote.status === 'printing' && <span className="text-primary font-mono text-sm font-bold">In Progress</span>}
                        {quote.status === 'pending' && <span className="text-amber-500 font-mono text-sm font-bold">Reviewing</span>}
                        {quote.status === 'approved' && <span className="text-green-500 font-mono text-sm font-bold">Approved</span>}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-4">
                        <span>Submitted: {new Date(quote.created_at).toLocaleDateString()}</span>
                        {quote.estimated_price && <span className="text-primary text-sm font-black">${Number(quote.estimated_price).toFixed(2)}</span>}
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 w-full md:w-auto">
                      <button className="flex-1 md:w-10 h-10 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 rounded flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Library/Designs Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">My Library</h2>
              <div className="flex gap-2">
                <button className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                </button>
                <Link href="/quote" className="bg-primary hover:bg-amber-500 text-white dark:text-background-dark text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-sm font-bold">upload</span> Upload
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {displayQuotes.map((quote: any) => {
                const isMock = String(quote.id).startsWith('mock-');
                const title = quote.notes || `Quote Project #${String(quote.id).slice(0,5)}`;
                const bgUrl = isMock ? quote.file_url : "https://lh3.googleusercontent.com/aida-public/AB6AXuBxP-6iyPzKnieArAwt0XeiQlgfBFH4oFl6TsC1LTheq6pckKDueuVNz1WP7_5oQ33oWoAgFOaKK-ZRZYv3hw6bZWig2svV6Nl5bgveOBUFWRpN0Gc3elcUtPRDFE7enH46jz4tjZ8nJfiCEoeKOdHKSzL_DsLljEPtEbmmQaQiRPIOtgmgqgJUB0AwekU-8qzhijDnUXCstwBrWTXNhCFMWpmgg1GWZuxvb6aja-BKsH8iC2P-iCwgvHe54a3wVLrs53EvQJuSpeg";

                return (
                  <div key={`lib-${quote.id}`} className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden group">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
                      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="size-10 rounded-full bg-primary text-white dark:text-background-dark flex items-center justify-center hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">print</span>
                        </button>
                        <button className="size-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate pr-2">{title}</h5>
                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors">more_vert</span>
                      </div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold mt-1">Uploaded: {new Date(quote.created_at).toLocaleDateString()}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-sm">history</span> {quote.status}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

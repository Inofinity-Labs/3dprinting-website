import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/'); 
  }

  const { id: orderId } = await params;
  
  // Basic check for UUID format before querying
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  let order = null;

  if (uuidRegex.test(orderId)) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (data) order = data;
  }

  // Fallback if not found (for static demo)
  if (!order) {
    if (orderId === '123456') {
      order = {
        id: '123456',
        created_at: '2023-10-12T10:30:00Z',
        status: 'printing',
        total_amount: 452.12,
        shipping_address: { city: 'Austin', state: 'TX' }
      }
    } else {
      notFound();
    }
  }

  const orderDate = new Date(order.created_at);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 6); // Add 6 days for demo

  // Calculate generic progress based on status
  // 'processing', 'printing', 'shipping', 'delivered'
  const statuses = ['ordered', 'processing', 'printing', 'shipping', 'delivered'];
  let currentStep = 1;
  let progressPct = 25;
  
  if (order.status === 'processing') { currentStep = 2; progressPct = 35; }
  else if (order.status === 'printing') { currentStep = 3; progressPct = 62.5; }
  else if (order.status === 'shipping') { currentStep = 4; progressPct = 85; }
  else if (order.status === 'delivered') { currentStep = 5; progressPct = 100; }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">
              <Link href="/user/dashboard" className="hover:text-primary transition-colors">Orders</Link>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-primary truncate max-w-[150px]">#{order.id.slice(0, 8).toUpperCase()}</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Track Your Production</h1>
            <p className="text-slate-500 mt-1">Order placed on {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString()}</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Estimated Delivery</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{deliveryDate.toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tracking & Status */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Progress Card */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-tight">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Current Status: {order.status}
                </h3>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">{progressPct}% COMPLETE</span>
              </div>
              
              {/* Visual Progress Bar */}
              <div className="relative mb-12">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
                </div>
                
                <div className="relative flex justify-between">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`size-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white dark:text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-zinc-700'} flex items-center justify-center z-10`}>
                      <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tighter ${currentStep >= 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Ordered</span>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`size-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white dark:text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-zinc-700'} flex items-center justify-center z-10`}>
                      <span className="material-symbols-outlined text-[20px] font-bold">{currentStep > 2 ? 'check' : 'autorenew'}</span>
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tighter ${currentStep === 2 ? 'text-primary' : currentStep > 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Processing</span>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`size-10 rounded-full ${currentStep >= 3 ? 'bg-primary text-white dark:text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-zinc-700'} flex items-center justify-center z-10`}>
                      <span className="material-symbols-outlined text-[20px]">{currentStep > 3 ? 'check' : 'precision_manufacturing'}</span>
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tighter ${currentStep === 3 ? 'text-primary' : currentStep > 3 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Printing</span>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`size-10 rounded-full ${currentStep >= 4 ? 'bg-primary text-white dark:text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-zinc-700'} flex items-center justify-center z-10`}>
                      <span className="material-symbols-outlined text-[20px]">{currentStep > 4 ? 'check' : 'local_shipping'}</span>
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tighter ${currentStep === 4 ? 'text-primary' : currentStep > 4 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Shipped</span>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center">
                    <div className={`size-10 rounded-full ${currentStep >= 5 ? 'bg-primary text-white dark:text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-zinc-700'} flex items-center justify-center z-10`}>
                      <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-tighter ${currentStep >= 5 ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Status Log */}
              <div className="space-y-6">
                <h4 className="text-primary text-xs font-bold uppercase tracking-widest border-b border-slate-200 dark:border-zinc-800 pb-2 mb-4">Activity Log</h4>
                <div className="space-y-4">
                  
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center pt-1.5 h-full absolute left-0">
                      <div className="size-2 rounded-full bg-primary animate-pulse relative z-10 flex-shrink-0"></div>
                      <div className="w-0.5 h-full bg-slate-200 dark:bg-zinc-800 absolute top-2.5"></div>
                    </div>
                    <div className="ml-6 pb-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Order updated to {order.status}</p>
                      <p className="text-xs text-slate-500">System Notification</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center pt-1.5 h-full absolute left-0">
                      <div className="size-2 rounded-full bg-slate-300 dark:bg-slate-600 relative z-10 flex-shrink-0"></div>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Order Placed Successfully</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{orderDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Map/Shipping Update */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-0 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-zinc-900/50">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span className="material-symbols-outlined text-primary">map</span>
                  Destination
                </h3>
                <span className="text-xs font-medium text-slate-500">{order.shipping_address?.city || 'Unknown City'}, {order.shipping_address?.state || ''}</span>
              </div>
              <div className="h-64 bg-slate-100 dark:bg-slate-800 relative">
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://placeholder.pics/svg/800x400')" }}
                ></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                    <div className="relative size-6 bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-xl"></div>
                  </div>
                </div>
                
                {/* Tech HUD overlay */}
                <div className="absolute bottom-4 left-4 p-3 bg-white/90 dark:bg-background-dark/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-primary/30 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    </div>
                    <div className="text-[10px] text-slate-900 dark:text-white">
                      <p className="text-slate-500 dark:opacity-60">CARRIER</p>
                      <p className="font-bold text-sm">FedEx Express</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Items Card */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Order Summary</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCH3S69IgqlNEKA0oqXscEA6vHA1c00m3g0mTQ5ZNJwSs5IoMRTu2EMoSEPzQ1g445za-qpHFC9JvNY888D_fkZ9ktugIzHNJgSMXaqCTrKMDazN-FDp8dPrzsWL7-nW_wdoI-4ZDxtbSwxYcYeZ8yHEcaVCSZGGfvoo2NhC3d74I5LlBgpl-FqZYAfOHAOgyzTeJ7OeSi2Y6hCNEzx66MxF2qi3SDEu0w8o7raniHxEhuez1JHvMvfBDS91JKUBNbAgkPEr3MdP34')" }}></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Industrial Gear Housing</p>
                    <p className="text-xs text-slate-500">Carbon Fiber Nylon (PA-CF)</p>
                    <p className="text-xs font-medium text-primary mt-1">Qty: 2</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                  <span className="text-slate-900 dark:text-white">Total</span>
                  <span className="text-primary">${Number(order.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions & Help */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-primary text-white dark:text-background-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-500 transition-all shadow-md shadow-primary/10">
                <span className="material-symbols-outlined text-[20px]">description</span>
                Download Invoice (PDF)
              </button>
              <button className="w-full py-4 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-slate-100 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-all">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                Contact Production Lead
              </button>
              
              <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl">
                <h4 className="text-sm font-bold mb-2 text-slate-900 dark:text-white">Need to modify your order?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">Orders can only be modified during the &apos;Ordered&apos; or &apos;Processing&apos; stages. Please contact support for critical changes.</p>
                <Link className="text-xs font-bold text-primary hover:underline hover:text-amber-500 transition-colors" href="#">Read Policy →</Link>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

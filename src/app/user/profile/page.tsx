import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function UserProfilePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      
      <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 hidden md:flex flex-col shrink-0 min-h-[calc(100vh-80px)]">
          <div className="p-6 flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800">
            <div className="bg-primary p-1.5 rounded text-white dark:text-background-dark">
              <span className="material-symbols-outlined block">precision_manufacturing</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase italic text-primary">Forge3D</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/user/dashboard" className="flex items-center gap-3 px-4 py-3 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-semibold">Overview</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <span className="material-symbols-outlined">package_2</span>
              <span className="text-sm font-medium">Orders</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <span className="material-symbols-outlined">folder_open</span>
              <span className="text-sm font-medium">My Files</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <span className="material-symbols-outlined">payments</span>
              <span className="text-sm font-medium">Billing</span>
            </Link>
          </nav>
          
          <div className="p-4 border-t border-slate-200 dark:border-zinc-800 space-y-2">
            <Link href="/user/profile" className="flex items-center gap-3 px-4 py-3 rounded bg-primary/10 text-primary border-l-2 border-primary transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-semibold">Settings</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Header Navbar */}
          <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/90 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Search orders, files, or parts..." type="text"/>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-zinc-800"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Viktor Industrial</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-tighter">ID: #8821-XP</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeIm4z5xC09W82Mig3gxYiv1vW2hM4tdQyBo6nPux_Fe7SJsgrUXpd7pEIkoIooYMA7OzTyR19W4ytTry_IXZvsuqLtJI8NwzcOO5MIpTgG1JrHEpHfeoc1E0hSW4n7m_IcoC_fL2gAIe-O8l1xGrdFRWV-i3MJON8gmVZDGtSc7rd9H1W_6F7antDETDpwDd8-T4PChGWU97rde2-zwroNSw8L5xtNODiNlx8I-S7JdT5k6hoRxbI0uw2kcW7MUhAEhtnnF23ZQk')" }}></div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-7xl mx-auto space-y-8">
            
            {/* Profile Header */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 text-slate-900 dark:text-white pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">architecture</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-white dark:text-background-dark shadow-xl shadow-primary/10">
                    <span className="material-symbols-outlined text-5xl">person</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Viktor Industrial</h1>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      Member since October 2023
                    </p>
                    <div className="flex gap-4 mt-3">
                      <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase rounded">Pro Tier</span>
                      <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase rounded">12 Projects</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link href="/quote" className="px-6 py-2.5 bg-primary hover:bg-amber-500 text-white dark:text-background-dark font-bold rounded transition-colors uppercase text-sm tracking-widest text-center flex items-center">
                    New Order
                  </Link>
                  <button className="px-6 py-2.5 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-bold rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors uppercase text-sm tracking-widest bg-white dark:bg-transparent">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* My Active Orders */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">dynamic_feed</span>
                    Active Prints
                  </h3>
                  <Link href="/user/orders" className="text-primary text-sm font-bold hover:underline">View All</Link>
                </div>
                
                <div className="space-y-4">
                  {/* Order Item 1 */}
                  <Link href="/track/9001" className="block bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-lg group hover:border-primary/40 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white dark:bg-background-dark border border-slate-200 dark:border-zinc-800 rounded p-2 overflow-hidden flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-3xl">3d_rotation</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Engine V8 Turbine Case</h4>
                          <p className="text-xs font-mono text-slate-500 uppercase">Batch #9001-A • Resin Tough-Black</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase rounded border border-primary/30">Printing</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">Est. 4h 12m</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400 uppercase">Progress</span>
                        <span className="text-primary font-bold">78%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-background-dark h-1.5 rounded-full overflow-hidden border border-slate-300 dark:border-zinc-800">
                        <div className="bg-primary h-full w-[78%] rounded-full shadow-[0_0_8px_rgba(255,179,0,0.5)]"></div>
                      </div>
                    </div>
                  </Link>

                  {/* Order Item 2 */}
                  <Link href="/track/8922" className="block bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-lg group hover:border-primary/40 transition-all opacity-80 hover:opacity-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white dark:bg-background-dark border border-slate-200 dark:border-zinc-800 rounded p-2 overflow-hidden flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-3xl">view_in_ar</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Custom Keyboard Plate v2</h4>
                          <p className="text-xs font-mono text-slate-500 uppercase">Batch #8922-K • PLA Carbon Fiber</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase rounded border border-slate-300 dark:border-slate-700">In Queue</span>
                        <p className="text-xs text-slate-500 mt-2 font-mono">Position #3</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400 uppercase">Progress</span>
                        <span className="text-slate-500 font-bold">0%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-background-dark h-1.5 rounded-full overflow-hidden border border-slate-300 dark:border-zinc-800">
                        <div className="bg-slate-400 dark:bg-slate-700 h-full w-0 rounded-full"></div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Side Stats / Quick Actions */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Filament</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4.2 <span className="text-xs text-slate-500">kg</span></p>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Print Time</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">128 <span className="text-xs text-slate-500">h</span></p>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-lg col-span-2">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Account Credits</p>
                    <p className="text-2xl font-bold text-primary font-mono">Rs. 42,750</p>
                  </div>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 p-5 rounded-lg">
                  <p className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">bolt</span>
                    SYSTEM STATUS
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Industrial Hub 07 is currently at 85% capacity. Priority prints are available for Pro Members.</p>
                </div>
              </div>
            </div>

            {/* Custom Designs Gallery */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">deployed_code</span>
                  My Custom Designs
                </h3>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline hover:text-amber-500 transition-colors">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  Upload New File
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* File 1 */}
                <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-slate-100 dark:bg-background-dark relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(#FFB300_1px,transparent_1px)] [background-size:10px_10px]"></div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-6xl group-hover:scale-110 group-hover:text-primary/40 transition-transform duration-500">architecture</span>
                    <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-background-dark/80 px-2 py-1 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">STL / 14.2MB</div>
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-transparent">
                    <p className="font-bold text-slate-900 dark:text-slate-200 truncate">Hinge_Mechanism_v4</p>
                    <p className="text-xs text-slate-500 mt-1">Uploaded 2 days ago</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 text-[10px] font-bold uppercase rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Configure</button>
                      <button className="px-2 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-sm block">download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* File 2 */}
                <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-slate-100 dark:bg-background-dark relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(#FFB300_1px,transparent_1px)] [background-size:10px_10px]"></div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-6xl group-hover:scale-110 group-hover:text-primary/40 transition-transform duration-500">token</span>
                    <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-background-dark/80 px-2 py-1 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">OBJ / 8.1MB</div>
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-transparent">
                    <p className="font-bold text-slate-900 dark:text-slate-200 truncate">Replacement_Gear_Final</p>
                    <p className="text-xs text-slate-500 mt-1">Uploaded 1 week ago</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 text-[10px] font-bold uppercase rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Configure</button>
                      <button className="px-2 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-sm block">download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* File 3 */}
                <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="aspect-video bg-slate-100 dark:bg-background-dark relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(#FFB300_1px,transparent_1px)] [background-size:10px_10px]"></div>
                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-6xl group-hover:scale-110 group-hover:text-primary/40 transition-transform duration-500">settings_input_component</span>
                    <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-background-dark/80 px-2 py-1 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">STEP / 22MB</div>
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-transparent">
                    <p className="font-bold text-slate-900 dark:text-slate-200 truncate">Bracket_Mount_X</p>
                    <p className="text-xs text-slate-500 mt-1">Uploaded 1 week ago</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 text-[10px] font-bold uppercase rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Configure</button>
                      <button className="px-2 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-sm block">download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* File 4 (Empty State Action) */}
                <div className="border-2 border-dashed border-slate-300 dark:border-zinc-800 rounded-lg flex flex-col items-center justify-center gap-3 p-6 group hover:border-primary/50 hover:bg-primary/[0.02] transition-colors cursor-pointer bg-slate-50 dark:bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">add</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Add New File</p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="space-y-6 pb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Order History
              </h3>
              
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">Order ID</th>
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">Date</th>
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">Items</th>
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">Total</th>
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800">Status</th>
                      <th className="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300 font-bold">#ORD-4412</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Sept 22, 2023</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">Drone Arm (x4)</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-mono">Rs. 25,260</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></span>
                          Shipped
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/track/4412" className="text-primary hover:text-amber-600 dark:hover:text-primary/80 font-bold uppercase text-[10px] transition-colors">Details</Link>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300 font-bold">#ORD-4398</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Sept 15, 2023</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">Enclosure Box</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-mono">Rs. 9,600</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></span>
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/track/4398" className="text-primary hover:text-amber-600 dark:hover:text-primary/80 font-bold uppercase text-[10px] transition-colors">Details</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300 font-bold">#ORD-4301</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Aug 30, 2023</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">Prototype v1</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-mono">$124.00</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></span>
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/track/4301" className="text-primary hover:text-amber-600 dark:hover:text-primary/80 font-bold uppercase text-[10px] transition-colors">Details</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-4 border-t border-slate-200 dark:border-zinc-800 text-center bg-slate-50 dark:bg-transparent">
                  <button className="text-slate-500 text-xs font-bold uppercase hover:text-slate-700 dark:hover:text-slate-300 transition-colors tracking-widest">Load More History</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}

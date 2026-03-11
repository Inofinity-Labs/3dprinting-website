import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl">view_in_ar</span>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Print3D</h2>
          </div>
          <p className="text-slate-500 text-sm">The world&apos;s premier destination for custom 3D printing and digital manufacturing solutions.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li><Link className="hover:text-primary" href="/shop">All Models</Link></li>
            <li><Link className="hover:text-primary" href="#">Featured Artists</Link></li>
            <li><Link className="hover:text-primary" href="#">Materials</Link></li>
            <li><Link className="hover:text-primary" href="#">Gift Cards</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold">Support</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li><Link className="hover:text-primary" href="#">Help Center</Link></li>
            <li><Link className="hover:text-primary" href="#">Print Guide</Link></li>
            <li><Link className="hover:text-primary" href="#">Shipping Info</Link></li>
            <li><Link className="hover:text-primary" href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold">Contact</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">mail</span> support@print3d.com</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">call</span> +1 (555) 000-0000</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Print3D E-Commerce. All rights reserved. Built with precision.
      </div>
    </footer>
  );
}

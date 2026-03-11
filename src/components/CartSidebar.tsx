"use client";

import { useCart } from "@/contexts/CartContext";
import { formatLKR } from "@/utils/currency";
import Link from "next/link";
import { useEffect } from "react";

export default function CartSidebar() {
  const { state, removeFromCart, updateQuantity, toggleCart, getTotalPrice, getTotalItems } = useCart();

  // Close cart when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen, toggleCart]);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 z-50 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Shopping Cart ({getTotalItems()})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500 dark:text-zinc-400">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <span className="material-symbols-outlined text-6xl text-zinc-300 dark:text-zinc-700 mb-4">
                shopping_cart
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-slate-500 dark:text-zinc-400 mb-6">Add some products to get started!</p>
              <Link
                href="/shop"
                onClick={toggleCart}
                className="px-6 py-3 bg-primary text-white dark:text-background-dark rounded-lg font-bold uppercase tracking-wide hover:bg-amber-500 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                  
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${item.image_url}")` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400">inventory_2</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mb-2">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {formatLKR(item.price)}
                      </span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xs">remove</span>
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xs">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors self-start"
                  >
                    <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer/Checkout */}
        {state.items.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-black text-slate-900 dark:text-white">
              <span>Total:</span>
              <span className="text-primary">{formatLKR(getTotalPrice())}</span>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="w-full bg-primary text-white dark:text-background-dark py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">payment</span>
                Proceed to Checkout
              </Link>
              
              <button
                onClick={toggleCart}
                className="w-full border border-zinc-300 dark:border-zinc-700 text-slate-900 dark:text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
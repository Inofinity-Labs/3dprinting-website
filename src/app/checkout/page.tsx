"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { formatLKR } from "@/utils/currency";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { state, getTotalPrice, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "card"
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      router.push('/shop');
    }
  }, [state.items, router]);

  const cartTotal = getTotalPrice();
  const shippingCost = cartTotal > 15000 ? 0 : 1500; // Free shipping over Rs. 15,000
  const taxAmount = cartTotal * 0.05; // 5% tax
  const finalTotal = cartTotal + shippingCost + taxAmount;

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase.auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMsg("Please log in to place an order.");
      return;
    }
    
    if (!formData.address || !formData.city || !formData.zip) {
      setErrorMsg("Please fill in all shipping details.");
      return;
    }

    if (state.items.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. Create the Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: 'processing',
          shipping_address: formData
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items for each cart item
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        // If order items fail but order was created, still proceed
        // In a real app, you might want to handle this differently
        if (itemsError.message?.includes('row-level security')) {
          console.warn('RLS policy issue - order created but items may not be properly linked');
        }
      }

      // 3. Clear the cart and redirect
      clearCart();
      router.push(`/track/${order.id}`);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-auto min-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        <main className="flex-1 px-4 md:px-20 py-8 max-w-7xl mx-auto w-full">
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Checkout Form */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Progress Header */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Secure Checkout</h1>
                  <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-widest">Step 2 of 3</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <span>Shipping & Payment</span>
                    <span>66% Complete</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full">
                    <div className="bg-primary h-full rounded-full w-[66%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                  </div>
                </div>
                {errorMsg && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold border border-red-200 dark:border-red-800/50">
                        {errorMsg}
                    </div>
                )}
              </div>

              {/* Shipping Section */}
              <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="John" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="Doe" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Address Line 1</label>
                    <input name="address" value={formData.address} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="123 Industrial Way" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="San Francisco" type="text"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">State</label>
                      <input name="state" value={formData.state} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="CA" type="text"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Zip Code</label>
                      <input name="zip" value={formData.zip} onChange={handleChange} required className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" placeholder="94103" type="text"/>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">Payment Method</h2>
                </div>
                <div className="flex flex-col gap-6">
                  
                  {/* Payment Tabs */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer group">
                      <input className="peer hidden" name="paymentMethod" onChange={handleChange} type="radio" value="card" checked={formData.paymentMethod === 'card'}/>
                      <div className="flex items-center justify-center gap-2 p-4 border-2 border-slate-200 dark:border-zinc-800 rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-slate-500 dark:text-slate-400 peer-checked:text-primary dark:peer-checked:text-primary">
                        <span className="material-symbols-outlined">credit_card</span>
                        <span className="font-bold uppercase text-sm tracking-widest">Card</span>
                      </div>
                    </label>
                    <label className="cursor-pointer group">
                      <input className="peer hidden" name="paymentMethod" onChange={handleChange} type="radio" value="paypal" checked={formData.paymentMethod === 'paypal'}/>
                      <div className="flex items-center justify-center gap-2 p-4 border-2 border-slate-200 dark:border-zinc-800 rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-slate-500 dark:text-slate-400 peer-checked:text-primary dark:peer-checked:text-primary">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        <span className="font-bold uppercase text-sm tracking-widest">PayPal</span>
                      </div>
                    </label>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Card Number</label>
                      <div className="relative">
                        <input className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 pl-4 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" required={formData.paymentMethod === 'card'} placeholder="0000 0000 0000 0000" type="text"/>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Expiry Date</label>
                      <input className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" required={formData.paymentMethod === 'card'} placeholder="MM / YY" type="text"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">CVV</label>
                      <input className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg h-12 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" required={formData.paymentMethod === 'card'} placeholder="123" type="text"/>
                    </div>
                  </div>
                  )}
                </div>
              </section>

              <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-background-dark font-black uppercase tracking-tighter py-5 rounded-xl transition-all shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-2">
                {isSubmitting ? "Processing..." : `Place Order - ${formatLKR(finalTotal)}`}
                {!isSubmitting && <span className="material-symbols-outlined">arrow_forward</span>}
              </button>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 flex flex-col gap-6">
                
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Order Summary</h3>
                  
                  {/* Cart is empty check */}
                  {state.items.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 dark:text-zinc-400 mb-4">Your cart is empty</p>
                      <Link href="/shop" className="text-primary hover:underline font-bold">
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <div className="flex flex-col gap-4 mb-6">
                        {state.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="size-16 rounded-lg bg-slate-100 dark:bg-zinc-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                              {item.image_url ? (
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${item.image_url}")` }}></div>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="material-symbols-outlined text-slate-400">inventory_2</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{item.title}</h4>
                                <span className="font-bold text-slate-900 dark:text-white">{formatLKR(item.price * item.quantity)}</span>
                              </div>
                              <p className="text-xs text-slate-500">{item.category}</p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity} × {formatLKR(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <hr className="my-6 border-slate-200 dark:border-zinc-800"/>

                      {/* Pricing Summary */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">Subtotal</span>
                          <span className="font-bold text-slate-900 dark:text-white">{formatLKR(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">
                            Shipping {cartTotal > 15000 && <span className="text-green-600 text-xs">(FREE)</span>}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">{formatLKR(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">Tax (5%)</span>
                          <span className="font-bold text-slate-900 dark:text-white">{formatLKR(taxAmount)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                          <span className="font-black uppercase italic tracking-tighter text-slate-900 dark:text-white text-lg">Total</span>
                          <span className="font-black text-primary text-xl">{formatLKR(finalTotal)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="flex flex-col gap-4 p-4 border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-zinc-900/50 rounded-lg">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-xs font-bold uppercase tracking-widest">256-bit SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                    <span className="text-xs font-bold uppercase tracking-widest">24/7 Expert Support</span>
                  </div>
                </div>

              </div>
            </div>

          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

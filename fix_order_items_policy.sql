-- Fix RLS policy for order_items table
-- Add missing INSERT policy to allow users to insert order items for their own orders

create policy "Users can insert order items for their own orders" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );
-- Sample data for 3D Printing Website
-- Insert sample materials first (since products might reference them)

-- Materials for 3D Printing
INSERT INTO public.materials (id, name, description, type, price_per_cm3, tensile_strength, heat_deflection) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'PLA (Polylactic Acid)', 'Biodegradable thermoplastic, easy to print, perfect for beginners. Good surface finish and minimal warping.', 'FDM', 25.00, '37-55 MPa', '60°C'),
('550e8400-e29b-41d4-a716-446655440002', 'ABS (Acrylonitrile Butadiene Styrene)', 'Strong and durable plastic, higher temperature resistance. Requires heated bed.', 'FDM', 30.00, '40-50 MPa', '98°C'),
('550e8400-e29b-41d4-a716-446655440003', 'PETG', 'Chemical resistance and durability of ABS with easy printing of PLA. Food-safe option available.', 'FDM', 35.00, '50-55 MPa', '85°C'),
('550e8400-e29b-41d4-a716-446655440004', 'TPU (Thermoplastic Polyurethane)', 'Flexible filament perfect for phone cases, gaskets, and wearable items.', 'FDM', 45.00, '25-35 MPa', '80°C'),
('550e8400-e29b-41d4-a716-446655440005', 'Standard Resin', 'High-detail printing with smooth surface finish. Perfect for miniatures and detailed models.', 'SLA', 120.00, '55-60 MPa', '58°C'),
('550e8400-e29b-41d4-a716-446655440006', 'Tough Resin', 'Durable resin for functional parts. Strong and impact-resistant.', 'SLA', 150.00, '65-70 MPa', '68°C'),
('550e8400-e29b-41d4-a716-446655440007', 'Flexible Resin', 'Rubber-like flexibility for gaskets, phone cases, and wearables.', 'SLA', 180.00, '1.5-2 MPa', '40°C'),
('550e8400-e29b-41d4-a716-446655440008', 'Nylon PA12', 'Strong, lightweight, and chemically resistant. Perfect for functional parts.', 'SLS', 200.00, '48-52 MPa', '185°C');

-- Sample Products for the Shop
INSERT INTO public.products (id, title, description, price, category, image_url, rating, reviews_count) VALUES
-- Miniatures & Gaming
('650e8400-e29b-41d4-a716-446655440001', 'Dragon Miniature - Adult Red Dragon', 'Highly detailed 28mm scale dragon miniature. Perfect for D&D campaigns and tabletop gaming.', 2500.00, 'Miniatures', '/images/dragon-miniature.jpg', 4.8, 156),
('650e8400-e29b-41d4-a716-446655440002', 'Warrior Character Set', 'Complete set of 5 warrior miniatures with weapons. 28mm scale, pre-supported.', 3200.00, 'Miniatures', '/images/warrior-set.jpg', 4.6, 89),
('650e8400-e29b-41d4-a716-446655440003', 'Dice Tower - Castle Theme', 'Medieval castle-themed dice tower with storage compartment. Perfect for game nights.', 4500.00, 'Gaming', '/images/dice-tower.jpg', 4.9, 234),

-- Functional Items
('650e8400-e29b-41d4-a716-446655440004', 'Phone Stand - Adjustable', 'Universal phone stand with adjustable angle. Compatible with all phone sizes.', 1200.00, 'Functional', '/images/phone-stand.jpg', 4.7, 312),
('650e8400-e29b-41d4-a716-446655440005', 'Cable Management Kit', 'Set of 10 cable organizers in different sizes. Keep your desk tidy!', 1800.00, 'Functional', '/images/cable-kit.jpg', 4.5, 187),
('650e8400-e29b-41d4-a716-446655440006', 'Keyboard Wrist Rest', 'Ergonomic wrist rest with honeycomb infill pattern. Comfortable and lightweight.', 2200.00, 'Functional', '/images/wrist-rest.jpg', 4.4, 98),

-- Decorative Items
('650e8400-e29b-41d4-a716-446655440007', 'Sri Lankan Elephant Statue', 'Beautiful decorative elephant with traditional Sri Lankan patterns. Cultural heritage piece.', 3800.00, 'Decorative', '/images/elephant-statue.jpg', 4.9, 145),
('650e8400-e29b-41d4-a716-446655440008', 'Geometric Vase', 'Modern geometric vase with angular design. Perfect for home decoration.', 2800.00, 'Decorative', '/images/geometric-vase.jpg', 4.6, 76),
('650e8400-e29b-41d4-a716-446655440009', 'Buddha Statue - Meditation Pose', 'Peaceful Buddha statue in meditation pose. Brings tranquility to any space.', 4200.00, 'Decorative', '/images/buddha-statue.jpg', 4.8, 203),

-- Educational & STEM
('650e8400-e29b-41d4-a716-446655440010', 'Solar System Model', 'Scale model of the solar system with rotating planets. Educational and fun!', 5500.00, 'Educational', '/images/solar-system.jpg', 4.7, 167),
('650e8400-e29b-41d4-a716-446655440011', 'DNA Double Helix Model', 'Detailed DNA model showing the double helix structure. Perfect for biology students.', 3500.00, 'Educational', '/images/dna-model.jpg', 4.5, 92),
('650e8400-e29b-41d4-a716-446655440012', 'Mechanical Gear Set', 'Working gear mechanism that demonstrates mechanical engineering principles.', 4800.00, 'Educational', '/images/gear-set.jpg', 4.6, 134),

-- Tools & Accessories
('650e8400-e29b-41d4-a716-446655440013', '3D Printer Tool Holder', 'Wall-mounted tool holder for 3D printer accessories. Organize your workspace!', 1600.00, 'Tools', '/images/tool-holder.jpg', 4.3, 88),
('650e8400-e29b-41d4-a716-446655440014', 'Filament Spool Holder', 'Universal spool holder that fits most 3D printers. Smooth filament feeding.', 2400.00, 'Tools', '/images/spool-holder.jpg', 4.4, 156),
('650e8400-e29b-41d4-a716-446655440015', 'Nozzle Cleaning Kit', 'Complete nozzle cleaning kit with various tools. Maintain your printer easily.', 1400.00, 'Tools', '/images/cleaning-kit.jpg', 4.2, 67),

-- Custom/Personalized
('650e8400-e29b-41d4-a716-446655440016', 'Custom Name Plate', 'Personalized name plate for desk or door. Choose your text and color!', 1800.00, 'Custom', '/images/name-plate.jpg', 4.8, 298),
('650e8400-e29b-41d4-a716-446655440017', 'Photo Lithophane', 'Convert your photo into a stunning lithophane. Magical when backlit!', 3200.00, 'Custom', '/images/lithophane.jpg', 4.9, 187),
('650e8400-e29b-41d4-a716-446655440018', 'Custom Keychains (Set of 5)', 'Personalized keychains with your logo or text. Bulk pricing available.', 2500.00, 'Custom', '/images/keychains.jpg', 4.7, 234),

-- Replacement Parts
('650e8400-e29b-41d4-a716-446655440019', 'Universal Knob Set', 'Set of 4 replacement knobs for various applications. Multiple sizes included.', 1200.00, 'Parts', '/images/knob-set.jpg', 4.1, 45),
('650e8400-e29b-41d4-a716-446655440020', 'Hinge Replacement Kit', 'Durable hinges for boxes, cases, and mechanical projects. Easy installation.', 1600.00, 'Parts', '/images/hinge-kit.jpg', 4.3, 78);

-- Update created_at timestamps to be more realistic (spread over last few months)
UPDATE public.products SET created_at = NOW() - INTERVAL '30 days' WHERE id IN (
  '650e8400-e29b-41d4-a716-446655440001',
  '650e8400-e29b-41d4-a716-446655440002',
  '650e8400-e29b-41d4-a716-446655440003'
);

UPDATE public.products SET created_at = NOW() - INTERVAL '45 days' WHERE id IN (
  '650e8400-e29b-41d4-a716-446655440004',
  '650e8400-e29b-41d4-a716-446655440005',
  '650e8400-e29b-41d4-a716-446655440006'
);

UPDATE public.products SET created_at = NOW() - INTERVAL '60 days' WHERE id IN (
  '650e8400-e29b-41d4-a716-446655440007',
  '650e8400-e29b-41d4-a716-446655440008',
  '650e8400-e29b-41d4-a716-446655440009'
);

UPDATE public.products SET created_at = NOW() - INTERVAL '75 days' WHERE id IN (
  '650e8400-e29b-41d4-a716-446655440010',
  '650e8400-e29b-41d4-a716-446655440011',
  '650e8400-e29b-41d4-a716-446655440012'
);

UPDATE public.products SET created_at = NOW() - INTERVAL '90 days' WHERE id IN (
  '650e8400-e29b-41d4-a716-446655440013',
  '650e8400-e29b-41d4-a716-446655440014',
  '650e8400-e29b-41d4-a716-446655440015'
);

-- Add some popular/featured products with higher ratings and review counts
UPDATE public.products SET rating = 4.9, reviews_count = 456 WHERE title = 'Dragon Miniature - Adult Red Dragon';
UPDATE public.products SET rating = 4.8, reviews_count = 389 WHERE title = 'Dice Tower - Castle Theme';
UPDATE public.products SET rating = 4.9, reviews_count = 298 WHERE title = 'Photo Lithophane';
UPDATE public.products SET rating = 4.8, reviews_count = 345 WHERE title = 'Sri Lankan Elephant Statue';
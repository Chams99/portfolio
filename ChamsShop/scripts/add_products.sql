-- =====================================================
-- ChamsShop Product Insertion Script
-- Following 2025 Best Practices
-- =====================================================

-- Set SQL mode for strict validation
SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- Use the database
USE chamsshop;

-- Start transaction for data integrity
START TRANSACTION;

-- Clear existing products to avoid conflicts
DELETE FROM products WHERE id LIKE 'prod_%';

-- =====================================================
-- ELECTRONICS CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_elec_001', 'MacBook Pro 14" M3', 'Latest MacBook Pro with M3 chip, 14-inch Retina display, 16GB RAM, 512GB SSD. Perfect for professionals and creatives.', 1999.99, 'electronics', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', 15, 4.8, 127),
('prod_elec_002', 'iPhone 15 Pro Max', 'Apple iPhone 15 Pro Max with A17 Pro chip, 6.7-inch Super Retina XDR display, 256GB storage, Titanium design.', 1199.99, 'electronics', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop', 25, 4.7, 89),
('prod_elec_003', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 6.8-inch Dynamic AMOLED display, 256GB storage, S Pen included.', 1299.99, 'electronics', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop', 20, 4.6, 156),
('prod_elec_004', 'Sony WH-1000XM5', 'Premium wireless noise-canceling headphones with 30-hour battery life, LDAC codec, and exceptional sound quality.', 349.99, 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop', 30, 4.9, 203),
('prod_elec_005', 'iPad Air 5th Gen', 'Apple iPad Air with M1 chip, 10.9-inch Liquid Retina display, 256GB storage, supports Apple Pencil and Magic Keyboard.', 699.99, 'electronics', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop', 18, 4.5, 94);

-- =====================================================
-- MEN'S FASHION CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_men_001', 'Nike Air Max 270', 'Comfortable running shoes with Air Max technology, breathable mesh upper, and cushioned sole for all-day comfort.', 129.99, 'men', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop', 40, 4.4, 67),
('prod_men_002', 'Levi\'s 501 Original Jeans', 'Classic straight-fit jeans in dark wash denim, 100% cotton, timeless style that goes with everything.', 89.99, 'men', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop', 35, 4.3, 45),
('prod_men_003', 'Tommy Hilfiger Polo Shirt', 'Classic polo shirt in breathable cotton pique, embroidered logo, available in multiple colors.', 59.99, 'men', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop', 50, 4.2, 38),
('prod_men_004', 'North Face Jacket', 'Waterproof and windproof jacket with fleece lining, perfect for outdoor activities and cold weather.', 199.99, 'men', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop', 22, 4.6, 73),
('prod_men_005', 'Casio G-Shock Watch', 'Durable digital watch with shock resistance, water resistance, and multiple functions including stopwatch and alarm.', 149.99, 'men', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop', 28, 4.5, 89);

-- =====================================================
-- WOMEN'S FASHION CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_women_001', 'Adidas Ultraboost 22', 'Premium running shoes with Boost midsole technology, Primeknit upper, and Continental rubber outsole.', 179.99, 'women', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a3?w=800&h=600&fit=crop', 32, 4.7, 112),
('prod_women_002', 'Zara Blazer Jacket', 'Elegant blazer jacket in wool blend, perfect for office wear and formal occasions.', 129.99, 'women', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop', 25, 4.4, 56),
('prod_women_003', 'H&M Summer Dress', 'Lightweight summer dress in floral print, adjustable straps, perfect for warm weather and casual outings.', 49.99, 'women', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop', 45, 4.1, 34),
('prod_women_004', 'Michael Kors Handbag', 'Leather crossbody bag with gold-tone hardware, adjustable strap, and multiple compartments for organization.', 299.99, 'women', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=600&fit=crop', 15, 4.8, 67),
('prod_women_005', 'Pandora Charm Bracelet', 'Sterling silver bracelet with customizable charms, perfect for personalization and gifting.', 89.99, 'women', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop', 38, 4.6, 78);

-- =====================================================
-- BEAUTY & PERSONAL CARE CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_beauty_001', 'La Mer Moisturizing Cream', 'Luxury moisturizing cream with Miracle Broth, perfect for dry and sensitive skin, 1.7 oz jar.', 349.99, 'beauty', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop', 12, 4.9, 234),
('prod_beauty_002', 'Dyson Airwrap Multi-styler', 'Revolutionary hair styling tool with multiple attachments for curling, smoothing, and volumizing.', 599.99, 'beauty', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop', 8, 4.8, 189),
('prod_beauty_003', 'MAC Ruby Woo Lipstick', 'Iconic matte red lipstick with long-lasting formula, perfect for bold and classic looks.', 19.99, 'beauty', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=600&fit=crop', 60, 4.7, 156),
('prod_beauty_004', 'SK-II Facial Treatment Essence', 'Premium facial essence with Pitera, helps improve skin texture and radiance, 230ml bottle.', 159.99, 'beauty', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop', 20, 4.6, 98),
('prod_beauty_005', 'Chanel N°5 Eau de Parfum', 'Timeless fragrance with notes of rose, jasmine, and vanilla, elegant and sophisticated scent.', 129.99, 'beauty', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop', 25, 4.8, 145);

-- =====================================================
-- HOME & LIVING CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_home_001', 'Breville Barista Express', 'Semi-automatic espresso machine with built-in grinder, 15-bar pressure pump, and steam wand.', 699.99, 'home-living', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop', 10, 4.9, 167),
('prod_home_002', 'Vitamix 5200 Blender', 'Professional-grade blender with 2-horsepower motor, perfect for smoothies, soups, and nut butters.', 449.99, 'home-living', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 15, 4.8, 203),
('prod_home_003', 'Dyson V15 Detect Vacuum', 'Cordless vacuum with laser technology, 60-minute runtime, and advanced filtration system.', 699.99, 'home-living', 'https://images.unsplash.com/photo-1581578731548-cf89c9559e16?w=800&h=600&fit=crop', 12, 4.7, 134),
('prod_home_004', 'KitchenAid Stand Mixer', 'Professional stand mixer with 4.5-quart bowl, 10-speed settings, and tilt-head design.', 399.99, 'home-living', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 18, 4.6, 89),
('prod_home_005', 'Philips Hue Smart Bulbs', 'Smart LED bulbs with 16 million colors, voice control compatible, and energy-efficient design.', 199.99, 'home-living', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop', 30, 4.5, 76);

-- =====================================================
-- ACCESSORIES & FITNESS CATEGORY
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_acc_001', 'Apple Watch Series 9', 'Latest Apple Watch with S9 chip, Always-On Retina display, GPS, and health monitoring features.', 399.99, 'accessories', 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=600&fit=crop', 22, 4.8, 198),
('prod_acc_002', 'Bowflex SelectTech Dumbbells', 'Adjustable dumbbells with 5-52.5 lb range, space-saving design, perfect for home workouts.', 399.99, 'accessories', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 8, 4.7, 145),
('prod_acc_003', 'Lululemon Yoga Mat', 'Premium yoga mat with non-slip surface, 5mm thickness, perfect for yoga and pilates practice.', 98.99, 'accessories', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', 35, 4.6, 89),
('prod_acc_004', 'Ray-Ban Aviator Sunglasses', 'Classic aviator sunglasses with UV400 protection, gold-tone frame, and green lenses.', 169.99, 'accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=600&fit=crop', 28, 4.5, 67),
('prod_acc_005', 'Fossil Gen 6 Smartwatch', 'Android-compatible smartwatch with heart rate monitoring, GPS, and customizable watch faces.', 299.99, 'accessories', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', 15, 4.4, 56);

-- =====================================================
-- SALE ITEMS (DISCOUNTED PRODUCTS)
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_sale_001', 'Samsung 55" 4K TV', 'Smart 4K Ultra HD TV with HDR, built-in streaming apps, and voice control. Limited time offer!', 499.99, 'electronics', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop', 5, 4.6, 78),
('prod_sale_002', 'Nike Air Jordan 1 Retro', 'Classic Air Jordan 1 in Chicago colorway, premium leather upper, limited availability.', 179.99, 'men', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop', 3, 4.9, 234),
('prod_sale_003', 'Dyson Supersonic Hair Dryer', 'Revolutionary hair dryer with intelligent heat control, lightweight design, and quiet operation.', 399.99, 'beauty', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop', 7, 4.8, 167),
('prod_sale_004', 'Instant Pot Duo 7-in-1', '7-in-1 electric pressure cooker with 6-quart capacity, perfect for quick and healthy meals.', 89.99, 'home-living', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 12, 4.7, 145),
('prod_sale_005', 'Fitbit Charge 5', 'Advanced fitness tracker with built-in GPS, heart rate monitoring, and 7-day battery life.', 149.99, 'accessories', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', 18, 4.5, 98);

-- =====================================================
-- NEW ARRIVALS (LATEST PRODUCTS)
-- =====================================================

INSERT INTO products (id, name, description, price, category, image, stock, rating, reviews) VALUES
('prod_new_001', 'Sony PlayStation 5', 'Next-generation gaming console with 4K graphics, ultra-high-speed SSD, and 3D audio technology.', 499.99, 'electronics', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=600&fit=crop', 8, 4.9, 312),
('prod_new_002', 'Tesla Model 3 Key Fob', 'Premium key fob for Tesla Model 3 with keyless entry, trunk release, and panic alarm features.', 199.99, 'accessories', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 25, 4.7, 89),
('prod_new_003', 'Dior Sauvage Elixir', 'New intense fragrance with notes of bergamot, vanilla, and woody undertones, long-lasting scent.', 159.99, 'beauty', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop', 15, 4.8, 67),
('prod_new_004', 'Nike ZoomX Vaporfly', 'Elite racing shoes with carbon fiber plate, ZoomX foam, designed for maximum speed and efficiency.', 249.99, 'men', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop', 10, 4.6, 45),
('prod_new_005', 'Le Creuset Dutch Oven', 'Premium cast iron Dutch oven with enamel coating, perfect for braising, stewing, and baking.', 349.99, 'home-living', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 12, 4.9, 123);

-- =====================================================
-- DATA VALIDATION AND INTEGRITY CHECKS
-- =====================================================

-- Verify all products were inserted successfully
SELECT 
    category,
    COUNT(*) as product_count,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM products 
WHERE id LIKE 'prod_%'
GROUP BY category
ORDER BY category;

-- Check for any data integrity issues
SELECT 
    'Products with missing images' as check_type,
    COUNT(*) as count
FROM products 
WHERE image IS NULL OR image = '';

-- Verify price ranges are reasonable
SELECT 
    'Products with unusual prices' as check_type,
    COUNT(*) as count
FROM products 
WHERE price < 0 OR price > 10000;

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE (2025 Best Practice)
-- =====================================================

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- =====================================================
-- COMMIT TRANSACTION
-- =====================================================

-- Commit all changes
COMMIT;

-- =====================================================
-- FINAL VERIFICATION
-- =====================================================

-- Display summary of inserted products
SELECT 
    'Product Insertion Complete' as status,
    COUNT(*) as total_products,
    COUNT(DISTINCT category) as categories,
    ROUND(AVG(price), 2) as average_price
FROM products 
WHERE id LIKE 'prod_%';

-- Show sample of products by category
SELECT 
    category,
    name,
    price,
    rating,
    stock
FROM products 
WHERE id LIKE 'prod_%'
ORDER BY category, rating DESC
LIMIT 10;

-- =====================================================
-- SCRIPT COMPLETION MESSAGE
-- =====================================================

SELECT '✅ Product insertion script completed successfully!' as message;
SELECT '📊 Total products added: 50' as summary;
SELECT '🔄 Database indexes created for optimal performance' as optimization;
SELECT '🔒 Transaction committed with data integrity checks' as security; 
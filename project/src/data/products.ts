import { Product } from '../types';

export const products: Product[] = [
  // Groceries - Rice & Grains
  {
    id: '1',
    name: 'Basmati Rice Premium Grade',
    description: 'Long grain aromatic basmati rice, perfect for biryani and fried rice',
    longDescription: 'Premium quality aged basmati rice with authentic aroma and taste. Each grain cooks to perfection, remaining separate and fluffy. Ideal for Indian, Middle Eastern, and Asian cuisines.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 87,
      negative: 13,
      aspects: {
        quality: 92,
        freshness: 89,
        flavor: 85,
      }
    },
    dataAiHint: 'High-quality basmati rice with excellent cooking properties, highly rated for taste and texture',
    tags: ['rice', 'basmati', 'grains', 'cooking', 'biryani', 'fried-rice', 'indian', 'aromatic']
  },
  {
    id: '2',
    name: 'Soy Sauce - Premium Dark',
    description: 'Rich, umami-packed soy sauce for authentic Asian flavors',
    longDescription: 'Traditional brewed soy sauce with deep, complex flavors. Perfect for stir-fries, marinades, and dipping sauces. No artificial additives, naturally fermented for authentic taste.',
    price: 4.49,
    image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        flavor: 94,
        quality: 88,
        userExperience: 90,
      }
    },
    dataAiHint: 'Authentic soy sauce with excellent flavor profile, essential for Asian cooking',
    tags: ['soy-sauce', 'condiment', 'asian', 'cooking', 'stir-fry', 'marinade', 'umami']
  },
  {
    id: '3',
    name: 'Fresh Yellow Onions',
    description: 'Sweet, crisp yellow onions - cooking essential',
    longDescription: 'Farm-fresh yellow onions with perfect balance of sweetness and sharpness. Ideal for caramelizing, sautéing, or using raw in salads. Hand-selected for quality and freshness.',
    price: 2.99,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 84,
      negative: 16,
      aspects: {
        freshness: 88,
        quality: 82,
        flavor: 86,
      }
    },
    dataAiHint: 'Fresh quality onions, versatile cooking ingredient with good shelf life',
    tags: ['onions', 'vegetables', 'cooking', 'fresh', 'fried-rice', 'stir-fry', 'seasoning']
  },

  // Skincare
  {
    id: '4',
    name: 'SPF 50+ Sunscreen Ultra Protection',
    description: 'Broad spectrum protection for all skin types',
    longDescription: 'Advanced mineral sunscreen with zinc oxide and titanium dioxide. Provides superior protection against UVA and UVB rays. Water-resistant for 80 minutes, non-comedogenic, and suitable for sensitive skin.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=60',
    category: 'Skincare',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        quality: 91,
        userExperience: 87,
        waterproof: 85,
      }
    },
    dataAiHint: 'High-quality sunscreen with excellent protection, suitable for sensitive and oily skin types',
    tags: ['sunscreen', 'spf50', 'skincare', 'protection', 'waterproof', 'sensitive-skin', 'oily-skin', 'mineral']
  },
  {
    id: '5',
    name: 'Gentle Cleansing Face Wash',
    description: 'Oil-free cleanser for oily and combination skin',
    longDescription: 'Dermatologist-tested face wash with salicylic acid and niacinamide. Removes excess oil without over-drying, helps prevent breakouts, and leaves skin feeling clean and refreshed.',
    price: 12.49,
    image: 'https://images.pexels.com/photos/7188324/pexels-photo-7188324.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Skincare',
    sentiment: {
      positive: 85,
      negative: 15,
      aspects: {
        quality: 88,
        userExperience: 84,
        comfort: 86,
      }
    },
    dataAiHint: 'Effective cleanser for oily skin, helps with oil control and acne prevention',
    tags: ['face-wash', 'cleanser', 'oily-skin', 'acne', 'salicylic-acid', 'oil-free', 'gentle']
  },

  // Clothing
  {
    id: '6',
    name: 'Winter Puffer Jacket - Waterproof',
    description: 'Insulated winter jacket with hood, perfect for cold weather',
    longDescription: 'Premium down-filled puffer jacket with waterproof outer shell. Features adjustable hood, multiple pockets, and wind-resistant design. Rated for temperatures down to -20°F.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        comfort: 90,
        durability: 94,
        waterproof: 89,
        fit: 87,
      }
    },
    dataAiHint: 'High-quality winter jacket with excellent insulation and waterproof features, great for harsh weather',
    tags: ['jacket', 'winter', 'waterproof', 'insulated', 'puffer', 'cold-weather', 'hood', 'warm']
  },
  {
    id: '7',
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable everyday t-shirt in multiple colors',
    longDescription: '100% organic cotton t-shirt with soft, breathable fabric. Pre-shrunk and color-fast. Available in various sizes and colors. Perfect for layering or wearing on its own.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60',
    category: 'Clothing',
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: {
        comfort: 92,
        fit: 85,
        quality: 87,
        durability: 84,
      }
    },
    dataAiHint: 'Comfortable cotton t-shirt with good fit and quality, versatile for casual wear',
    tags: ['t-shirt', 'cotton', 'casual', 'comfortable', 'breathable', 'everyday', 'organic']
  },
  {
    id: '11',
    name: 'Classic Bomber Jacket',
    description: 'Stylish bomber jacket for all seasons',
    longDescription: 'Lightweight bomber jacket with ribbed cuffs and hem. Features a zip front, two side pockets, and a comfortable fit. Perfect for casual outings and layering.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        comfort: 88,
        durability: 85,
        fit: 90,
      }
    },
    dataAiHint: 'Trendy bomber jacket, lightweight and versatile for everyday wear',
    tags: ['jacket', 'bomber', 'casual', 'lightweight', 'clothing', 'outerwear']
  },
  {
    id: '12',
    name: 'Hooded Parka Jacket',
    description: 'Warm parka with faux fur hood for winter',
    longDescription: 'Insulated parka jacket with detachable faux fur hood. Water-resistant outer shell, multiple pockets, and adjustable waist for a snug fit. Ideal for cold and snowy weather.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: {
        comfort: 95,
        durability: 92,
        warmth: 94,
      }
    },
    dataAiHint: 'Heavy-duty parka jacket, excellent for harsh winter conditions',
    tags: ['jacket', 'parka', 'hooded', 'winter', 'warm', 'faux-fur', 'clothing']
  },
  {
    id: '13',
    name: 'Lightweight Rain Jacket',
    description: 'Packable rain jacket for travel and outdoor activities',
    longDescription: 'Waterproof and windproof rain jacket with adjustable hood and breathable mesh lining. Packs into its own pocket for easy carrying. Great for hiking, travel, and everyday use.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/936075/pexels-photo-936075.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    sentiment: {
      positive: 86,
      negative: 14,
      aspects: {
        comfort: 84,
        waterproof: 90,
        portability: 88,
      }
    },
    dataAiHint: 'Lightweight, packable rain jacket, perfect for travel and outdoor adventures',
    tags: ['jacket', 'rain', 'lightweight', 'waterproof', 'travel', 'outdoor', 'clothing']
  },

  // Electronics
  {
    id: '8',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium sound quality with noise cancellation',
    longDescription: 'Advanced wireless headphones with active noise cancellation, 30-hour battery life, and premium drivers. Features quick charge, multipoint connectivity, and comfortable over-ear design.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        quality: 93,
        comfort: 89,
        userExperience: 92,
        durability: 88,
      }
    },
    dataAiHint: 'High-quality wireless headphones with excellent sound and comfort, great for music and calls',
    tags: ['headphones', 'wireless', 'bluetooth', 'noise-cancellation', 'audio', 'music', 'premium']
  },
  {
    id: '9',
    name: 'Smartphone Fast Charger',
    description: '65W USB-C fast charging adapter with cable',
    longDescription: 'Universal fast charger compatible with most smartphones and tablets. Features intelligent charging technology, over-current protection, and compact design. Includes 6ft USB-C cable.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 86,
      negative: 14,
      aspects: {
        quality: 88,
        userExperience: 85,
        durability: 84,
      }
    },
    dataAiHint: 'Reliable fast charger with safety features, compatible with multiple devices',
    tags: ['charger', 'fast-charging', 'usb-c', 'smartphone', 'adapter', 'electronics', 'portable']
  },

  // More Groceries - Rice
  {
    id: '14',
    name: 'Jasmine Rice - Thai Fragrant',
    description: 'Aromatic jasmine rice, perfect for Asian dishes',
    longDescription: 'Premium Thai jasmine rice with a delicate floral aroma and soft, slightly sticky texture. Ideal for stir-fries, curries, and steamed rice.',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Groceries',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        flavor: 92,
        quality: 89,
        freshness: 91,
      }
    },
    dataAiHint: 'High-quality jasmine rice, great for Asian cuisine',
    tags: ['rice', 'jasmine', 'groceries', 'asian', 'aromatic']
  },
  {
    id: '15',
    name: 'Brown Rice - Organic',
    description: 'Nutritious whole grain organic brown rice',
    longDescription: 'Certified organic brown rice, rich in fiber and nutrients. Chewy texture and nutty flavor, perfect for healthy meals and salads.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Groceries',
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: {
        flavor: 87,
        quality: 90,
        nutrition: 93,
      }
    },
    dataAiHint: 'Organic brown rice, healthy and nutritious',
    tags: ['rice', 'brown', 'organic', 'groceries', 'whole-grain']
  },
  // More Skincare
  {
    id: '16',
    name: 'Hydrating Face Moisturizer',
    description: 'Lightweight daily moisturizer for all skin types',
    longDescription: 'Non-greasy moisturizer with hyaluronic acid and vitamin E. Provides long-lasting hydration and helps restore skin barrier.',
    price: 17.99,
    image: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Skincare',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        hydration: 94,
        comfort: 90,
        userExperience: 92,
      }
    },
    dataAiHint: 'Hydrating moisturizer, suitable for all skin types',
    tags: ['moisturizer', 'hydrating', 'skincare', 'face', 'daily']
  },
  {
    id: '17',
    name: 'Vitamin C Serum',
    description: 'Brightening serum for radiant skin',
    longDescription: 'Potent vitamin C serum with antioxidants to brighten skin tone, reduce dark spots, and boost collagen production.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/3738342/pexels-photo-3738342.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Skincare',
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        brightness: 95,
        absorption: 90,
        userExperience: 91,
      }
    },
    dataAiHint: 'Vitamin C serum for brightening and anti-aging',
    tags: ['serum', 'vitamin-c', 'skincare', 'brightening', 'anti-aging']
  },
  // More Electronics
  {
    id: '18',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact wireless speaker with deep bass',
    longDescription: 'Water-resistant Bluetooth speaker with 12-hour battery life, deep bass, and crisp sound. Perfect for outdoor and indoor use.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        sound: 92,
        portability: 90,
        battery: 88,
      }
    },
    dataAiHint: 'Portable speaker with great sound and battery life',
    tags: ['speaker', 'bluetooth', 'electronics', 'portable', 'wireless']
  },
  {
    id: '19',
    name: 'Smart Fitness Band',
    description: 'Track your activity, heart rate, and sleep',
    longDescription: 'Fitness band with heart rate monitor, step counter, sleep tracking, and smartphone notifications. Water-resistant and long battery life.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        tracking: 93,
        comfort: 88,
        battery: 91,
      }
    },
    dataAiHint: 'Fitness band for health and activity tracking',
    tags: ['fitness', 'band', 'electronics', 'wearable', 'activity', 'tracker']
  },
  // More Sunscreen
  {
    id: '20',
    name: 'SPF 30 Daily Sunblock',
    description: 'Lightweight sunblock for daily use',
    longDescription: 'Non-greasy SPF 30 sunblock with aloe vera and vitamin E. Provides broad spectrum protection and is suitable for oily and sensitive skin.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1004016/pexels-photo-1004016.jpeg?auto=compress&cs=tinysrgb&w=500', // Updated to a working sunscreen image
    category: 'Skincare',
    sentiment: {
      positive: 87,
      negative: 13,
      aspects: {
        quality: 88,
        userExperience: 85,
        comfort: 86,
      }
    },
    dataAiHint: 'SPF 30 sunblock, lightweight and suitable for oily skin',
    tags: ['sunscreen', 'spf30', 'skincare', 'sunblock', 'oily-skin', 'daily']
  },
  {
    id: '21',
    name: 'Matte Finish Sunscreen Gel',
    description: 'Oil-control sunscreen gel for face',
    longDescription: 'Matte finish sunscreen gel with SPF 50, controls oil and shine, and is ideal for acne-prone and oily skin types.',
    price: 16.49,
    image: 'https://images.pexels.com/photos/3762877/pexels-photo-3762877.jpeg?auto=compress&cs=tinysrgb&w=500', // Updated to a working sunscreen gel image
    category: 'Skincare',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        oilControl: 92,
        comfort: 89,
        userExperience: 90,
      }
    },
    dataAiHint: 'Matte finish sunscreen, great for oily and acne-prone skin',
    tags: ['sunscreen', 'spf50', 'skincare', 'matte', 'oil-control', 'oily-skin', 'gel']
  },
  // More Headphones
  {
    id: '22',
    name: 'Noise Cancelling Over-Ear Headphones',
    description: 'Premium over-ear headphones with active noise cancellation',
    longDescription: 'Experience immersive sound with these over-ear headphones featuring advanced noise cancellation, 40-hour battery life, and plush ear cushions for comfort.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=500', // Updated to a working headphones image
    category: 'Electronics',
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        sound: 95,
        comfort: 93,
        battery: 90,
      }
    },
    dataAiHint: 'Over-ear headphones with noise cancellation and long battery life',
    tags: ['headphones', 'wireless', 'noise-cancelling', 'electronics', 'over-ear', 'audio']
  },
  {
    id: '23',
    name: 'True Wireless Earbuds',
    description: 'Compact wireless earbuds with charging case',
    longDescription: 'Enjoy music on the go with these true wireless earbuds. Features include touch controls, sweat resistance, and a portable charging case for up to 24 hours of playtime.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500', // This image is already working
    category: 'Electronics',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        sound: 90,
        portability: 92,
        battery: 88,
      }
    },
    dataAiHint: 'True wireless earbuds, compact and portable with charging case',
    tags: ['headphones', 'wireless', 'earbuds', 'electronics', 'portable', 'audio']
  },

  // Additional Grocery Items
  {
    id: '10',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed olive oil for cooking and dressing',
    longDescription: 'Premium extra virgin olive oil from Mediterranean olives. Cold-pressed for maximum flavor and nutrition. Perfect for cooking, salad dressings, and finishing dishes.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        quality: 93,
        flavor: 91,
        freshness: 89,
      }
    },
    dataAiHint: 'High-quality olive oil with excellent flavor, versatile for cooking and salads',
    tags: ['olive-oil', 'cooking-oil', 'extra-virgin', 'mediterranean', 'healthy', 'cooking', 'salad']
  },
  // Biryani Ingredients - Multiple Brands
  {
    id: '30',
    name: 'India Gate Basmati Rice',
    description: 'Premium aged basmati rice for biryani',
    longDescription: 'India Gate Basmati Rice is renowned for its long grains and rich aroma, perfect for authentic biryani and pulao.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Groceries',
    sentiment: {
      positive: 93,
      negative: 7,
      aspects: { flavor: 95, quality: 94, aroma: 96 }
    },
    dataAiHint: 'India Gate brand, best for biryani',
    tags: ['rice', 'basmati', 'india-gate', 'biryani', 'grains']
  },
  {
    id: '31',
    name: 'Daawat Basmati Rice',
    description: 'Aromatic basmati rice for special dishes',
    longDescription: 'Daawat Basmati Rice offers extra-long grains and a delicate aroma, ideal for biryani and festive meals.',
    price: 14.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Groceries',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: { flavor: 92, quality: 90, aroma: 93 }
    },
    dataAiHint: 'Daawat brand, popular for biryani',
    tags: ['rice', 'basmati', 'daawat', 'biryani', 'grains']
  },
  {
    id: '32',
    name: 'Fresh Chicken (1kg)',
    description: 'Farm-fresh chicken for curries and biryani',
    longDescription: 'Tender, juicy chicken sourced from local farms. Perfect for biryani, curries, and grilling.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Meat',
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: { freshness: 90, quality: 89, taste: 87 }
    },
    dataAiHint: 'Fresh chicken, ideal for biryani',
    tags: ['chicken', 'meat', 'biryani', 'protein']
  },
  {
    id: '33',
    name: 'Saffron Threads - Zaran',
    description: 'Premium saffron for color and aroma',
    longDescription: 'Zaran Saffron Threads add rich color and aroma to biryani and desserts. Hand-picked and pure.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Spices',
    sentiment: {
      positive: 94,
      negative: 6,
      aspects: { aroma: 97, color: 95, quality: 94 }
    },
    dataAiHint: 'Zaran brand saffron, best for biryani',
    tags: ['saffron', 'spices', 'zaran', 'biryani', 'aroma']
  },
  {
    id: '34',
    name: 'Everest Biryani Masala',
    description: 'Spice blend for authentic biryani',
    longDescription: 'Everest Biryani Masala is a blend of premium spices for rich, aromatic biryani. No artificial colors.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Spices',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: { flavor: 93, aroma: 92, quality: 90 }
    },
    dataAiHint: 'Everest brand, classic biryani masala',
    tags: ['spices', 'masala', 'everest', 'biryani', 'blend']
  },
  {
    id: '35',
    name: 'MDH Biryani Masala',
    description: 'Traditional biryani spice mix',
    longDescription: 'MDH Biryani Masala brings out the authentic taste of biryani with a perfect blend of spices.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=60',
    category: 'Spices',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: { flavor: 91, aroma: 90, quality: 88 }
    },
    dataAiHint: 'MDH brand, traditional biryani masala',
    tags: ['spices', 'masala', 'mdh', 'biryani', 'blend']
  }
];
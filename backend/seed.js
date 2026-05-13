const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with Auto NC Optimizer. Up to 30 hours battery life.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: '/images/HEADPHONES.jfif',
    stock: 45,
    rating: 4.8   
  },
  {
    name: 'Apple MacBook Air 13-inch (M2)',
    description: 'Supercharged by the next-generation M2 chip, MacBook Air is strikingly thin.',
    price: 1099.00,
    category: 'Electronics',
    imageUrl: '/images/MACKBOOK.jpg',
    stock: 20,
    rating: 4.9
  },
  {
    name: 'Nike Air Max 270 Running Shoes',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
    price: 149.99,
    category: 'Footwear',
    imageUrl: '/images/NIKE%20SHOE.jfif',
    stock: 80,
    rating: 4.5
  },
  {
    name: 'Samsung 65" QLED 4K Smart TV',
    description: 'Quantum Dot technology with Quantum HDR and Motion Rate 120 for incredible picture.',
    price: 1299.99,
    category: 'Electronics',
    imageUrl: '/images/SAMSUNG_TV.jfif',
    stock: 12,
    rating: 4.7
  },
  {
    name: 'The Alchemist - Paulo Coelho (Paperback)',
    description: 'A mystical story about following your dreams. A worldwide phenomenon with over 150 million copies sold.',
    price: 12.99,
    category: 'Books',
    imageUrl: '/images/ALCHEMIST.jfif',
    stock: 200,
    rating: 4.6
  },
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.',
    price: 89.99,
    category: 'Kitchen',
    imageUrl: '/images/PRESSURE%20COOKER.jfif',
    stock: 60,
    rating: 4.7
  },
  {
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    description: 'Sits below the waist. Slim fit through the thigh with a narrow leg opening.',
    price: 59.99,
    category: 'Clothing',
    imageUrl: '/images/JEANS.jfif',
    stock: 150,
    rating: 4.4
  },
  {
    name: 'Logitech MX Master 3 Wireless Mouse',
    description: 'Advanced wireless mouse for power users. Ultra-fast MagSpeed electromagnetic scrolling.',
    price: 99.99,
    category: 'Electronics',
    imageUrl: '/images/MOUSE.jfif',
    stock: 75,
    rating: 4.8
  },
  {
    name: 'Yoga Mat - Premium TPE Non-Slip',
    description: '6mm thick premium TPE yoga mat. Non-slip surface, eco-friendly, 72" x 24".',
    price: 34.99,
    category: 'Sports',
    imageUrl: '/images/YOGA.webp',
    stock: 100,
    rating: 4.3
  },
  {
    name: 'Nescafe Gold Blend Coffee 200g',
    description: 'Rich and smooth premium instant coffee. Made from the finest Arabica and Robusta beans.',
    price: 8.99,
    category: 'Grocery',
    imageUrl: '/images/NESCAFE.jfif',
    stock: 300,
    rating: 4.2
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Build the iconic Star Wars Millennium Falcon with 1,351 pieces. For ages 9+.',
    price: 169.99,
    category: 'Toys',
    imageUrl: '/images/LEGO%20WAR.jpeg',
    stock: 35,
    rating: 4.9
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Laser dust detection illuminates hidden dust. Auto-adjusts suction with an intelligent sensor.',
    price: 749.99,
    category: 'Home',
    imageUrl: '/images/VACUME.jfif',
    stock: 18,
    rating: 4.6
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

  
  }
    catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

seedDB();

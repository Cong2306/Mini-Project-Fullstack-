require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    const exists = await Product.findOne();
    if (exists) {
      console.log('Products already exist, skipping seed');
      process.exit(0);
    }

    const samples = [
      { name: 'Tai nghe Bluetooth', description: 'Chống ồn', price: 199000, stock: 25, image: '' },
      { name: 'Chuột không dây', description: 'Chuột quang', price: 99000, stock: 40, image: '' },
      { name: 'Bàn phím cơ', description: 'RGB', price: 450000, stock: 12, image: '' }
    ];

    await Product.insertMany(samples);
    console.log('Inserted sample products');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
}

run();

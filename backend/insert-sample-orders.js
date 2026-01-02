require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for orders seeding');

    const exists = await Order.findOne();
    if (exists) {
      console.log('Orders already exist, skipping seed');
      process.exit(0);
    }

    const samples = [
      {
        customer: { name: 'Nguyen Van A', phone: '0123456789', address: 'Hanoi' },
        items: [
          { name: 'Tai nghe Bluetooth', price: 199000, quantity: 1 },
          { name: 'Chuột không dây', price: 99000, quantity: 2 }
        ],
        totalAmount: 199000 + 2 * 99000,
        status: 'pending',
        paymentMethod: 'cash'
      }
    ];

    await Order.insertMany(samples);
    console.log('Inserted sample orders');
    process.exit(0);
  } catch (err) {
    console.error('Orders seed failed', err);
    process.exit(1);
  }
}

run();

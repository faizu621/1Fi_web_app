import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/db.js';
import Product from '../models/Product.js';
import { seedProducts } from './seedData.js';

dotenv.config();

const runSeed = async () => {
  try {
    console.log('[Seed Script] Connecting to database...');
    await connectDB();

    console.log('[Seed Script] Purging existing products...');
    await Product.deleteMany({});

    console.log(`[Seed Script] Inserting ${seedProducts.length} flagship smartphone products...`);
    const inserted = await Product.insertMany(seedProducts);

    console.log('----------------------------------------------------');
    console.log('✅ SEED SUCCESSFUL! Inserted products:');
    inserted.forEach((p, idx) => {
      console.log(` ${idx + 1}. ${p.name} (${p.slug}) - ${p.variants.length} variants, ${p.emiPlans.length} EMI plans`);
    });
    console.log('----------------------------------------------------');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ SEED ERROR:', error);
    process.exit(1);
  }
};

runSeed();

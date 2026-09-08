import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/1fi_marketplace';
  let conn = null;

  try {
    // Attempt standard connection with 3 sec timeout
    conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] Connected to MongoDB at ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
  } catch (err) {
    console.warn(`[Database] Standard MongoDB connection failed (${err.message}).`);
    console.log('[Database] Initializing MongoMemoryServer fallback for zero-config execution...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      conn = await mongoose.connect(memUri, { dbName: '1fi_marketplace' });
      console.log(`[Database] Connected to MongoMemoryServer at ${memUri} (DB: 1fi_marketplace)`);
    } catch (memErr) {
      console.error('[Database] Failed to initialize MongoMemoryServer fallback:', memErr.message);
      process.exit(1);
    }
  }

  // Ensure database is populated with initial seed products
  try {
    const Product = (await import('../models/Product.js')).default;
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[Database] Collection empty. Seeding initial flagship products...');
      const { seedProducts } = await import('../seed/seedData.js');
      await Product.insertMany(seedProducts);
      console.log(`[Database] Successfully seeded ${seedProducts.length} flagship products.`);
    }
  } catch (seedErr) {
    console.error('[Database] Error during auto-seeding:', seedErr.message);
  }

  return conn;
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI env variable in .env local');
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalWithMongoose = global as typeof global & { mongoose: Cached };
let cached = globalWithMongoose.mongoose;
if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(databaseName: string) {
  if (cached.conn && cached.conn.connections[0].name !== databaseName) {
    await mongoose.disconnect();
    cached = { conn: null, promise: null };
  }

  if (cached.conn) {
    console.log('using existing database connection');
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: databaseName,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('Database connection error:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

let cached: { client?: MongoClient; promise?: Promise<MongoClient> } = (global as any)._mongo || {};

if (!cached) (global as any)._mongo = cached;

async function connectClient(): Promise<MongoClient> {
  if (cached.client) return cached.client;
  if (!cached.promise) {
    const client = new MongoClient(uri!);
    cached.promise = client.connect().then((c) => {
      cached.client = c;
      return c;
    });
  }
  return cached.promise;
}

export async function getDb(dbName = 'Responses') {
  const client = await connectClient();
  return client.db(dbName);
}

export default getDb;

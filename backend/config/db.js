import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dressify';

let client;
let db;

export async function connectDB() {
    try {
        const options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        };

        client = new MongoClient(MONGODB_URI, options);
        await client.connect();
        db = client.db('dressify');

        // Create indexes
        await db.collection('users').createIndex({ email: 1 }, { unique: true });

        console.log('✓ Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('✗ MongoDB connection error:', error.message);
        throw error;
    }
}

export function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB() first.');
    }
    return db;
}

export async function closeDB() {
    if (client) {
        await client.close();
    }
}

#!/usr/bin/env node

import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dressify';
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🔍 Dressify Database Connection Verification\n');
console.log('📋 Configuration:');
console.log(`   Node Environment: ${NODE_ENV}`);
console.log(`   Server Port: ${PORT}`);
console.log(`   MongoDB URI: ${MONGODB_URI.substring(0, 50)}...`);
console.log(`   JWT Secret: ${JWT_SECRET ? '✓ Set' : '✗ NOT SET'}\n`);

async function verifyConnection() {
    let client;
    try {
        console.log('⏳ Step 1: Attempting MongoDB connection...');

        const options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            maxPoolSize: 5,
            connectTimeoutMS: 5000,
        };

        client = new MongoClient(MONGODB_URI, options);
        await client.connect();
        console.log('✓ Connection established\n');

        // Test connection
        console.log('⏳ Step 2: Testing connection with ping...');
        const adminDb = client.db('admin');
        await adminDb.command({ ping: 1 });
        console.log('✓ Ping successful\n');

        // Check database
        console.log('⏳ Step 3: Checking database...');
        const db = client.db('dressify');
        const collections = await db.listCollections().toArray();
        console.log(`✓ Database exists with ${collections.length} collection(s)\n`);

        // Check collections
        console.log('⏳ Step 4: Checking collections...');
        const usersCollection = db.collection('users');
        const userCount = await usersCollection.countDocuments();
        console.log(`✓ Users collection: ${userCount} document(s)\n`);

        // Create indexes
        console.log('⏳ Step 5: Creating/verifying indexes...');
        const indexInfo = await usersCollection.createIndex(
            { email: 1 },
            { unique: true }
        );
        console.log(`✓ Email index verified: ${indexInfo}\n`);

        // Get connection info
        console.log('ℹ️  Connection Information:');
        const serverStatus = await adminDb.command({ serverStatus: 1 });
        console.log(`   Version: ${serverStatus.version}`);
        console.log(`   Uptime: ${serverStatus.uptime} seconds\n`);

        console.log('✅ All verification tests passed!\n');
        console.log('📝 Summary:');
        console.log('   ✓ MongoDB connection: ACTIVE');
        console.log('   ✓ Database: ACCESSIBLE');
        console.log('   ✓ Collections: CONFIGURED');
        console.log('   ✓ Indexes: VERIFIED');

        if (!JWT_SECRET) {
            console.log('\n⚠️  WARNING: JWT_SECRET is not set in .env');
        }

        process.exit(0);
    } catch (error) {
        console.error('✗ Verification failed\n');
        console.error('Error:', error.message);
        console.error('\n💡 Troubleshooting tips:');

        if (error.message.includes('ECONNREFUSED')) {
            console.error('   • MongoDB server is not running');
            console.error('   • Local: Start MongoDB service');
            console.error('   • Cloud: Check MongoDB Atlas connection string');
        } else if (error.message.includes('authentication failed')) {
            console.error('   • Check MONGODB_URI credentials');
            console.error('   • Verify username and password');
            console.error('   • Check IP whitelist in MongoDB Atlas');
        } else if (error.message.includes('Invalid connection string')) {
            console.error('   • MONGODB_URI format is incorrect');
            console.error('   • Example: mongodb://localhost:27017/dressify');
        } else if (error.message.includes('ETIMEDOUT')) {
            console.error('   • Network timeout - check firewall');
            console.error('   • For Atlas: verify IP is whitelisted');
            console.error('   • Check internet connection');
        }

        console.error('\n📖 For more help, see: DATABASE_CONNECTION_GUIDE.md\n');
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

verifyConnection();

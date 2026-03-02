import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../dressify.db');

let db;

export async function connectDB() {
    try {
        if (db) {
            console.log('✓ Using existing SQLite connection');
            return db;
        }

        console.log('⏳ Connecting to SQLite...');
        db = new Database(dbPath);

        // Enable foreign keys
        db.pragma('foreign_keys = ON');

        console.log('✓ SQLite connection verified');

        // Create tables
        createTables();

        console.log('✓ Database tables created/verified');

        return db;
    } catch (error) {
        console.error('✗ SQLite connection error:', error.message);
        throw error;
    }
}

function createTables() {
    // Users table
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            _id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            picture TEXT,
            authProvider TEXT DEFAULT 'email',
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )
    `);

    // Designs table
    db.exec(`
        CREATE TABLE IF NOT EXISTS designs (
            _id TEXT PRIMARY KEY,
            userId TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            designData TEXT,
            thumbnail TEXT,
            isPublic INTEGER DEFAULT 0,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(_id)
        )
    `);
}

export function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB() first.');
    }
    return db;
}

export async function closeDB() {
    try {
        if (db) {
            db.close();
            console.log('✓ SQLite connection closed');
            db = null;
        }
    } catch (error) {
        console.error('✗ Error closing SQLite:', error.message);
        throw error;
    }
}

// Handle graceful shutdown
process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);

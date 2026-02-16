import express from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { getDB } from '../config/db.js';
import { generateToken, verifyToken } from '../middleware/auth.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const db = getDB();
        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword,
            authProvider: 'email',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const token = generateToken(result.insertedId.toString(), email);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertedId.toString(),
                name,
                email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login with Email
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = getDB();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id.toString(), user.email);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Google OAuth Login
router.post('/google', async (req, res) => {
    try {
        const { googleToken } = req.body;

        if (!googleToken) {
            return res.status(400).json({ error: 'Google token is required' });
        }

        // Verify Google token
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`
        );

        const { email, name, picture, id: googleId } = response.data;

        const db = getDB();
        const usersCollection = db.collection('users');

        // Check if user exists
        let user = await usersCollection.findOne({ email });

        if (!user) {
            // Create new user from Google
            const result = await usersCollection.insertOne({
                name: name || email.split('@')[0],
                email,
                googleId,
                picture,
                authProvider: 'google',
                password: null,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            user = {
                _id: result.insertedId,
                name: name || email.split('@')[0],
                email,
                googleId
            };
        } else if (!user.googleId) {
            // Update existing user with Google ID
            await usersCollection.updateOne(
                { _id: user._id },
                {
                    $set: {
                        googleId,
                        picture,
                        authProvider: 'google',
                        updatedAt: new Date()
                    }
                }
            );
        }

        const token = generateToken(user._id.toString(), user.email);

        res.json({
            success: true,
            message: 'Google login successful',
            token,
            user: {
                id: user._id.toString(),
                name: user.name || email.split('@')[0],
                email,
                picture
            }
        });
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).json({ error: 'Google authentication failed' });
    }
});

// Verify Token
router.post('/verify', (req, res) => {
    try {
        const { token } = req.body;
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.json({
            success: true,
            user: decoded
        });
    } catch (error) {
        res.status(500).json({ error: 'Token verification failed' });
    }
});

export default router;

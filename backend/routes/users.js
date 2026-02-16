import express from 'express';
import { getDB } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(req.user.userId) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                picture: user.picture,
                authProvider: user.authProvider,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, picture } = req.body;
        const db = getDB();

        const updateData = {
            updatedAt: new Date()
        };

        if (name) updateData.name = name;
        if (picture) updateData.picture = picture;

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.user.userId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Save user design
router.post('/save-design', authMiddleware, async (req, res) => {
    try {
        const { designData, name } = req.body;
        const db = getDB();

        const result = await db.collection('saved_designs').insertOne({
            userId: new ObjectId(req.user.userId),
            name,
            designData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Design saved successfully',
            designId: result.insertedId.toString()
        });
    } catch (error) {
        console.error('Save design error:', error);
        res.status(500).json({ error: 'Failed to save design' });
    }
});

// Get user's saved designs
router.get('/saved-designs', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const designs = await db.collection('saved_designs')
            .find({ userId: new ObjectId(req.user.userId) })
            .sort({ createdAt: -1 })
            .toArray();

        res.json({
            success: true,
            designs: designs.map(d => ({
                id: d._id.toString(),
                name: d.name,
                designData: d.designData,
                createdAt: d.createdAt
            }))
        });
    } catch (error) {
        console.error('Get saved designs error:', error);
        res.status(500).json({ error: 'Failed to fetch designs' });
    }
});

export default router;

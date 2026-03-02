import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDB } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const db = getDB();
        const user = db.prepare(
            'SELECT _id, name, email, picture, authProvider, createdAt FROM users WHERE _id = ?'
        ).get(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
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
        const now = new Date().toISOString();

        let query = 'UPDATE users SET updatedAt = ?';
        const params = [now];

        if (name) {
            query += ', name = ?';
            params.push(name);
        }
        if (picture) {
            query += ', picture = ?';
            params.push(picture);
        }

        query += ' WHERE _id = ?';
        params.push(req.user.userId);

        const result = db.prepare(query).run(...params);

        if (result.changes === 0) {
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
        const { designData, name, description } = req.body;
        const db = getDB();
        const designId = uuidv4();
        const now = new Date().toISOString();

        db.prepare(`
            INSERT INTO designs (_id, userId, name, description, designData, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
            designId,
            req.user.userId,
            name || 'Untitled Design',
            description || '',
            JSON.stringify(designData),
            now,
            now
        );

        res.status(201).json({
            success: true,
            message: 'Design saved successfully',
            designId: designId
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
        const designs = db.prepare(
            'SELECT _id, name, description, designData, createdAt FROM designs WHERE userId = ? ORDER BY createdAt DESC'
        ).all(req.user.userId);

        res.json({
            success: true,
            designs: designs.map(d => ({
                id: d._id,
                name: d.name,
                description: d.description,
                designData: JSON.parse(d.designData || '{}'),
                createdAt: d.createdAt
            }))
        });
    } catch (error) {
        console.error('Get saved designs error:', error);
        res.status(500).json({ error: 'Failed to fetch designs' });
    }
});

export default router;

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dressify_secret_key_change_in_production';

// Warn if using default secret in production
if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'dressify_secret_key_change_in_production') {
    console.warn('⚠️  WARNING: Using default JWT_SECRET in production. Please set JWT_SECRET environment variable.');
}

export function generateToken(userId, email) {
    return jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: '30d' }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
}

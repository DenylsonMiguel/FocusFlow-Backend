import jwt from "jsonwebtoken";

export function verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Authorization header is required' });

    const token = authHeader.split(' ');
    if (!token) return res.status(401).json({ error: 'Bearer token is required' });
   
    
    if (token[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        if (!decoded || !decoded.id) return res.status(401).json({ error: 'Invalid token' });

        req.user = { id: decoded.id, name: decoded.name };
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

export function verifyRefreshToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Authorization header is required' });

    const token = authHeader.split(' ');
    if (!token) return res.status(401).json({ error: 'Bearer token is required' });

    if (token[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid token format' });

    try {
        const decoded = jwt.verify(token[1], process.env.JWT_REFRESH_SECRET);
        if (!decoded || !decoded.id) return res.status(401).json({ error: 'Invalid token' });

        req.user = { id: decoded.id, name: decoded.name };
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
} 
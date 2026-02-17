import jwt from "jsonwebtoken";

export function verifyJwt(req, res, next) {
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
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(500).json({ error: 'Server error' });
    }
}
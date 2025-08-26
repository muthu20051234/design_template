import jwt from 'jsonwebtoken';


export function requireAuth(req, res, next) {
const auth = req.headers.authorization || '';
const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
if (!token) return res.status(401).json({ message: 'No token' });
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload; // { id, email }
next();
} catch (e) {
return res.status(401).json({ message: 'Invalid token' });
}
}
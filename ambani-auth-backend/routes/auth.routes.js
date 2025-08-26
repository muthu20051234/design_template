// 🟧 KAMI: Auth routes (email/password + Google via Firebase ID token)
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import admin from 'firebase-admin';


const router = express.Router();


function sign(user) {
return jwt.sign(
{ id: user._id.toString(), email: user.email },
process.env.JWT_SECRET,
{ expiresIn: '7d' }
);
}


router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) {
return res.status(400).json({ message: 'Missing fields' });
}
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email already in use' });


const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash, provider: 'local' });
const token = sign(user);
res.json({ token, user });
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});


router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


const token = sign(user);
res.json({ token, user });
} catch (e) {
console.error(e);
res.status(500).json({ message: 'Server error' });
}
});

router.post('/google', async (req, res) => {
// Frontend sends Firebase ID Token
try {
const { idToken } = req.body;
if (!idToken) return res.status(400).json({ message: 'idToken required' });


const decoded = await admin.auth().verifyIdToken(idToken);
const email = decoded.email;
const name = decoded.name || 'Google User';
const photo = decoded.picture;


let user = await User.findOne({ email });
if (!user) {
user = await User.create({ name, email, provider: 'google', photo });
}


const token = sign(user);
res.json({ token, user });
} catch (e) {
console.error(e);
res.status(401).json({ message: 'Invalid idToken' });
}
});


export default router;
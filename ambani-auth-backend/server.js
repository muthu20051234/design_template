// 🟧 KAMI: Express app + Mongo connect + Firebase Admin init + CORS
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import authRoutes from './routes/auth.routes.js';


// Firebase Admin init from env vars
if (!admin.apps.length) {
admin.initializeApp({
credential: admin.credential.cert({
projectId: process.env.FIREBASE_PROJECT_ID,
clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}),
});
}


const app = express();


// CORS (allow all for Flutter mobile; restrict if hosting web)
const origins = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));


app.use(express.json());


app.get('/', (req, res) => res.send('Auth API running'));
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 8080;


mongoose
.connect(process.env.MONGODB_URI, { dbName: 'ambanidail' })
.then(() => {
console.log('Mongo connected');
app.listen(PORT, () => console.log('Server on ' + PORT));
})
.catch((e) => {
console.error('Mongo error', e);
process.exit(1);
});
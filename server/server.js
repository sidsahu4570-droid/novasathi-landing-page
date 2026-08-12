import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import consultationRoutes from './routes/consultations.js';
import adminAuthRoutes from './routes/adminAuth.js';
import reviewRoutes from './routes/reviews.js';

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// Serve static uploads folder (video/image files)
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/consultations', consultationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminAuthRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'NovaSathi API',
    time: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ─── Start HTTP server first, then connect to MongoDB ─────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 NovaSathi API running on http://localhost:${PORT}`);
  console.log(`📋 Admin panel: http://localhost:3000/admin`);
});

// ─── MongoDB Connection (with retry) ──────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novasathi';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected: ${MONGODB_URI}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⏳ Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed. Exiting...');
  process.exit(0);
});

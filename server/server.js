import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import consultationRoutes from './routes/consultations.js';
import adminAuthRoutes from './routes/adminAuth.js';

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/consultations', consultationRoutes);
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

// ─── MongoDB Connection ────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/novasathi';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ MongoDB connected: ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 NovaSathi API running on http://localhost:${PORT}`);
      console.log(`📋 Admin panel: http://localhost:3000/admin`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed. Exiting...');
  process.exit(0);
});

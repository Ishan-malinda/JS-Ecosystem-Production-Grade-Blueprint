import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';
import usersRoutes from '#routes/users.routes.js';

const app = express();

// ── Security & Parsing Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging Middleware ─────────────────────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// ── Security Middleware (Rate Limiting, Bot Protection) ─────────────────────────
app.use(securityMiddleware);

// ── Base Routes ────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  logger.info('Root endpoint hit');
  res.status(200).send('Hello from My API!');
});

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// ── 404 Catch-All Handler ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;

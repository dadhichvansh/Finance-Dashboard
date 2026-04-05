import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './modules/auth/auth.routes.js';

import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// CORS configuration - allow all origins for now (can be restricted in production)
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test route
app.get('/', (_, res) => {
  res.json({ message: '🚀 Finance Dashboard API Running...' });
});

// Features routes
app.use('/api/v1/auth', authRoutes);

// Global error handler
app.use(errorHandler);

export default app;

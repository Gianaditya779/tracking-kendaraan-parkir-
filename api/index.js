// Vercel Serverless Function untuk Backend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug: Check if env variables are loaded
console.log('🔍 Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('GOOGLE_APPS_SCRIPT_URL:', process.env.GOOGLE_APPS_SCRIPT_URL);

import vehicleRoutes from '../backend/src/routes/vehicleRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/kendaraan', vehicleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message 
  });
});

export default app;

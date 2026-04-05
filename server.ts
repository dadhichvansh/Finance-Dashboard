import app from './src/app.js';

import { db } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await db.$connect();
    console.log('✅ Connected to the database successfully.');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // Handle unexpected promise rejections
    process.on('unhandledRejection', async (err) => {
      console.error('❌ Unhandled Promise Rejection:', err);
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('❌ Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

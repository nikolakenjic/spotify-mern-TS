import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import ImageKit from 'imagekit';

import { connectDB } from './lib/db.js';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const app = express();

// Morgan for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.use(express.json()); // to parse req.body

app.use(clerkMiddleware()); // add auth to req object => req.auth.userId

// ImageKIT
app.use((req, res, next) => {
  req.imageKit = imageKit;
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on a port: ${PORT}`);
  connectDB();
});

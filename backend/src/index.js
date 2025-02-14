import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import ImageKit from 'imagekit';
import fileUpload from 'express-fileupload';
import path from 'path';

import { connectDB } from './lib/db.js';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const __dirname = path.resolve();
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
// FileUpload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB  max file size
    },
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  {
    res.status(500),
      json({
        message:
          process.env.NODE_ENV === 'production'
            ? 'Internal Server error'
            : err.message,
      });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on a port: ${PORT}`);
  connectDB();
});

// todo: socket.io

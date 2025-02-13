import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const app = express();

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on a port: ${PORT}`);
});

// Import the required modules
import express, { Application } from 'express';
import morgan from 'morgan';
import { join } from 'path';

import userRouter from './user/main.users.routes';
import clientRouter from './client/main.client.routes';
import adminRouter from './admin/main.admin.routes';

// Create a new Express application
const app: Application = express();

// Use Morgan middleware if in development mode
if (process.env.NODE_ENV === 'development') {
     app.use(morgan('dev'));
};

// Parse incoming requests with JSON and URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'image' directory
app.use('/image', express.static(join(__dirname, 'image')));

// Serve static files from the 'image' directory
app.use('/movie', express.static(join(__dirname, 'upload-movie')));

// Mount the user router at the /api/user endpoint
app.use('/api/v1', userRouter);

// Mount the client router at the /api/user endpoint
app.use('/api/v1', clientRouter);

// Mount the client router at the /api/user endpoint
app.use('/api/v1', adminRouter);


export default app;
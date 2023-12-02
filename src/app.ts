// Import the required modules
import express, { Application } from 'express';
import userRouter from './user/main.users.routes';
import morgan from 'morgan';
import { join } from 'path';



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


export default app;
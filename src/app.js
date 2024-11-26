import express from 'express';
import morgan from 'morgan';
// Routes
import usersRoutes from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users',usersRoutes);


export default app;
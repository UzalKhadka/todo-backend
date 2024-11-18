import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import todoRoutes from './routes/api/todoRoutes';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import webRoutes from './routes/webRoutes';

dotenv.config();

const app: Application = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './../public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.redirect('/web');
});
app.use('/web', webRoutes);
app.use('/api/todos', todoRoutes);

// error handling
app.use(errorHandler);

export default app;

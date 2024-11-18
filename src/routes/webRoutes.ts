import { Router } from 'express';
import {
  listTodos,
  getTodoForm,
  updateTodoForm,
  deleteTodo,
} from '../controllers/todoController';

const webRoutes = Router();

// Route to render the ToDo list page
webRoutes.get('/', listTodos);

// Route to render the "Add ToDo" form
webRoutes.get('/add', getTodoForm);

// Route to render the "Update ToDo" form
webRoutes.get('/edit/:id', updateTodoForm);

export default webRoutes;

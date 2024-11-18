import { Router } from 'express';
import {
  listTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../../controllers/todoController';
import { validateTodo } from '../../middlewares/validateTodo';

const router = Router();

router.get('/', listTodos);
router.post('/', validateTodo, addTodo);
router.post('/edit/:id', validateTodo, updateTodo);
router.get('/delete/:id', deleteTodo);

export default router;

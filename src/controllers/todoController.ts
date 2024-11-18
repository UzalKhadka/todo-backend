import { Request, Response, NextFunction } from 'express';
import Todo, { ITodo } from '../models/todo';

// @desc    Fetch and render all ToDo items
// @route   GET /todos/
// @access  Public
export const listTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};

    const todos: ITodo[] = await Todo.find(filter);

    // if it's an AJAX request, return only the updated todo rows
    if (req.xhr) {
      return res.render('partials/todo-list-rows', { body: todos });
    }

    // else render the full page
    return res.render('todo-list', { body: todos });
  } catch (err) {
    next(err);
  }
};

// @desc    Add a new ToDo item
// @route   POST /todos/add
// @access  Public
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, shortDescription, dateTime, status } = req.body;
    const todo = new Todo({ name, shortDescription, dateTime, status });
    await todo.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

// @desc    Update a ToDo item by Id
// @route   POST /api/edit/:id
// @access  Public
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, shortDescription, dateTime, status } = req.body;
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      { name, shortDescription, dateTime, status },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res
        .status(404)
        .render('error', { error: { message: 'ToDo not found' } });
    }

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

// @desc    Render the "Add ToDo" form
// @route   GET /todos/add
// @access  Public
export const getTodoForm = (req: Request, res: Response): void => {
  res.render('add-todo');
};

// @desc    Render the "Edit ToDo" form
// @route   GET /todos/edit/:id
// @access  Public
export const updateTodoForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const todo: ITodo | null = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .render('error', { error: { message: 'ToDo not found' } });
    }
    res.render('edit-todo', { todo });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a ToDo item by Id
// @route   GET /api/delete/:id
// @access  Public
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res
        .status(404)
        .render('error', { error: { message: 'ToDo not found' } });
    }
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = await Todo.createTodo({
      title,
      description,
      deadline,
      completed: false,
      created_at: new Date()
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedTodo = await Todo.updateTodo(id, updates);
    
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Todo.deleteTodo(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

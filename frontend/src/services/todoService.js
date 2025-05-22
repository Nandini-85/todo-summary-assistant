import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const todoService = {
  getAllTodos: async () => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },
  
  createTodo: async (todo) => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  },
  
  updateTodo: async (id, updates) => {
    const response = await axios.put(`${API_URL}/todos/${id}`, updates);
    return response.data;
  },
  
  deleteTodo: async (id) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
  }
};

export default todoService;

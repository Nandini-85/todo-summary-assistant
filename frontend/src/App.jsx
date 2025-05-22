import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Summary from './components/Summary';
import Notification from './components/Notification';
import todoService from './services/todoService';
import summaryService from './services/summaryService';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [notification, setNotification] = useState(null);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch todos on component mount
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      showNotification('Failed to fetch todos', 'error');
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const addedTodo = await todoService.createTodo(newTodo);
      setTodos([addedTodo, ...todos]);
      showNotification('Todo added successfully!', 'success');
    } catch (error) {
      showNotification('Failed to add todo', 'error');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      showNotification('Todo updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update todo', 'error');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      showNotification('Todo deleted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to delete todo', 'error');
    }
  };

  const handleGenerateSummary = async () => {
    try {
      setIsLoading(true);
      const response = await summaryService.summarizeAndSend();
      
      if (response.success) {
        setSummary(response.summary);
        showNotification('Summary sent to Slack successfully!', 'success');
      } else {
        showNotification(response.message || 'No pending todos to summarize', 'info');
      }
    } catch (error) {
      showNotification('Failed to generate summary or send to Slack', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div className="app-container">
      <h1>Todo Summary Assistant</h1>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="app-content">
        <div className="left-panel">
          <TodoForm onAddTodo={handleAddTodo} />
          <TodoList 
            todos={todos} 
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
        <div className="right-panel">
          <Summary 
            summary={summary} 
            onGenerateSummary={handleGenerateSummary} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

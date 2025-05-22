import React, { useState } from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [deadline, setDeadline] = useState(todo.deadline || '');

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setDeadline(todo.deadline || '');
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    
    onUpdateTodo(todo.id, {
      title,
      description: description || null,
      deadline: deadline || null
    });
    
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  // Format the deadline date for display
  const formattedDeadline = todo.deadline 
    ? new Date(todo.deadline).toLocaleDateString() 
    : '';

  // Format the deadline for input field
  const deadlineForInput = todo.deadline 
    ? new Date(todo.deadline).toISOString().split('T')[0] 
    : '';

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-title"
            placeholder="Title"
            required
          />
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-description"
            placeholder="Description"
            rows="2"
          />
          
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="edit-deadline"
          />
          
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
            />
            <span className="checkmark"></span>
          </label>
          <h4 className="todo-title">{todo.title}</h4>
        </div>
        
        {description && (
          <p className="todo-description">{description}</p>
        )}
        
        {formattedDeadline && (
          <p className="todo-deadline">Due: {formattedDeadline}</p>
        )}
      </div>
      
      <div className="todo-actions">
        <button onClick={handleEdit} className="edit-btn" disabled={todo.completed}>
          Edit
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;


import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="todo-list-container empty-list">
        <h2>Todo List</h2>
        <p>No todos yet. Add a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      
      <div className="pending-todos">
        <h3>Pending ({pendingTodos.length})</h3>
        {pendingTodos.length === 0 ? (
          <p>No pending todos.</p>
        ) : (
          <ul className="todo-list">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
      
      <div className="completed-todos">
        <h3>Completed ({completedTodos.length})</h3>
        {completedTodos.length === 0 ? (
          <p>No completed todos.</p>
        ) : (
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;

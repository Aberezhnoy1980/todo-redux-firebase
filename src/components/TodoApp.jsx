import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, toggleTodoAction, deleteTodoAction } from '../features/todos/todosThunks';
import './TodoApp.css';

export default function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoInput;
    if (input.value.trim()) {
      dispatch(addTodo(input.value.trim()));
      input.value = '';
    }
  };

  const handleToggle = (id, completed) => {
    dispatch(toggleTodoAction(id, !completed));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoAction(id));
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="todo-app">
      <h1>My Todos</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          name="todoInput"
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id, todo.completed)}
              className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

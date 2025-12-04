import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunk)
});

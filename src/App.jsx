import { Provider } from 'react-redux';
import store from './app/store';
import TodoApp from './components/TodoApp';

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

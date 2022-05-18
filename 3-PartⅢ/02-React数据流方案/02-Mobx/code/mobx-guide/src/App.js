import Counter from './components/Counter'
import CounterStore from './stores/CounterStore';
import TodoListView from './components/Todos/TodoListView';

import TodoListStore from './stores/TodoStore/TodoListStore';
import TodoViewStore from './stores/TodoStore/TodoViewStore';

const todoListStore = new TodoListStore([
  new TodoViewStore("Hello React"),
  new TodoViewStore("Hello Mobx")
])


const counterStore = new CounterStore()

function App () {
  return (
    <div className="App">
      <Counter counterStore={counterStore} />
      <TodoListView todoListStore={todoListStore} />
    </div>
  );
}

export default App;

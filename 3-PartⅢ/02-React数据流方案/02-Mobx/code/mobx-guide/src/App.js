import Counter from './components/Counter'
import CounterStore from './stores/CounterStore';

const counterStore = new CounterStore()

function App () {
  return (
    <div className="App">
      <Counter counterStore={counterStore} />
    </div>
  );
}

export default App;

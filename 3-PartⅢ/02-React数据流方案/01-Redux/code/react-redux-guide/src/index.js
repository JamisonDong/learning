import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { createStore } from 'redux'
import Counter from './components/Counter';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * react-redux
 * Provider
 * connect
 */

const initialState = {
  count: 0
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}
const store = createStore(reducer)

// const increment = { type: 'increment' }
// const decrement = { type: 'decrement' }

root.render(
  // 通过Provider 将store放在了全局的组件可以访问到的地方
  <Provider store={store}><Counter /></Provider>
);




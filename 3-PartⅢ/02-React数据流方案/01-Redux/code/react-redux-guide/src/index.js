import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./store"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * react-redux
 * Provider
 * connect
 */
root.render(
  // 通过Provider 将store放在了全局的组件可以访问到的地方
  <Provider store={store}>
    {/* <Counter /> */}
    <App />
  </Provider>
);




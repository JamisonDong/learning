import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';

import Counter from './components/Counter';
import { Provider } from 'react-redux';
import { store } from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * react-redux
 * Provider
 * connect
 */
root.render(
  // 通过Provider 将store放在了全局的组件可以访问到的地方
  <Provider store={store}><Counter /></Provider>
);




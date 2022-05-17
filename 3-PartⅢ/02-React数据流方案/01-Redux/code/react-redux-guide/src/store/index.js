import { createStore, applyMiddleware } from 'redux'
import RootReducer from "./reducers/root.reducer"
// import logger from './middleware/logger'
// import test from './middleware/test'
// import thunk from './middleware/thunk'
// import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
// import counterSaga from './sagas/counter.saga'
import rootSaga from './sagas/root.saga'

const sageMiddleware = createSagaMiddleware()
export const store = createStore(RootReducer, applyMiddleware(sageMiddleware))

// 启动
sageMiddleware.run(rootSaga)
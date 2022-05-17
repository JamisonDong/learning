import { createStore, applyMiddleware } from 'redux'
import RootReducer from "./reducers/root.reducer"
import logger from './middleware/logger'
import test from './middleware/test'
import thunk from './middleware/thunk'


export const store = createStore(RootReducer, applyMiddleware(logger, test, thunk))
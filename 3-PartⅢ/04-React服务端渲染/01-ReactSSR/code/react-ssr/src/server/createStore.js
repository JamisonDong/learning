import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducers from "../share/store/reducers"

export default () => createStore(reducers, {}, applyMiddleware(thunk))
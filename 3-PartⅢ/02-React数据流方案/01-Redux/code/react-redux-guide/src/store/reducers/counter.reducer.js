// import { DECREMENT, INCREMENT } from "../constant/counter.const"
import { handleActions as createReducer } from "redux-actions"
import { increment_action, decrement_action } from "../actions/counter.action"

const initialState = {
  count: 0,
  show: false
}

const handleIncrement = (state, action) => ({ count: state.count + action.payload })
const handleDecrement = (state, action) => ({ count: state.count - action.payload })

export default createReducer({
  [increment_action]: handleIncrement,
  [decrement_action]: handleDecrement,
}, initialState)

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         count: state.count + action.payload
//       }
//     case DECREMENT:
//       return {
//         ...state,
//         count: state.count - action.payload
//       }
//     default:
//       return state
//   }
// }
import { handleActions as createReducer } from "redux-actions"
import { addProductToLocalCart, saveCarts } from "../actions/cart.action"

const initialState = []
// 将商品添加到本地购物车
const handleAddProductToLocalCart = (state, action) => {
  // 1.不在购物车中 直接添加
  // 2.已经存在 商品数量+1
  const newState = JSON.parse(JSON.stringify(state))

  const product = newState.find(product => product.id === action.payload.id)

  if (product) {
    // 存在
    product.count = product.count * 1 + 1
  } else {
    // 不存在
    newState.push(action.payload)
  }
  return newState
}

const handleSaveCarts = (state, action) => {
  return action.payload
}

export default createReducer({
  [addProductToLocalCart]: handleAddProductToLocalCart,
  [saveCarts]: handleSaveCarts
}, initialState)
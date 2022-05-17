import { handleActions as createReducer } from "redux-actions"
import { saveProducts } from "../actions/product.action"


const handleSaveProducts = (state, action) => {
  return action.payload
}

const initialState = []
export default createReducer({
  // 将商品列表数据保存到本地的store对象中
  [saveProducts]: handleSaveProducts
}, initialState)
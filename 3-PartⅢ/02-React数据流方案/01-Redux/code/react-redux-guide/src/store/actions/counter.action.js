import { DECREMENT, INCREMENT } from "../constant/counter.const"

export const increment = (payload) => ({ type: INCREMENT, payload })
export const decrement = (payload) => ({ type: DECREMENT, payload })
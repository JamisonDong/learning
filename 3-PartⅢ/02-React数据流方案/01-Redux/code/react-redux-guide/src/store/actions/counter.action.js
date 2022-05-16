import { DECREMENT, INCREMENT } from "../constant/counter.const"

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
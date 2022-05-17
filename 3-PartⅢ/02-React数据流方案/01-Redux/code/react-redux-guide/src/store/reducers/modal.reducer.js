import { HIDEMODAL, SHOWMODAL } from "../constant/modal.const"

const initialState = {
  show: false
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOWMODAL:
      return {
        ...state,
        show: true
      }
    case HIDEMODAL:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}
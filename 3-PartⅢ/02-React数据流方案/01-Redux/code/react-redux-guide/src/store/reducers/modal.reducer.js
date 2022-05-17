import { HIDE_MODAL, SHOW_MODAL } from "../constant/modal.const"

const initialState = {
  show: false
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: true
      }
    case HIDE_MODAL:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}
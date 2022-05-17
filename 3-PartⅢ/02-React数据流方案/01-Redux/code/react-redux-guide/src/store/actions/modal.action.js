import { HIDE_MODAL, SHOW_MODAL, SHOW_MODAL_ASYNC } from "../constant/modal.const"


export const show = () => ({ type: SHOW_MODAL })
export const hide = () => ({ type: HIDE_MODAL })

// export const show_async = () => dispatch => {
//   setTimeout(() => {
//     dispatch(show())
//   }, 1000)
// }

export const show_async = () => ({ type: SHOW_MODAL_ASYNC })
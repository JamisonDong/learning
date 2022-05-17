import { takeEvery, put, delay } from "redux-saga/effects"
import { show } from "../actions/modal.action"
import { SHOW_MODAL_ASYNC } from "../constant/modal.const"

function* show_async_fn () {
  yield delay(1000)
  yield put(show())
}


export default function* modalSaga () {
  yield takeEvery(SHOW_MODAL_ASYNC, show_async_fn)
}
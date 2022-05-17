import { takeEvery, put, delay } from "redux-saga/effects"
import { increment } from "../actions/counter.action"
import { INCREMENT_ASYNC } from "../constant/counter.const"

// takeEvery 接受action
// put 出发action

function* increment_async_fn () {
  yield delay(1000)
  yield put(increment(10))
}

export default function* counterSaga () {
  // 接受action
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
}
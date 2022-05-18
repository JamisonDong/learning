import { makeAutoObservable } from "mobx";


class CounterStore {
  count = 10

  constructor() {
    // 将参数对象中的属性设置为 observable state
    // 将参数对象中的方法设置为 action
    makeAutoObservable(this)
  }
  increment () {
    this.count += 1
  }

  reset () {
    this.count = 0
  }
}

export default CounterStore
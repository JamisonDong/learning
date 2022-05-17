import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import * as counterActions from "../store/actions/counter.action"
function Counter (props) {
  // console.log(props);
  const { count, decrement, increment_async } = props
  return <div>
    <button onClick={() => increment_async(20)}>+</button>
    <span>{count}</span>
    <button onClick={() => decrement(5)}>-</button>
  </div>
}

// 1.connect 可以自动订阅store 动态渲染组件
// 2.connect可以获取store中的状态  通过props属性映射给组件
// 3.connect可以让我们获取dispatch方法

const mapStateToProps = (state) => ({
  count: state.counter.count,
})



const mapDispatchToProps = dispatch =>
  bindActionCreators(counterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
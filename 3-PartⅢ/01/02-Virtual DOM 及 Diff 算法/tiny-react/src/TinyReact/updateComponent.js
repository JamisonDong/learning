import diff from "./diff"

export default function updateComponent (virtualDOM, oldComponent, oldDOM, container) {
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    // 未更新的props
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 组件更新
    oldComponent.updateProps(virtualDOM.props)
    // 最新的virtualDOM
    let nextVirtualDOM = oldComponent.render()
    // 更新component 组件的实例对象
    nextVirtualDOM.component = oldComponent
    // 比对
    diff(nextVirtualDOM, container, oldDOM)
    oldComponent.componentDidUpdate(prevProps)
  }

};

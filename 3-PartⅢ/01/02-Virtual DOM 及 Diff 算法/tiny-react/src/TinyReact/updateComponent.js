import diff from "./diff"

export default function updateComponent (virtualDOM, oldComponent, oldDOM, container) {

  // 组件更新
  oldComponent.updateProps(virtualDOM.props)
  // 最新的virtualDOM
  let nextVirtualDOM = oldComponent.render()
  nextVirtualDOM.component = oldComponent
  diff(nextVirtualDOM, container, oldDOM)
};

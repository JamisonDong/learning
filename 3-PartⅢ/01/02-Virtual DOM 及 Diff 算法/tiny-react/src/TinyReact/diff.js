import createDOMElement from "./createDOMElement"
import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"
import unmountNode from "./unmountNode"
import diffComponent from "./diffComponent"

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 判断oldDOM是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  }
  // 类型不同 则替换 
  else if (
    // 如果要比对的两个节点类型不相同
    virtualDOM.type !== oldVirtualDOM.type &&
    // 并且节点的类型不是组件 因为组件要单独处理
    typeof virtualDOM.type !== "function"
  ) {
    // 不需要对比
    // 使用新的 virtualDOM 对象生成真实 DOM 对象
    const newElement = createDOMElement(virtualDOM)
    // 使用新的 DOM 对象替换旧的 DOM 对象
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  }
  // 组件更新
  else if (typeof virtualDOM.type === 'function') {
    // 要更新的是组件
    // 1) 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
    // 2) 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
    // 3) 要更新的 DOM 象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
    // 4) 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }
  // 类型相同 更新
  else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }
    // 对比子节点
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧节点的数量

    if (oldChildNodes.length > virtualDOM.children.length) {
      // 有节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }

  }
};

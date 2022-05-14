import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"

// ReactDOM.render(<App />, document.getElementById("root"), function () {
//   console.log("callback")
// })


const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1"></div>
      <div id="c2"></div>
    </div>
    <div id="b2"></div>
  </div>
)

const container = document.getElementById("root")
// 构建根元素的Fiber对象
const workInprogressRoot = {
  stateNode: container,
  props: {
    children: [jsx]
  }
}

// 下一个要执行的任务
let nextUnitOfWork = workInprogressRoot

// 在浏览器空闲时 执行任务
function workLoop (deadline) {
  // 1.是否有空余时间
  // 2.是否要有执行的任务
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 所有任务都执行完成了
  if (!nextUnitOfWork) {
    // 进入第二阶段 执行DOM
    commitRoot()
  }
}

function performUnitOfWork (workInprogressFiber) {
  // 1.创建DOM对象 并将它存储在 stateNode 属性中

  // 2.构建当前Fiber 的子级Fiber
  beginWork(workInprogressFiber)

  // 如果当前Fiber有子级 向下走
  if (workInprogressFiber.child) {
    // 返回子级 构建子级的子级
    return workInprogressFiber.child
  }

  // 向上走
  while (workInprogressFiber) {

    // 构建链表
    completeUnitOfWork(workInprogressFiber)

    // 如果有同级 
    if (workInprogressFiber.sibling) {
      // 返回同级 构建同级的子级
      return workInprogressFiber.sibling
    }
    // 更新父级
    workInprogressFiber = workInprogressFiber.return
  }
}

function beginWork (workInprogressFiber) {
  // 1.创建DOM对象 并将它存储在 stateNode 属性中
  if (!workInprogressFiber.stateNode) {
    // 创建DOM
    workInprogressFiber.stateNode = document.createElement(workInprogressFiber.type)
    // 为 DOM 添加属性
    for (let attr in workInprogressFiber.props) {
      if (attr !== "children") {
        workInprogressFiber.stateNode[attr] = workInprogressFiber.props[attr]
      }
    }
  }
  // 2.构建当前Fiber 的子级Fiber
  if (Array.isArray(workInprogressFiber.props.children)) {
    let previousFiber = null
    workInprogressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type,
        props: child.props,
        effectTag: "PLACEMENT",
        return: workInprogressFiber,
      }
      if (index === 0) {
        workInprogressFiber.child = childFiber
      } else {
        previousFiber.sibling = childFiber
      }
      previousFiber = childFiber
    })
  }

}


function completeUnitOfWork (workInprogressFiber) {
  // 获取当前Fiber 的父级
  const returnFiber = workInprogressFiber.return
  // 看父级是否存在
  if (returnFiber) {
    // 需要执行DOM操作
    if (workInprogressFiber.effectTag) {

      if (!returnFiber.lastEffect) {
        returnFiber.lastEffect = workInprogressFiber.lastEffect
      }

      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = workInprogressFiber.firstEffect
      }

      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workInprogressFiber
      } else {
        returnFiber.firstEffect = workInprogressFiber
      }
      returnFiber.lastEffect = workInprogressFiber
    }
  }

}

function commitRoot () {
  let currentFiber = workInprogressRoot.firstEffect
  while (currentFiber) {
    currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    currentFiber = currentFiber.nextEffect
  }
}

requestIdleCallback(workLoop)

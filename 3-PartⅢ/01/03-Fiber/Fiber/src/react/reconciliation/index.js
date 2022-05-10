import { updateNodeElement } from "../DOM"
import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc"

const taskQueue = createTaskQueue()

let subTask = null
let pendingCommit = null

const commitAllWork = (fiber) => {
  fiber.effects.forEach(item => {
    if (item.effectTag === "update") {
      /**
       * 更新
       */
      if (item.type === item.alternate.type) {
        /**
         * 节点类型相同
         */
        updateNodeElement(item.stateNode, item, item.alternate)
      } else {
        /**
         * 节点类型不同
         */
        item.parent.stateNode.replaceChild(item.stateNode, item.alternate.stateNode)
      }
    }
    else if (item.effectTag === "placement") {
      /**
       * 当前要追加的子节点
       */
      let fiber = item
      /**
       * 当前要追加的子节点的父级
       */
      let parentFiber = item.parent
      /**
       * 找到普通节点父级 排除组件父级
       * 组件父级不能直接追加真是DOM节点
       */
      while (parentFiber.tag === "class_component" || parentFiber.tag === "function_component") {
        parentFiber = parentFiber.parent
      }
      /**
       * 如果子节点是普通节点 找到父级 将子节点追加到父级中
       */
      if (fiber.tag === "host_component") {
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    }
  })
  /**
   * 备份旧的 fiber 节点对象
   */
  fiber.stateNode.__rootFiberContainer = fiber
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop()
  /**
   * 返回最外层节点的fiber对象
   */
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  }
}

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能是对象 也可能是数组 
   * 将children 转换为数组
   */
  const arrifiedChildren = arrified(children)
  /**
   * 循环children使用的索引
   */
  let index = 0
  /**
   * children中元素个数
   */
  let numberOfElements = arrifiedChildren.length
  /**
   * 循环过程中的循环项  子节点的 virtualDOM 对象
   */
  let element = null
  /**
   * 子级fiber对象
   */
  let newFiber = null
  /**
   * 上一个兄弟 fiber 对象
   */
  let prevFiber = null

  let alternate = null
  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child
  }
  while (index < numberOfElements) {
    /**
     * 子级 virtualDOM 对象
     */
    element = arrifiedChildren[index]

    if (element && alternate) {
      /**
       * 更新
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update",
        parent: fiber,
        alternate
      }
      if (element.type === alternate.type) {
        /**类型相同 */
        newFiber.stateNode = alternate.stateNode
      } else {
        /**类型不同 */
        newFiber.stateNode = createStateNode(newFiber)
      }
    }
    /**
     * 初始渲染
     */
    else if (element && !alternate) {

      /**
       * 子级fiber对象
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement",
        parent: fiber,
      }
      /**
       * 为fiber节点添加DOM对象或组件实例对象
       */
      newFiber.stateNode = createStateNode(newFiber)
    }

    if (index == 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    // 更新
    prevFiber = newFiber
    index++

  }
}

const executeTask = (fiber) => {
  /**
   * 构建fiber子对象
   */
  if (fiber.tag === "class_component") {
    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === "function_component") {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }
  if (fiber.child) {
    return fiber.child
  }

  /**
   * 如果存在同级  返回同级  构建同级的子级
   * 如果同级不存在 返回到父级 看父级是否有同级
   */
  let currentExecuteFiber = fiber
  while (currentExecuteFiber.parent) {
    currentExecuteFiber.parent.effects = currentExecuteFiber.parent.effects.concat(
      currentExecuteFiber.effects.concat([currentExecuteFiber])
    )
    if (currentExecuteFiber.sibling) {
      return currentExecuteFiber.sibling
    }
    currentExecuteFiber = currentExecuteFiber.parent
  }
  pendingCommit = currentExecuteFiber
}

const workLoop = (deadline) => {
  // 如果子任务不存在 获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 如果任务存在 && 浏览器有空余时间
  // 调用executeTask执行任务 接受任务 返回新的任务
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)

    /**
     * 第二阶段 渲染阶段
     */
    if (pendingCommit) {
      commitAllWork(pendingCommit)
    }
  }
}

const preformTask = (deadline) => {
  // 执行任务
  workLoop(deadline)
  // 判断任务是否存在  任务队列中是否还有任务未执行
  if (subTask || !taskQueue.isEmpty()) {
    // 有任务在空闲时继续执行
    requestIdleCallback(preformTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1.向任务队列中添加任务
   * 2.指定在浏览器空闲时执行任务
   */

  /**
   * 任务就是通过 vdom 对象 构建fiber对象
   */
  taskQueue.push({
    dom,
    props: { children: element }
  })

  // 指定在浏览器空闲时执行任务
  requestIdleCallback(preformTask)
}
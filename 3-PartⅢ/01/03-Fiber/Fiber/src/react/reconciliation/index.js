import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc"

const taskQueue = createTaskQueue()

let subTask = null
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
    child: null
  }
}

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能是对象 也可能是数组 
   * 将children 转换为数组
   */
  const arrifiedChildren = arrified(children)

  let index = 0
  let numberOfElements = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null
  while (index < numberOfElements) {
    element = arrifiedChildren[index]
    // 子级fiber对象
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: "placement",
      parent: fiber,
    }

    newFiber.stateNode = createStateNode(newFiber)

    if (index == 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }
    prevFiber = newFiber
    index++
  }
}

const executeTask = (fiber) => {
  reconcileChildren(fiber, fiber.props.children)
  if (fiber.child) {
    return fiber.child
  }

  /**
   * 如果存在同级  返回同级  构建同级的子级
   * 如果同级不存在 返回到父级 看父级是否有同级
   */
  let currentExecuteFiber = fiber
  while (currentExecuteFiber.parent) {
    if (currentExecuteFiber.sibling) {
      return currentExecuteFiber.sibling
    }
    currentExecuteFiber = currentExecuteFiber.parent
  }

  console.log(fiber);
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
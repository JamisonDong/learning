import { createTaskQueue } from "../Misc"


const taskQueue = createTaskQueue()

const subTask = null
const getFirstTask = () => { }
const executeTask = (fiber) => { }
const workLoop = (deadline) => {
  // 如果子任务不存在 获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 如果任务存在辟邪浏览器有空余时间
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
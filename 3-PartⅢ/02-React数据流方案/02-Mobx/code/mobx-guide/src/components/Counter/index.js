import React from 'react'
// observer: 监控当前组件使用到的由 MobX 跟踪的 observable state, 当状态发生变化时通知 React 更新视图
import { autorun, runInAction } from "mobx"
import { useEffect } from "react"
import { observer } from "mobx-react-lite";
import { useRootStore } from '../../stores/RootStore';

function Counter (props) {

  const { counterStore } = useRootStore()
  // useEffect(() => {
  //   // 确保 autorun 方法只被初始化一次
  //   autorun(() => {
  //     console.log(counterStore.count)
  //   })
  // }, [])

  // useEffect(() => {
  //   let count = counterStore.count
  //   autorun(() => {
  //     // 错误写法, mobx 跟踪不到变量 count
  //     console.log(count)
  //   })
  // }, [])

  useEffect(() => {
    const person = counterStore.person
    autorun(() => {
      console.log(person.name)
    })
  }, [])
  return (
    <div>
      <p className="paragraph">{counterStore.count}</p>
      <button
        className='button'
        onClick={() => counterStore.increment()}
      >
        加一
      </button>
      <button
        className='button'
        onClick={counterStore.reset}
      >
        重置
      </button>
      <p className="paragraph">{counterStore.person.name}</p>
      <button className='button' onClick={() => runInAction(() => (counterStore.person.name = "李四"))}>李四</button>
      <button className='button' onClick={() => runInAction(() => (counterStore.person = { name: "王五" }))}>王五</button>
    </div>
  )
}

export default observer(Counter)
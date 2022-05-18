import React from 'react'
// observer: 监控当前组件使用到的由 MobX 跟踪的 observable state, 当状态发生变化时通知 React 更新视图
import { observer } from "mobx-react-lite";

function Counter (props) {

  const { counterStore } = props

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
    </div>
  )
}

export default observer(Counter)
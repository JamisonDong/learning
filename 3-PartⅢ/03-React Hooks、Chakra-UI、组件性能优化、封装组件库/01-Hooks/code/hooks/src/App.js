import React, { /* useState, */
  useReducer,
  createContext,
  useContext,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';

const countContext = createContext()

function App () {
  // const [count, setCount] = useState(0);
  // const [person, setPerson] = useState({ name: "张三", age: 20 })

  // function handleCount () {
  //   setCount((count) => {
  //     const newCount = count + 100
  //     document.title = newCount
  //     return newCount
  //   })
  // }

  // 组件挂在完成 和更新后执行
  // useEffect(() => {
  //   console.log(count);
  // })

  // 组件挂载完成
  // useEffect(() => {
  //   console.log(count);
  // }, [])

  // 组件卸载执行
  useEffect(() => {
    return () => {
      console.log('组件被卸载');
    }
  })

  function reducer (state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      default:
        return state
    }
  }

  const [count, dispatch] = useReducer(reducer, 0)

  return <countContext.Provider value={100}>
    <p>{count}</p>
    {/* <p>{person.name}</p>
    <p>{person.age}</p> */}
    {/* <button onClick={handleCount}>+1</button> */}
    {/* <button onClick={() => setPerson({ name: "李四", age: 30 })}>setPerson</button> */}

    <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
    <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    <Foo />
  </countContext.Provider >;
}

function Foo () {
  const value = useContext(countContext)
  // return <countContext.Consumer>
  //   {
  //     value => {
  //       return <div>{value}</div>
  //     }
  //   }
  // </countContext.Consumer>
  return <div>{value}</div>

}

export default App;

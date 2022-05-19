import React, { /* useState, */
  useReducer,
  createContext,
  useContext
} from 'react';

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

    <Foo />
  </countContext.Provider>;
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

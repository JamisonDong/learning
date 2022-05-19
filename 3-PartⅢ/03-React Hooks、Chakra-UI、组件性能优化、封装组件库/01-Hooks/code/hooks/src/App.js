// import React, {
//   useState,
//   useReducer,
//   createContext,
//   useContext,
//   useEffect
// } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
// import axios from "axios"

// const countContext = createContext()



let state = []
let setters = []
let stateIndex = 0

function render () {
  stateIndex = 0
  effectIndex = 0
  ReactDOM.render(<App />, document.getElementById("root"))
}

function createSetter (index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}


function useState (initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex++
  return [value, setter]
}

// 上一次的依赖值
let prevDepAry = []
let effectIndex = 0
function useEffect (callback, depsAry) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('callback is not a function')
  }
  if (typeof depsAry === 'undefined') {
    callback()
  } else {
    if (Object.prototype.toString.call(depsAry) !== "[object Array]") {
      throw new Error('the second param is not a array')
    }
    // 获取上一次的状态值
    let prevDeps = prevDepAry[effectIndex]
    // 对比依赖值 有变化则调用callback
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true


    if (hasChanged) {
      callback()
    }
    // 同步依赖值
    prevDepAry[effectIndex] = depsAry
    effectIndex++
  }
}


function useReducer (reducer, initialState) {
  const [state, setState] = useState(initialState)
  function dispatch (action) {
    const newState = reducer(state, action)
    setState(newState)
  }
  return [state, dispatch]
}


function App () {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("zs");


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
  const [count1, dispatch] = useReducer(reducer, 0)


  useEffect(() => {
    console.log("hello");
  }, [count])
  useEffect(() => {
    console.log("world");
  }, [name])
  return (
    <div>
      {count}
      {count1}

      <button onClick={() => setCount(count + 1)}>
        setCount
      </button>
      {name}
      <button onClick={() => setName("lisi")}>
        setName
      </button>

      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    </div>
  )
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
  // useEffect(() => {
  //   return () => {
  //     console.log('组件被卸载');
  //   }
  // })


  // 自定义hook
  // function useGetPost () {
  //   const [post, setPost] = useState({});
  //   useEffect(() => {
  //     axios.get("https://jsonplaceholder.typicode.com/posts/1").then(response => setPost(response.data))
  //   }, [])
  //   return [post, setPost]
  // }


  // function useUpdateInput (initialState) {
  //   const [value, setValue] = useState(initialState);
  //   return {
  //     value,
  //     onChange: event => setValue(event.target.value)
  //   }
  // }

  // function reducer (state, action) {
  //   switch (action.type) {
  //     case 'increment':
  //       return state + 1
  //     case 'decrement':
  //       return state - 1
  //     default:
  //       return state
  //   }
  // }

  // const [count, dispatch] = useReducer(reducer, 0)
  // const [post, setPost] = useGetPost()

  // const usernameInput = useUpdateInput('')
  // const passwordInput = useUpdateInput('')
  // const submitForm = (event) => {
  //   event.preventDefault()
  //   console.log(usernameInput.value);
  //   console.log(passwordInput.value);
  // }
  // return (
  //   <form onSubmit={submitForm}>
  //     <input type='text' name='username' {...usernameInput} />
  //     <input type='password' name='password' {...passwordInput} />
  //     <input type='submit' />
  //   </form>
  // )

  // return (
  //   <div>
  //     <p>{post.title}</p>
  //     <div>{post.body}</div>
  //   </div>
  // )
  // return <countContext.Provider value={100}>
  //   <p>{count}</p>
  //   {/* <p>{person.name}</p>
  //   <p>{person.age}</p> */}
  //   {/* <button onClick={handleCount}>+1</button> */}
  //   {/* <button onClick={() => setPerson({ name: "李四", age: 30 })}>setPerson</button> */}

  //   <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
  //   <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
  //   <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
  //   <Foo />
  // </countContext.Provider >;
}

// function Foo () {
//   const value = useContext(countContext)
//   // return <countContext.Consumer>
//   //   {
//   //     value => {
//   //       return <div>{value}</div>
//   //     }
//   //   }
//   // </countContext.Consumer>
//   return <div>{value}</div>

// }

export default App;

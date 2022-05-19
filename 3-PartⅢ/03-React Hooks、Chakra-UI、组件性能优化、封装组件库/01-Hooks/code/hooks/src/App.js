import React, { useState } from 'react';



function App () {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({ name: "张三", age: 20 })

  function handleCount () {
    setCount((count) => {
      const newCount = count + 100
      document.title = newCount
      return newCount
    })

  }

  return <div>
    <p>{count}</p>
    <p>{person.name}</p>
    <p>{person.age}</p>
    <button onClick={handleCount}>+1</button>
    <button onClick={() => setPerson({ name: "李四", age: 30 })}>setPerson</button>
  </div>;
}

export default App;

import { useState } from "react"

function TodoHeader (props) {
  const { createTodo } = props
  const [title, setTitle] = useState('');
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyUp={event => {
          if (event.key === "Enter") {
            createTodo(title)
            setTitle("")
          }
        }}
      />
    </header>
  )
}

export default TodoHeader

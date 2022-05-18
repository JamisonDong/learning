import { useTodoListStore } from "../../stores/TodoStore/TodoListStore"

function TodoView (props) {
  const { todo } = props
  const todoListStore = useTodoListStore()
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{todo.title}</label>
        <button
          className="destroy"
          onClick={() => todoListStore.removeTodo(todo.id)}
        />
      </div>
      <input className="edit" />
    </li>
  )
}

export default TodoView

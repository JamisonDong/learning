import { useTodoListStore } from "../../stores/TodoStore/TodoListStore"
import { observer } from "mobx-react-lite"

function TodoView (props) {
  const { todo } = props
  const todoListStore = useTodoListStore()
  return (
    <li className={todo.completed ? "completed" : ""}>
      <div className="view">
        <input
          checked={todo.completed}
          className="toggle"
          type="checkbox"
          onChange={todo.toggle}
        />
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

export default observer(TodoView)

import TodoHeader from "./TodoHeader"
import TodoFooter from "./TodoFooter"
import TodoView from "./TodoView"
import { observer } from "mobx-react-lite"
function TodoListView (props) {

  const { todoListStore } = props

  return (
    <section className="todoapp">
      <TodoHeader createTodo={title => todoListStore.createTodo(title)} />
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {
            todoListStore.todos.map(todo => (
              <TodoView todo={todo} key={todo.id} />
            ))
          }
        </ul>
      </section>
      <TodoFooter />
    </section>
  )
}

export default observer(TodoListView)

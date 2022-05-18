import TodoHeader from "./TodoHeader"
import TodoFooter from "./TodoFooter"
import TodoView from "./TodoView"
import { observer } from "mobx-react-lite"
import { useTodoListStore } from "../../stores/TodoStore/TodoListStore"

function TodoListView (props) {

  const todoListStore = useTodoListStore()

  return (
    <section className="todoapp">
      <TodoHeader />
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {
            todoListStore.filterTodos.map(todo => (
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

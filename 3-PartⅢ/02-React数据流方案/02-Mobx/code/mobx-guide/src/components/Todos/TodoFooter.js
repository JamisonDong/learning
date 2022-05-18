import { observer } from "mobx-react-lite"
import { useRootStore } from '../../stores/RootStore';

function TodoFooter () {

  const { todoListStore } = useRootStore()

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoListStore.unCompletedTodoCount}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <button
            className={todoListStore.filter === "all" ? "selected" : ""}
            onClick={() => todoListStore.changeFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={todoListStore.filter === "active" ? "selected" : ""}
            onClick={() => todoListStore.changeFilter("active")}
          >Active</button>
        </li>
        <li>
          <button
            className={todoListStore.filter === "completed" ? "selected" : ""}
            onClick={() => todoListStore.changeFilter("completed")}>Completed</button>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default observer(TodoFooter)

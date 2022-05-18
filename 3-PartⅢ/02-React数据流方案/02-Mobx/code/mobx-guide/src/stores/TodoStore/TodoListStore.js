import TodoViewStore from "./TodoViewStore"
import { makeObservable, observable, action, computed } from "mobx"
import { createContext, useContext } from "react"

class TodoListStore {
  todos = []
  constructor(todos) {
    if (todos) {
      this.todos = todos
    }
    makeObservable(this, {
      todos: observable,
      createTodo: action,
      removeTodo: action,
      unCompletedTodoCount: computed
    })
  }

  get unCompletedTodoCount () {
    return this.todos.filter(todo => !todo.completed).length
  }
  createTodo (title) {
    this.todos.push(new TodoViewStore(title))
  }
  removeTodo (id) {
    const index = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(index, 1)
  }
}

const TodoListStoreContext = createContext()

const TodoListStoreProvider = ({ store, children }) => {
  return (
    <TodoListStoreContext.Provider value={store}>
      {children}
    </TodoListStoreContext.Provider>
  )
}
const useTodoListStore = () => {
  return useContext(TodoListStoreContext)
}

export {
  TodoListStore,
  TodoListStoreProvider,
  useTodoListStore
}
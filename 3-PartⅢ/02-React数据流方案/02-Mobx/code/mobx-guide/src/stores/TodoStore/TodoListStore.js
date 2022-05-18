import TodoViewStore from "./TodoViewStore"
import { makeObservable, observable, action, computed, runInAction } from "mobx"
import { createContext, useContext } from "react"
import axios from "axios"

class TodoListStore {
  todos = []
  filter = "all"
  constructor(todos) {
    if (todos) {
      this.todos = todos
    }
    makeObservable(this, {
      todos: observable,
      createTodo: action,
      removeTodo: action,
      unCompletedTodoCount: computed,
      filter: observable,
      changeFilter: action,
      filterTodos: computed,
    })
    this.loadTodos()
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

  changeFilter (filter) {
    this.filter = filter
  }
  get filterTodos () {
    switch (this.filter) {
      case 'all':
        return this.todos
      case 'active':
        return this.todos.filter(todo => !todo.completed)
      case 'completed':
        return this.todos.filter(todo => todo.completed)
      default:
        return this.todos
    }
  }

  async loadTodos () {
    let todos = await axios.get("http://localhost:3005/todos").then(response => response.data)

    runInAction(() => todos.forEach(todo => this.todos.push(new TodoViewStore(todo.title))))
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
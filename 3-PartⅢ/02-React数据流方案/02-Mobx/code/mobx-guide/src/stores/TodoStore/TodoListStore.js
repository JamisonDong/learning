import TodoViewStore from "./TodoViewStore"
import { makeObservable, observable, action } from "mobx"

class TodoListStore {
  todos = []
  constructor(todos) {
    if (todos) {
      this.todos = todos
    }
    makeObservable(this, {
      todos: observable,
      createTodo: action
    })
  }
  createTodo (title) {
    this.todos.push(new TodoViewStore(title))
  }
}

export default TodoListStore
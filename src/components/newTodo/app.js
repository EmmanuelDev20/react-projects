import { useState } from "react"
import TodoCrud from './todoCrud'

import './todoCrud.css'

export default function NewTodoApp() {
  const [ title, setTitle ] = useState("")
  const [ todos, setTodos ] = useState([])

  function handleChange(e) {
    const value = e.target.value
    setTitle(value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if(title != '') {
      const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false
      }
      const temp = [...todos]
      temp.unshift(newTodo)
  
      setTodos(temp)
      setTitle('')
    }
  }

  function handleUpdate( id, value) {
    const temp = [...todos]
    const item = temp.find(element => element.id === id)
    item.title = value
    setTodos(temp)    
  }

  function handleDelete( id ) {
    const temp = [...todos]
    const filterTodos = temp.filter(element => element.id != id)
    setTodos(filterTodos)
  }

  return (
    <div className="todoContainer">
      <form onSubmit={ handleSubmit } className="todoCreateForm">
        <input className="todoInput" onChange={handleChange} value={title} />
        <input type="submit" value="Create todo" className="buttonCreate" />
      </form>
      <div className="todosContainer">
        {
          todos.map( item => (
              <TodoCrud key={ item.id } idProp={ item.id } title={ item.title } onUpdate={ handleUpdate } onDelete={ handleDelete } />
          ))
        }
      </div>

    </div>
  );
}
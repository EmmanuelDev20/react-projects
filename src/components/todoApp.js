import { useState } from "react";
import Todo from "./todo";

import './todoApp.css';

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    const value = e.target.value
    setTitle(value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const newTodo = {
      id: crypto.randomUUID(), 
      title: title,
      completed: false
    }

    //This works great setTodos([...todos, newTodo])
    const temp = [...todos];
    temp.unshift(newTodo);
    setTodos(temp)
    setTitle("")
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find(item => item.id === id)
    item.title = value
    setTodos(temp)
  }

  function handleDelete(id) {
    const temp = todos.filter(item => item.id !== id)
    setTodos(temp)
  }

  return (
    <div className="todoContainer"> 
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input className="todoInput" onChange={handleChange} value={title} />
        <input type="submit" value="Create todo" onClick={handleSubmit} className="buttonCreate" />
      </form>
      <div className="todosContainer">
        {
          todos.map((item, idx) => (
            <Todo key={item.id} item={item} id={idx} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))
        }
      </div>
    </div>
  );
}
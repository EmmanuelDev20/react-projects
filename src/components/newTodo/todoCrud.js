import { useState } from "react"

export default function TodoCrud({ idProp, title, onUpdate, onDelete }) {
  const [ isEdit, setIsEdit ] = useState(false)

  function FormEdit() {
    const [ newValue, setNewValue ] = useState(title)

    function handleSubmit(e) {
      e.preventDefault()
      onUpdate(idProp, newValue)
      setIsEdit(false)
    }

    function handleChange(e) {
      const value = e.target.value
      setNewValue(value)
    }
    
    return (
    <form className="todoUpdateForm" onSubmit={ handleSubmit }>
      <input 
        onChange={ handleChange } 
        value={ newValue } 
        type="text" 
        className="todoInput" 
      />
      <button className="button">Update</button>
    </form>
    )
  }

  function TodoElement() {
    function handleDelete() {
      onDelete(idProp)
    }

    return (
      <div className="todoInfo">
        { title } 
        <button onClick={() => setIsEdit(true)}>Editar</button>
        <button onClick={ handleDelete }>Delete</button>
      </div>
    )
  }

  return (
    <>
      <div className="todo">
        { isEdit ? <FormEdit /> : <TodoElement /> }
      </div>
      
      </>
    )
}
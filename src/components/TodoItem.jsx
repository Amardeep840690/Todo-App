import React, { useState, useEffect } from 'react'
import './TodoItem.css'
import { UseTodo } from '../contexts'
function TodoItem({ todo }) {
    const { updateTodo, toggleCompleted, deleteTodo } = UseTodo()
    const [istodoeditable, setistodoeditable] = useState(false)
    const [message, setmessage] = useState(todo.text)

    useEffect(() => {
        setmessage(todo.text)
    }, [todo.text])

    const edittodo = () => {
        updateTodo(todo.id, { ...todo, text: message })
    }

    const todocomplete = () => {
        toggleCompleted(todo.id)
    }

    const deleted = () => {
        deleteTodo(todo.id)
    }
    return (

        <>
            <div className={`todo ${todo.completed ? "boxcomplete" : "todo"}`}>
                <input type="checkbox" onChange={todocomplete} checked={todo.completed} />
                <input
                    type="text"
                    className={`${todo.completed ? "complete" : "" } ${istodoeditable ? "active" : ""}`}
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    readOnly={!istodoeditable} />
                <button disabled={todo.completed} onClick={() => {
                    if (!istodoeditable) {
                        setistodoeditable(!istodoeditable)
                    } else {
                        edittodo()
                        setistodoeditable(!istodoeditable)
                    }
                }}>{istodoeditable ? "💾" : "✏️"} </button>
                <button onClick={deleted}>❌</button>
            </div>
        </>
    )
}

export default TodoItem

import { useEffect, useState } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'
import TodoStatistics from './components/TodoStatistics'
import { Todocontextprovider } from './contexts'
function App() {
  const [todos, setTodos] = useState([])
  const [todomsg, settodomsg] = useState("")
  const [remaining, setremaining] = useState("")
  const [filters, setFilter] = useState("all")
  const [popuptext, setPopuptext] = useState('')
  const [hidden, setHidden] = useState(true)

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => (prevtodo.id !== id)))
  }

  const toggleCompleted = (id) => {
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    let element = 0;
    for (let index = 0; index < todos.length; index++) {
      if (!todos[index].completed) {
        element += 1
      }
    }
    setremaining(`${element} of ${todos.length} tasks remaining`)
  }, [todos])

  const allcomplete = () => {
    for (let index = 0; index < todos.length; index++) {
      if (todos[index].completed) {
        continue
      } else {
        toggleCompleted(todos[index].id)
      }
    }
  }

  const clearcomplete = () => {
    for (let index = 0; index < todos.length; index++) {
      if (todos[index].completed) {
        deleteTodo(todos[index].id)
      } else {
        continue
      }

    }
  }

  const filteredtodos = todos.filter((todoitem) => {
    if (filters === "all") return true
    else if (filters === "active") return !todoitem.completed
    else return todoitem.completed
  })

  const add = (e) => {
    // If called from keyboard, allow only Enter
    if(e.key && e.key !== "Enter") return;

    if (!todomsg) return

    addTodo({ text: todomsg, completed: false })
    settodomsg("")

    setHidden(false)
    setPopuptext(`🚀 Task "${todomsg}" added — let’s get it done!`)
    setTimeout(() => {
      setPopuptext('')
      setHidden(true)
    }, 2000);
  }

  return (
    <Todocontextprovider value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}>
      <div id="popup" hidden={hidden}>{popuptext}
      <div id="animated"></div>
    </div>
      <div className="header" >
        <h1 className="">Todo List</h1>
        <p className="">Manage your Todo</p>
      </div>
      <div className="addTodo">
        <div className="inputfield">
          <input
            type="text"
            placeholder="Add a new todo..."
            className=""
            value={todomsg}
            onChange={(e) => settodomsg(e.target.value)}
            onKeyDown={add}
          />
        </div>
        <button className="" onClick={add}>
          <span className="">+ &nbsp;Add</span>
        </button>
      </div>


      <div className="filterTabs">
        <button className={filters === "all" ? "active" : "deactive"} onClick={() => setFilter("all")}>All</button>
        <button className={filters === "active" ? "active" : "deactive"} onClick={() => setFilter("active")}>Active</button>
        <button className={filters === "complete" ? "active" : "deactive"} onClick={() => setFilter("complete")}>Completed</button>
      </div>

      <div className="todoContent">
        {/* show all todos */}
        {filteredtodos.map((todoitem) => (
          <TodoItem key={todoitem.id} todo={todoitem} />
        ))}

        {todos.length === 0 && "No todos yet. Add one above 👆"}

      </div>
      <div className="todoFooter">
        <p className=''>{remaining}</p>
        <div className="todosButton">
          <button onClick={allcomplete}>Mark All Complete</button>
          <button onClick={clearcomplete}>Clear Completed</button>
        </div>
      </div>

      {/* statics section */}
      <TodoStatistics />
    </Todocontextprovider>

  )
}

export default App

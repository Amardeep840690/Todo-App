import React, { useEffect, useState } from 'react'
import './TodoStatistics.css'
import { UseTodo } from '../contexts'

function TodoStatistics() {
  const { todos } = UseTodo()
  // const [complete, setcomplete] = useState(0)
  // const [progress, setprogress] = useState(0)

  // useEffect(() => {
  //   let count = 0
  //   for (let index = 0; index < todos.length; index++) {
  //     if (todos[index].completed) {
  //       count += 1
  //     }
  //   }
  //   setcomplete(count)
  //   if (todos.length !== 0) {
  //     let check = (count / todos.length) * 100;
  //     setprogress(check)
  //   } else {
  //     setprogress(0)
  //   }
  // }, [todos])
  const complete = todos.filter(todo => todo.completed).length
  const progress = todos.length
    ? (complete / todos.length) * 100
    : 0

  return (
    <>
      <div className="Statistics">
        <p>Statistics</p>
        <div className="DisplayTab">
          <div className="box">
            <p className='showtodono'>{todos.length}</p>
            <p className="message">Total Tasks</p>
          </div>
          <div className="box">
            <p className='showtodono'>{todos.length - complete}</p>
            <p className="message">Active Tasks</p>
          </div>
          <div className="box">
            <p className='showtodono'>{complete}</p>
            <p className="message">Completed</p>
          </div>
        </div>
        <div className="progressSection">
          <div className="progressHeader">
            <span>Progress</span>
            <span>{Number.parseInt(progress)}%</span>
          </div>

          <div className="progressBar">
            <div className="progressFill" style={{ width: `${Number.parseInt(progress)}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoStatistics

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
    const [task,setTask]=useState('');
    const [todo,setTodo]=useState([])
    const addTask=async()=>{
        if(task.trim()){
          const res=await fetch('http://localhost:3000/api/addtodo',
            {
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({task})
            }
          )
          const data=await res.json()
          res.status===201?alert(data.msg):alert(data.msg)
          getTodos();
        }
    }
    const getTodos=async()=>{
      const res=await fetch('http://localhost:3000/api/gettodos')
      const data=await res.json();
      if(res.status==200){
        setTodo([...data])
      }
      else{
        alert(data.msg)
      }
    }
    const deleteTask=async(task)=>{
      const res=await fetch(`http://localhost:3000/api/deletetodo/${task}`,
        {
          method:"DELETE",
          headers:{"Content-Type":"application/json"}
        }
      )
      getTodos();
    }
    useEffect(()=>{
      getTodos()
      setTask("")
    },[])
  return (
    <div className="todo-app">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-form">
        <input type="text"placeholder="Enter your task" onChange={(e)=>setTask(e.target.value)} className="todo-input"/>
        <button onClick={addTask} className="todo-submit-btn">
          Add Task
        </button>
      </div>
      <ul className="todo-list">
        {
          todo.map((task)=><li key={task._id} className='todo-item'>{task.task} <button className='todo-delete-btn' onClick={()=>deleteTask(task._id)}>Delete</button></li>)
        }
      </ul>
    </div>
  );
}

export default App

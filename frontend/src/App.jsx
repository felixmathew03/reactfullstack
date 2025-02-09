import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
    const [task,setTask]=useState('');
    const [newTask,setNewTask]=useState('');
    const [todo,setTodo]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [taskId,setTaskId]=useState("");
    useEffect(()=>{
      getTodos()
    },[])
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
         if ( res.status===201) {
          alert("data.msg");
          setTask("")
         }else{
          alert(data.msg)
         }
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
    const enableEdit=(id,task)=>{
      setIsEdit(true);
      setTaskId(id);
      setNewTask(task);
    }
    const editTask=async()=>{
      console.log(taskId,newTask);
      
      const res=await fetch(`http://localhost:3000/api/edittodo/${taskId}`,
        {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({newTask})
        }
      )
      if(res.status==201){
        alert("Updated")
      }else{
        alert("Failed");
      }
      setIsEdit(false);
      setTaskId("");
      setNewTask("");
      getTodos();
    }
  return (
    <div className="todo-app">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-form">
        <input type="text"placeholder="Enter your task" value={task} onChange={(e)=>setTask(e.target.value)} className="todo-input"/>
        <button onClick={addTask} className="todo-submit-btn">
          Add Task
        </button>
      </div>
      <ul className="todo-list">
        {
          todo.map((task)=><li key={task._id} className='todo-item'><input className='input' type="text"  value={isEdit&&(taskId==task._id)?newTask:task.task} disabled={!(isEdit&&(taskId==task._id))} onChange={(e)=>setNewTask(e.target.value)}/>   
          {(isEdit&&(taskId==task._id))?<button className='todo-edit-btn' onClick={editTask}>Ok</button>:<button className='todo-edit-btn' onClick={()=>enableEdit(task._id,task.task)}>Edit</button>}
          <button className='todo-delete-btn' onClick={()=>deleteTask(task._id)}>Delete</button></li>)
        }
      </ul>
    </div>
  );
}

export default App

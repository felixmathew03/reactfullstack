import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    fetchTodo();
  },[])
  const fetchTodo=async()=>{
    const res=await fetch("http://localhost:3000/api/gettodos");
    console.log(res);
    
    const data=await res.json();
    console.log(data);
    
    // setTodos([...data])
  }
  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {

      setTodos([...todos, task]);
      setTask(''); // Clear the input field after submission
    }
  };

  return (
    <div className="todo-app">
      <h1 className="todo-header">Todo List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleInputChange} placeholder="Enter your task" className="todo-input"/>
        <button type="submit" className="todo-submit-btn">
          Add Task
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App

import { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage when initializing state
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? storedTasks.split(',') : []; // Split by comma to get tasks or return an empty array
  });
  
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      const updatedTasks = [...tasks, taskInput.trim()];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', updatedTasks.join(',')); // Store as a comma-separated string
      setTaskInput(''); // Clear input after adding
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', updatedTasks.join(',')); // Update local storage
  };

  return (
    <>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;

import React, { useState } from "react";
import "./ToDoList.css"; // optional - if you want to add styles

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("Task1","Task2","Task3"); // better to start with empty string

  // Handle input change
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new task
  function addTask() {
    // Prevent adding empty tasks
    if (newTask.trim() === "") return;

    // Add new task to the beginning (or end - your choice)
    setTasks([newTask, ...tasks]);
    // Alternative (add to end): setTasks([...tasks, newTask]);

    // Clear input after adding
    setNewTask("");
  }

  // Delete a task by index
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  // Move task up (swap with the one above)
  function moveTaskUp(index) {
    if (index === 0) return; // already at the top

    const updatedTasks = [...tasks];
    // Swap current task with the one above
    [updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ];

    setTasks(updatedTasks);
  }

  // Move task down (swap with the one below)
  function moveTaskDown(index) {
    if (index === tasks.length - 1) return; // already at the bottom

    const updatedTasks = [...tasks];
    // Swap current task with the one below
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];

    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>

            <div className="buttons">
              <button
                className="move-button"
                onClick={() => moveTaskUp(index)}
                disabled={index === 0}
              >
                ↑
              </button>

              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
                disabled={index === tasks.length - 1}
              >
                ↓
              </button>

              <button className="delete-button" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* Optional: show message when list is empty */}
      {tasks.length === 0 && (
        <p className="empty-message">No tasks yet. Add one!</p>
      )}
    </div>
  );
}

export default ToDoList;
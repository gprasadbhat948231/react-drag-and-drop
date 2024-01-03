import react from "react";
import "./CreateTask.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const CreateTask = ({ tasks, setTasks }) => {
  const initialState = {
    id: "",
    taskName: "",
    status: "added",
  };

  const [task, setTask] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, id: uuidv4(), [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      const tasks = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    });

    setTask(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-task-container">
        <input
          type="text"
          value={task.taskName}
          onChange={handleInputChange}
          placeholder="Enter new task"
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateTask;

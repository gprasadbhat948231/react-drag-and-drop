import "../Styles/CreateTask.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getFormattedDate } from "../Utils/currentDate";

const CreateTask = ({ setTasks }) => {
  const initialState = {
    id: "",
    taskName: "",
    status: "Added",
    timeStamp: "",
  };

  const [task, setTask] = useState(initialState);

  const formattedDate = getFormattedDate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, id: uuidv4(), [name]: value, timeStamp: formattedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(() => {
      let prev = JSON.parse(localStorage.getItem("task"));
      let tasks = [];

      if (prev) tasks = [...prev, task];
      else tasks.push(task);

      localStorage.setItem("task", JSON.stringify(tasks));
      return tasks;
    });
    setTask(initialState);
  };

  return (
    <div className="create-task-container">
      <form onSubmit={handleSubmit} className="create-task-form">
        <input
          type="text"
          name="taskName"
          value={task.taskName}
          onChange={handleInputChange}
          placeholder="Enter new task"
          className="task-input"
        />
        <button className="task-create-btn" disabled={task.taskName === ""}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

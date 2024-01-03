import "./App.css";
import CreateTask from "./Components/CreateTask";
import { useState, useEffect } from "react";
import ListTasks from "./Components/ListTasks";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <div className="App">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;

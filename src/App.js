import "./App.css";
import CreateTask from "./Components/CreateTask";
import { useState, useEffect } from "react";
import ListTasks from "./Components/ListTasks";
import Heading from "./Components/Heading";
function App() {
  const [tasks, setTasks] = useState([]);
  const [added, setAdded] = useState({
    name: "Added",
    tasks: [],
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("task"));
    if (data) setTasks(data);
  }, []);

  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
        <div className="task-management-container">
          <Heading />
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTasks
            tasks={tasks}
            setTasks={setTasks}
            added={added}
            setAdded={setAdded}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

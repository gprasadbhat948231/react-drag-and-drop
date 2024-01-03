import { useState, useEffect } from "react";
import Section from "./Sections";
import "./Sections.css";

const ListTasks = ({ tasks, setTasks }) => {
  const [added, setAdded] = useState([]);
  const [started, setStarted] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (tasks) {
      const add = tasks.filter((el) => el.status === "added");
      const start = tasks.filter((el) => el.status === "started");
      const complete = tasks.filter((el) => el.status === "completed");
      setAdded(add);
      setStarted(start);
      setCompleted(complete);
    }
  }, [tasks]);

  const sections = ["Added", "Started", "Completed"];

  return (
    <div className="sections-container">
      {sections.map((el, index) => (
        <Section
          key={index}
          status={el}
          tasks={tasks}
          setTasks={setTasks}
          added={added}
          started={started}
          completed={completed}
        />
      ))}
    </div>
  );
};
export default ListTasks;

import { useState, useMemo, useEffect } from "react";
import Header from "./Header";
import "../Styles/Tasks.css";
import AddedTask from "./AddedTask";
import StartedTask from "./StartedTask";
import CompletedTask from "./CompletedTask";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { onDragEnd } from "../Utils/index";

const ListTasks = ({ tasks, added, setAdded }) => {
  const [started, setStarted] = useState({
    name: "Started",
    tasks: [],
  });

  const [completed, setCompleted] = useState({
    name: "Completed",
    tasks: [],
  });

  useEffect(() => {
    if (tasks) {
      const add = tasks.filter((el) => el.status === "Added");
      const start = tasks.filter((el) => el.status === "Started");
      const complete = tasks.filter((el) => el.status === "Completed");
      setAdded({ name: "Added", tasks: add });
      setStarted({ name: "Started", tasks: start });
      setCompleted({ name: "Completed", tasks: complete });
    }
  }, [tasks]);

  const mergedTasks = [...added.tasks, ...started.tasks, ...completed.tasks];

  useMemo(() => {
    if (mergedTasks.length > 0)
      localStorage.setItem("task", JSON.stringify(mergedTasks));
  }, [mergedTasks]);

  const statuses = [
    {
      id: 1,
      name: "Added",
      total: added.tasks && added.tasks.length,
    },
    {
      id: 2,
      name: "Started",
      total: started.tasks && started.tasks.length,
    },
    {
      id: 3,
      name: "Completed",
      total: completed.tasks && completed.tasks.length,
    },
  ];

  return (
    <div className="sections-container">
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(
            result,
            added,
            setAdded,
            started,
            setStarted,
            completed,
            setCompleted
          )
        }
      >
        {statuses.map((el) => (
          <div className={"tasks-container-" + el.name} key={el.id}>
            <Header head={el.name} totalTasks={el.total} />
            <Droppable droppableId={`${el.id}`}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="tasks-categories-cont"
                >
                  {el.name === "Added" ? (
                    <AddedTask tasks={added.tasks} id={el.id} />
                  ) : el.name === "Started" ? (
                    <StartedTask tasks={started.tasks} id={el.id} />
                  ) : (
                    <CompletedTask tasks={completed.tasks} id={el.id} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ListTasks;

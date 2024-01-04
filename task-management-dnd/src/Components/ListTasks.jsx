import { useState, useEffect } from "react";
import Header from "./Header";
import "./ListTasks.css";
import AddedTask from "./AddedTask";
import StartedTask from "./StartedTask";
import CompletedTask from "./CompletedTask";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

const onDragEnd = (
  result,
  added,
  setAdded,
  started,
  setStarted,
  completed,
  setCompleted
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId != destination.droppableId) {
    if (destination.droppableId == 2 && source.droppableId == 1) {
      setStarted({
        name: "Started",
        tasks: [...started.tasks, added.tasks[source.index]],
      });
      let updatedTasks = added.tasks.filter(
        (el, index) => index !== source.index
      );
      setAdded({ name: "Added", tasks: updatedTasks });
    } else if (destination.droppableId == 3 && source.droppableId == 1) {
      setCompleted({
        name: "Completed",
        tasks: [...completed.tasks, added.tasks[source.index]],
      });
      let updatedTasks = added.tasks.filter(
        (el, index) => index !== source.index
      );
      setAdded({ name: "Added", tasks: updatedTasks });
    } else if (source.droppableId == 2 && destination.droppableId == 1) {
      setAdded({
        name: "Added",
        tasks: [...added.tasks, started.tasks[source.index]],
      });
      let updatedTasks = started.tasks.filter(
        (el, index) => index !== source.index
      );
      setStarted({ name: "Started", tasks: updatedTasks });
    } else if (source.droppableId == 3 && destination.droppableId == 1) {
      setAdded({
        name: "Added",
        tasks: [...added.tasks, completed.tasks[source.index]],
      });
      let updatedTasks = completed.tasks.filter(
        (el, index) => index !== source.index
      );
      setCompleted({ name: "Completed", tasks: updatedTasks });
    } else if (source.droppableId == 2 && destination.droppableId == 3) {
      setCompleted({
        name: "Completed",
        tasks: [...completed.tasks, started.tasks[source.index]],
      });
      let updatedTasks = started.tasks.filter(
        (el, index) => index !== source.index
      );
      setStarted({ name: "Started", tasks: updatedTasks });
    } else {
      setStarted({
        name: "Started",
        tasks: [...started.tasks, completed.tasks[source.index]],
      });
      let updatedTasks = completed.tasks.filter(
        (el, index) => index !== source.index
      );
      setCompleted({ name: "Completed", tasks: updatedTasks });
    }
  } else {
    if (source.droppableId == 1) {
      const dupItems = [...added.tasks];
      const [removed] = dupItems.splice(source.index, 1);
      dupItems.splice(destination.index, 0, removed);
      setAdded({ name: "Added", tasks: dupItems });
    } else if (source.droppableId == 2) {
      const dupItems = [...started.tasks];
      const [removed] = dupItems.splice(source.index, 1);
      dupItems.splice(destination.index, 0, removed);
      setStarted({ name: "Started", tasks: dupItems });
    } else {
      const dupItems = [...completed.tasks];
      const [removed] = dupItems.splice(source.index, 1);
      dupItems.splice(destination.index, 0, removed);
      setCompleted({ name: "Completed", tasks: dupItems });
    }
  }
};

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

  const statuses = [
    {
      id: 1,
      name: "Added",
    },
    {
      id: 2,
      name: "Started",
    },
    {
      id: 3,
      name: "Completed",
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
          <div className="added-container" key={el.id}>
            <Header head={el.name} />
            <Droppable droppableId={`${el.id}`}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgray",
                    padding: "4px",
                  }}
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

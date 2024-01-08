export const onDragEnd = (
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

  const filteringFunction = (data) => {
    let updatedTasks = data.tasks.filter((el, index) => index !== source.index);
    return updatedTasks;
  };

  const updateTaskStatus = (list, status) => {
    let taskToBeUpdated = list.tasks[source.index];
    let updatedTask = { ...taskToBeUpdated, status: status };
    return updatedTask;
  };

  if (source.droppableId !== destination.droppableId) {
    switch (`${destination.droppableId}-${source.droppableId}`) {
      case "2-1": {
        let updatedStatus = updateTaskStatus(added, "Started");
        setStarted({
          name: "Started",
          tasks: [...started.tasks, updatedStatus],
        });

        let updatedTasks = filteringFunction(added);
        setAdded({ name: "Added", tasks: updatedTasks });
        break;
      }
      case "3-1": {
        let updatedStatus = updateTaskStatus(added, "Completed");

        setCompleted({
          name: "Completed",
          tasks: [...completed.tasks, updatedStatus],
        });

        let updatedTasks = filteringFunction(added);
        setAdded({ name: "Added", tasks: updatedTasks });
        break;
      }
      case "1-2": {
        let updatedStatus = updateTaskStatus(started, "Added");
        setAdded({
          name: "Added",
          tasks: [...added.tasks, updatedStatus],
        });
        let updatedTasks = filteringFunction(started);
        setStarted({ name: "Started", tasks: updatedTasks });
        break;
      }
      case "1-3": {
        let updatedStatus = updateTaskStatus(completed, "Added");
        setAdded({
          name: "Added",
          tasks: [...added.tasks, updatedStatus],
        });
        let updatedTasks = filteringFunction(completed);
        setCompleted({ name: "Completed", tasks: updatedTasks });
        break;
      }
      case "3-2": {
        let updatedStatus = updateTaskStatus(started, "Completed");
        setCompleted({
          name: "Completed",
          tasks: [...completed.tasks, updatedStatus],
        });
        let updatedTasks = filteringFunction(started);
        setStarted({ name: "Started", tasks: updatedTasks });
        break;
      }
      default: {
        let updatedStatus = updateTaskStatus(completed, "Started");
        setStarted({
          name: "Started",
          tasks: [...started.tasks, updatedStatus],
        });
        let updatedTasks = filteringFunction(completed);
        setCompleted({ name: "Completed", tasks: updatedTasks });
      }
    }
  } else {
    switch (`${source.droppableId}`) {
      case "1": {
        const dupItems = [...added.tasks];
        const [removed] = dupItems.splice(source.index, 1);
        dupItems.splice(destination.index, 0, removed);
        setAdded({ name: "Added", tasks: dupItems });
        break;
      }
      case "2": {
        const dupItems = [...started.tasks];
        const [removed] = dupItems.splice(source.index, 1);
        dupItems.splice(destination.index, 0, removed);
        setStarted({ name: "Started", tasks: dupItems });
        break;
      }
      default: {
        const dupItems = [...completed.tasks];
        const [removed] = dupItems.splice(source.index, 1);
        dupItems.splice(destination.index, 0, removed);
        setCompleted({ name: "Completed", tasks: dupItems });
        break;
      }
    }
  }
};

import { Draggable } from "react-beautiful-dnd";
import "../Styles/Tasks.css";

const StartedTask = ({ tasks }) => {
  return (
    <div className="individual-task-container">
      {tasks.length > 0 &&
        tasks.map((el, index) => (
          <Draggable key={el.id} draggableId={el.id} index={index}>
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                  className="tasks"
                >
                  <p key={el.id}>Task : {el.taskName}</p>
                  <p>Started On: {el.timeStamp}</p>
                  <p>Last Updated: {el.lastUpdated}</p>
                </div>
              );
            }}
          </Draggable>
        ))}
    </div>
  );
};

export default StartedTask;

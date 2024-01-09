import { Draggable } from "react-beautiful-dnd";
import "../Styles/Tasks.css";

const CompletedTask = ({ tasks }) => {
  return (
    <div className="individual-task-container">
      {tasks.length > 0 &&
        tasks.map((el, index) => (
          <Draggable key={el.id} draggableId={`${el.id}`} index={index}>
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
                  <div>
                    <p key={el.id}>Task : {el.taskName}</p>
                    <p>Completed On: {el.timeStamp}</p>
                  </div>
                </div>
              );
            }}
          </Draggable>
        ))}
    </div>
  );
};

export default CompletedTask;

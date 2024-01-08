import { Draggable } from "react-beautiful-dnd";
import "../Styles/Tasks.css";

const CompletedTask = ({ tasks }) => {
  return (
    <div className="individual-task-container">
      {tasks.length > 0 &&
        tasks.map((el, index) => (
          <Draggable key={el.id} draggableId={`${el.id}`} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    color: snapshot.isDragging ? "white" : "#3a2b2fbb",
                    backgroundColor: snapshot.isDragging
                      ? "#383535"
                      : "greenyellow",
                    ...provided.draggableProps.style,
                  }}
                  className="tasks"
                >
                  <p key={el.id}>{el.taskName}</p>
                </div>
              );
            }}
          </Draggable>
        ))}
    </div>
  );
};

export default CompletedTask;

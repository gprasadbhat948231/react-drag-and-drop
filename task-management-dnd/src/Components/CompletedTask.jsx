import { Draggable } from "react-beautiful-dnd";

const CompletedTask = ({ tasks }) => {
  return (
    <div>
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
                    padding: "10px",
                    color: "white",
                    backgroundColor: snapshot.isDragging ? "yellow" : "#6740a4",
                    ...provided.draggableProps.style,
                  }}
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

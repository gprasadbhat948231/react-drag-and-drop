import Header from "./Header";
const Section = ({ status, tasks, setTasks, added, started, completed }) => {
  return (
    <div>
      <Header head={status} />
    </div>
  );
};

export default Section;

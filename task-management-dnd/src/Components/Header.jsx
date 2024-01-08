import "../Styles/Heading.css";

const Header = ({ head, totalTasks }) => {
  return (
    <div className="task-header">
      {head} ({totalTasks})
    </div>
  );
};

export default Header;

const Header = ({ head }) => {
  return (
    <h2
      style={{
        color:
          head === "Added"
            ? "aliceblue"
            : head === "Started"
            ? "orange"
            : "greenyellow",
      }}
    >
      {head}
    </h2>
  );
};

export default Header;

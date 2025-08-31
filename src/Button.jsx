function Button() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <button
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      Click me
    </button>
  );
}

export default Button;

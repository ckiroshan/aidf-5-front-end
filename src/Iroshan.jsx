function User(props) {
  return (
    <>
      <h1 className="text-red-500 text-3xl md:text-6xl">{props.name}</h1>
      <p>{props.age ?? 27}</p>
    </>
  );
}

export default User;

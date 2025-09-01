const getAllHotels = async () => {
  // TODO: Make a GET request to the API
  const res = await fetch("http://localhost:8080/api/hotels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);

  return data;
};

export { getAllHotels };

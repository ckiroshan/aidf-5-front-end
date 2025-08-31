import HotelCard from "./HotelCard";
import { Button } from "./components/ui/button";
import { hotels } from "./data";

function App() {
  return (
    <div className="py-5 border-2 border-black m-5 p-3">
      {hotels.map((hotel, i) => {
        return (
          <HotelCard
            key={hotel._id}
            name={hotel.name}
            location={hotel.location}
            rating={hotel.rating}
            reviews={hotel.reviews}
            price={hotel.price}
          />
        );
      })}
      <Button onClick={() => console.log("Clicked")}>Click Me</Button>
    </div>
  );
}

export default App;

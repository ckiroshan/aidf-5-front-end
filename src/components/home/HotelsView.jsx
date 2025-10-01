import { useSelector } from "react-redux";
import HotelSearchResults from "@/components/home/HotelSearchResults";
import HotelListings from "@/components/home/HotelListings";

export default function HotelsView() {
  const query = useSelector((state) => state.search.query);

  if (query !== "") {
    return <HotelSearchResults />;
  } else {
    return <HotelListings />;
  }
}

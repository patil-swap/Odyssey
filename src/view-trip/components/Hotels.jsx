import TravelTips from "./TravelTips";
import HotelCardItem from "./HotelCardItem";

// eslint-disable-next-line react/prop-types
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl font-serif text-emerald-500 my-5">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
        {/*eslint-disable-next-line react/prop-types*/}
        {trip?.tripData?.plan?.hotels?.map((hotel, index) => (
          // eslint-disable-next-line react/jsx-key
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
      <TravelTips travelTips={trip?.tripData?.plan?.tips} />
    </div>
  );
}

export default Hotels;

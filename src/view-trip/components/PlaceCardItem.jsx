/* eslint-disable react/prop-types */
function PlaceCardItem({ activity_details }) {
  return (
    <div className="text-sm font-serif text-crimson">
      <h2>🕖 {activity_details.opening_hours}</h2>
      <h2>🪙 {activity_details.ticket_price}</h2>
      <h2>{activity_details.travel_distance}</h2>
      <h2>{activity_details.location}</h2>
      <h2>{activity_details.type}</h2>
    </div>
  );
}

export default PlaceCardItem;

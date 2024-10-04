import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.tripData?.location
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div>
        <img
          src={photoUrl}
          alt=""
          className="object-cover rounded-xl h-[220px]"
        />
        <div>
          <h2 className="font-serif font-bold text-lg ">
            {trip?.tripData?.location}
          </h2>
          <h3 className="font-serif text-md">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget for{" "}
            {trip?.userSelection?.traveler}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;

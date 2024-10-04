import React from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";
import { useEffect, useState } from "react";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotel_name
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
    <div>
      <Link
        to={"https://www.google.com/maps/search/?api=1&query=" + hotel?.address}
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer shadow-md rounded-sm">
          <img
            src={photoUrl}
            className="rounded-xl h-[180px] w-full object-cover"
          />
          <div className="my-2 py-2 flex flex-col gap-3 text-wrap">
            <h2 className="px-2 font-medium">{hotel.hotel_name}</h2>
            <h2 className="px-2 text-xs text-gray-500">📍{hotel?.address}</h2>
            <h2 className="px-2 text-sm">💵 {hotel?.price_range}</h2>
            <h2 className="px-2 text-sm">⭐ {hotel?.ratings}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;

import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";
import { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function InfoSec({ trip }) {
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
    <div>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={photoUrl}
      />
      <div className="flex justify-center items-center">
        <div className="my-5 flex flex-col gap-3">
          <h2 className="font-bold font-serif text-emerald-500 text-2xl">
            <span>Location: </span>
            {trip?.tripData?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 xs:text-xs md:text-md">
              Number of Day(s):📅
              {/*eslint-disable-next-line react/prop-types*/}
              {trip?.userSelection?.noOfDays}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 xs:text-xs md:text-md">
              Budget:💰
              {/*eslint-disable-next-line react/prop-types*/}
              {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 xs:text-xs md:text-md">
              Number of Traveler(s):🧍
              {/*eslint-disable-next-line react/prop-types*/}
              {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <div className="flex m-5 justify-end">
          <Button>
            <IoMdShare />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSec;

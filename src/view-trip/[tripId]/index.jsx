import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSec from "../components/InfoSec";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && getTripData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast("No Trip found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 bg-slate-50">
      {/*Information Section*/}
      <InfoSec trip={trip} />
      {/*Recommended Hotels*/}
      <Hotels trip={trip} />
      {/*Itinerary/Daily Plan*/}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
    </div>
  );
}

export default ViewTrip;

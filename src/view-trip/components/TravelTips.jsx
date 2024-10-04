import React from "react";

function TravelTips({ travelTips }) {
  return (
    <div>
      <div className="text-xl font-serif font-bold text-emerald-500 p-2">
        Travel Tips
      </div>
      <div className="m-1 my-2 font-serif p-3 bg-amber-200 rounded-sm">
        <div>
          <span className="underline">Local Customs: </span>
          {travelTips?.local_customs}
        </div>
        <div>
          <span className="underline">Safety Advice: </span>
          {travelTips?.safety_advice}
        </div>
        <div>
          <span className="underline">Additional Tips: </span>
          {travelTips?.travel_tips}
        </div>
      </div>
    </div>
  );
}

export default TravelTips;

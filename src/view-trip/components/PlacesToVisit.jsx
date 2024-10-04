import PlaceCardItem from "./PlaceCardItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// eslint-disable-next-line react/prop-types
function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold font-serif m-3 text-emerald-500 text-xl">
        Places to Visit
      </h2>

      <div>
        {/*eslint-disable-next-line react/prop-types*/}
        {trip?.tripData?.plan?.itinerary.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <div className="flex flex-col gap-2">
            <Accordion type="single" collapsible>
              <AccordionItem value={"item-" + item.day}>
                <AccordionTrigger className="text-dark-purple bg-pink">
                  Day {item.day}
                </AccordionTrigger>
                <AccordionContent>
                  {item.activities.map((activity, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="mx-10 p-5 bg-papaya-whip font-serif">
                      <h2 className="text-lg text-rose-taupe">
                        {activity.activity_name}
                      </h2>
                      <PlaceCardItem
                        activity_details={activity.details}
                        key={index}
                      />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

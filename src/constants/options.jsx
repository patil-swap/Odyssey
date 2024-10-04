export const SelectTravelerList = [
  {
    id: 0,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🧑",
    people: "1 person"
  },
  {
    id: 1,
    title: "A Couple",
    desc: "Two traveler in tandem",
    icon: "🥂",
    people: "2 People"
  },
  {
    id: 2,
    title: "Family",
    desc: "A group of fun loving adventurers",
    icon: "👨‍👩‍👦",
    people: "3 to 5 people"
  },
  {
    id: 3,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "🔥",
    people: "5 to 10 people"
  }
];

export const SelectBudgetOptions = [
  {
    id: 0,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵"
  },
  {
    id: 1,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰"
  },
  {
    id: 2,
    title: "Luxury",
    desc: "Dont worry about costs",
    icon: "💸"
  }
];

export const AI_PROMPT =
  "Objective: Plan a trip to {location} for {traveler} over {totalDays} days with a {budget} budget. The trip plan should include at most 3 hotel recommendations and a day-by-day itinerary of activities tailored to the location type and preferences. The output should be in accurate JSON format.";

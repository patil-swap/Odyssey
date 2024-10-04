import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const schema = {
  description: "Travel Itinerary",
  type: "object",
  properties: {
    location: { type: "string" },
    number_of_days: { type: "integer" },
    budget: { type: "string" },
    people: { type: "string" },
    plan: {
      type: "object",
      properties: {
        hotels: {
          type: "array",
          items: {
            type: "object",
            properties: {
              hotel_name: { type: "string" },
              address: { type: "string" },
              hotel_images: {
                type: "array",
                items: { type: "string" }
              },
              ratings: { type: "string" },
              price_range: { type: "string" },
              description: { type: "string" },
              breakfast_included: { type: "string" },
              other_facilities: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: [
              "hotel_name",
              "address",
              "hotel_images",
              "ratings",
              "price_range",
              "description",
              "breakfast_included",
              "other_facilities"
            ]
          }
        },
        itinerary: {
          type: "array",
          items: {
            type: "object",
            properties: {
              day: { type: "integer" },
              activities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    activity_name: { type: "string" },
                    details: {
                      type: "object",
                      properties: {
                        opening_hours: { type: "string" },
                        ticket_price: { type: "string" },
                        travel_distance: { type: "string" },
                        location: { type: "string" },
                        type: { type: "string" }
                      },
                      required: [
                        "opening_hours",
                        "ticket_price",
                        "travel_distance",
                        "location",
                        "type"
                      ]
                    }
                  },
                  required: ["activity_name", "details"]
                }
              }
            },
            required: ["day", "activities"]
          }
        },
        tips: {
          type: "object",
          properties: {
            travel_tips: { type: "string" },
            safety_advice: { type: "string" },
            local_customs: { type: "string" }
          },
          required: ["travel_tips", "safety_advice", "local_customs"]
        }
      },
      required: ["hotels", "itinerary", "tips"]
    }
  },
  required: ["location", "number_of_days", "budget", "people", "plan"]
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: schema
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Objective: Plan a trip to Las Vegas for 3-5 people over 5 days with a cheap budget. The trip plan should include at most 3 hotel recommendations and a day-by-day itinerary of activities tailored to the location type and preferences. The output should be in accurate JSON format.\n\nOutput Format (JSON):\n\n{\n  "location": "{location}",\n  "number_of_days": {total_days},\n  "budget": "{budget}",\n  "people": "{number_of_people}",\n  "plan": {\n    "hotels": [\n      {\n        "hotel_name": "{Hotel Name}",\n        "address": "{Address}",\n        "hotel_images": ["{Image URL 1}", "{Image URL 2}"],\n        "ratings": {Ratings},\n        "price_range": "{Price Range}",\n        "description": "{Description}",\n        "breakfast_included": "{Yes/No}",\n        "other_facilities": ["Wi-Fi", "Pool", "Gym", "Spa", "Restaurant"]\n      }\n    ],\n    "itinerary": [\n      {\n        "day": {Day Number},\n        "activities": [\n          {\n            "activity_name": "{Activity Name}",\n            "location": "{Activity Location}",\n            "type": "{Relaxation/Adventure/Cultural}"\n            "details": {\n              "opening_hours": "{Opening Hours}",\n              "ticket_price": "{Ticket Price}",\n              "travel_distance": "{Distance from Nearest Airport}"\n            },\n          }\n        ]\n      }\n    ],\n    "tips": {\n      "travel_tips": "{Travel Tips}",\n      "safety_advice": "{Safety Advice}",\n      "local_customs": "{Local Customs}"\n    }\n  }\n}'
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "location": "Las Vegas",\n  "number_of_days": 5,\n  "budget": "Cheap",\n  "people": 3,\n  "plan": {\n    "hotels": [\n      {\n        "hotel_name": "The D Las Vegas",\n        "address": "301 Fremont Street, Las Vegas, NV 89101",\n        "hotel_images": ["https://www.theD.com/wp-content/uploads/2020/08/D-Hotel-Exterior-3.jpg", "https://www.theD.com/wp-content/uploads/2020/08/D-Hotel-Lobby.jpg"],\n        "ratings": 4.0,\n        "price_range": "$50-$100 per night",\n        "description": "A budget-friendly hotel located in the heart of downtown Las Vegas, offering a vibrant atmosphere and easy access to Fremont Street Experience.",\n        "breakfast_included": "No",\n        "other_facilities": ["Wi-Fi", "Pool", "Restaurant", "Bar"]\n      },\n      {\n        "hotel_name": "The Golden Nugget",\n        "address": "129 E Fremont St, Las Vegas, NV 89101",\n        "hotel_images": ["https://www.goldennugget.com/wp-content/uploads/2021/03/GN-Exterior-Daytime-700x467.jpg", "https://www.goldennugget.com/wp-content/uploads/2021/04/GN-Lobby-700x467.jpg"],\n        "ratings": 4.5,\n        "price_range": "$100-$150 per night",\n        "description": "A historic hotel with a modern twist, known for its iconic shark tank and diverse dining options.",\n        "breakfast_included": "No",\n        "other_facilities": ["Wi-Fi", "Pool", "Gym", "Spa", "Multiple Restaurants", "Casino"]\n      },\n      {\n        "hotel_name": "Circus Circus Hotel & Casino",\n        "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n        "hotel_images": ["https://www.circuscircus.com/wp-content/uploads/2021/05/CircusCircus_Exterior-700x467.jpg", "https://www.circuscircus.com/wp-content/uploads/2021/05/CircusCircus_Lobby-700x467.jpg"],\n        "ratings": 3.5,\n        "price_range": "$75-$125 per night",\n        "description": "A family-friendly hotel with a circus theme, offering affordable accommodations and exciting attractions.",\n        "breakfast_included": "No",\n        "other_facilities": ["Wi-Fi", "Pool", "Arcade", "Circus Acts", "Restaurants"]\n      }\n    ],\n    "itinerary": [\n      {\n        "day": 1,\n        "activities": [\n          {\n            "activity_name": "Fremont Street Experience",\n            "location": "Downtown Las Vegas",\n            "type": "Entertainment",\n            "details": {\n              "opening_hours": "24/7",\n              "ticket_price": "Free",\n              "travel_distance": "5 minutes from The D Las Vegas"\n            }\n          },\n          {\n            "activity_name": "Dinner at a local buffet",\n            "location": "Various locations in Downtown Las Vegas",\n            "type": "Food",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "$20-$30 per person",\n              "travel_distance": "Walking distance from Fremont Street Experience"\n            }\n          }\n        ]\n      },\n      {\n        "day": 2,\n        "activities": [\n          {\n            "activity_name": "Free walking tour of the Strip",\n            "location": "Las Vegas Strip",\n            "type": "Cultural",\n            "details": {\n              "opening_hours": "Various times, check online",\n              "ticket_price": "Free",\n              "travel_distance": "15 minutes from The D Las Vegas via bus or taxi"\n            }\n          },\n          {\n            "activity_name": "Free show at the Bellagio Fountains",\n            "location": "Bellagio Hotel & Casino",\n            "type": "Entertainment",\n            "details": {\n              "opening_hours": "Every 15 minutes from 3:00 PM to 8:00 PM",\n              "ticket_price": "Free",\n              "travel_distance": "Walking distance from the Strip"\n            }\n          },\n          {\n            "activity_name": "Dinner at a cheap restaurant on the Strip",\n            "location": "Various locations on the Strip",\n            "type": "Food",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "$15-$25 per person",\n              "travel_distance": "Walking distance from Bellagio"\n            }\n          }\n        ]\n      },\n      {\n        "day": 3,\n        "activities": [\n          {\n            "activity_name": "Hiking at Red Rock Canyon National Conservation Area",\n            "location": "1000 Scenic Loop Dr, Las Vegas, NV 89124",\n            "type": "Adventure",\n            "details": {\n              "opening_hours": "7:00 AM to 7:00 PM",\n              "ticket_price": "$15 per vehicle",\n              "travel_distance": "30 minutes from The Strip"\n            }\n          },\n          {\n            "activity_name": "Picnic lunch at Red Rock Canyon",\n            "location": "Red Rock Canyon National Conservation Area",\n            "type": "Relaxation",\n            "details": {\n              "opening_hours": "N/A",\n              "ticket_price": "N/A",\n              "travel_distance": "N/A"\n            }\n          }\n        ]\n      },\n      {\n        "day": 4,\n        "activities": [\n          {\n            "activity_name": "Visit the Neon Museum",\n            "location": "770 N Las Vegas Blvd, Las Vegas, NV 89101",\n            "type": "Cultural",\n            "details": {\n              "opening_hours": "10:00 AM to 10:00 PM",\n              "ticket_price": "$25 per person",\n              "travel_distance": "10 minutes from The D Las Vegas via bus"\n            }\n          },\n          {\n            "activity_name": "Explore the Arts District",\n            "location": "Downtown Las Vegas",\n            "type": "Cultural",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "Free",\n              "travel_distance": "Walking distance from the Neon Museum"\n            }\n          },\n          {\n            "activity_name": "Dinner at a local restaurant in the Arts District",\n            "location": "Downtown Las Vegas",\n            "type": "Food",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "$15-$25 per person",\n              "travel_distance": "N/A"\n            }\n          }\n        ]\n      },\n      {\n        "day": 5,\n        "activities": [\n          {\n            "activity_name": "Morning poolside relaxation at the hotel",\n            "location": "Your chosen hotel",\n            "type": "Relaxation",\n            "details": {\n              "opening_hours": "N/A",\n              "ticket_price": "N/A",\n              "travel_distance": "N/A"\n            }\n          },\n          {\n            "activity_name": "Shopping at the outlets",\n            "location": "Various locations in Las Vegas",\n            "type": "Shopping",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "Free",\n              "travel_distance": "15 minutes from The Strip via bus"\n            }\n          },\n          {\n            "activity_name": "Dinner at a cheap restaurant near the airport",\n            "location": "Near McCarran International Airport",\n            "type": "Food",\n            "details": {\n              "opening_hours": "Varying",\n              "ticket_price": "$15-$25 per person",\n              "travel_distance": "N/A"\n            }\n          }\n        ]\n      }\n    ],\n    "tips": {\n      "travel_tips": "Use public transportation or ride-sharing services to save on transportation costs.",\n      "safety_advice": "Be aware of your surroundings, especially at night, and avoid walking alone in isolated areas.",\n      "local_customs": "Tipping is customary in Las Vegas, especially for service staff."\n    }\n  }\n}\n```'
        }
      ]
    }
  ]
});

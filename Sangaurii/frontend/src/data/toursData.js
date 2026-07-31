const common = {
  overview: "A thoughtfully paced holiday combining signature sights, comfortable stays and memorable local experiences. The itinerary leaves enough room to enjoy each destination without feeling rushed.",
  inclusions: ["Accommodation in selected hotels", "Daily breakfast and dinner", "All sightseeing and transfers as planned", "Experienced local driver", "Applicable hotel taxes"],
  exclusions: ["Airfare or train fare", "Lunch and personal expenses", "Entry tickets unless specified", "Travel insurance", "Anything not listed under inclusions"],
  hotels: [
    { city: "Primary destination", hotel: "Comfort category hotel", nights: 3 },
    { city: "Secondary destination", hotel: "Premium category hotel", nights: 2 },
  ],
  transport: "Private air-conditioned vehicle for transfers and sightseeing. Vehicle type is based on group size.",
  departures: ["15 August 2026", "05 September 2026", "24 October 2026", "14 November 2026"],
  notes: ["Valid government photo ID is required.", "Hotel availability is subject to confirmation.", "The itinerary may change due to weather or local conditions.", "Standard hotel check-in and check-out times apply."],
};

const buildItinerary = (places, days) =>
  Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    title: index === 0 ? `Arrival in ${places[0]}` : index === days - 1 ? "Departure with happy memories" : `Explore ${places[index % places.length]}`,
    description: index === 0
      ? "Meet our representative, transfer to your hotel and settle in. Enjoy a relaxed evening."
      : index === days - 1
        ? "After breakfast, check out and transfer to the airport or railway station for your onward journey."
        : "After breakfast, enjoy the key sights and local experiences planned for the day, with comfortable breaks along the way.",
  }));

const tour = (details) => ({
  ...common,
  featured: false,
  popularity: 70,
  category: "Family",
  ...details,
  nights: details.days - 1,
  duration: `${details.days} Days / ${details.days - 1} Nights`,
  itinerary: buildItinerary(details.places, details.days),
  highlights: details.highlights || [`Guided sightseeing in ${details.places.join(", ")}`, "Comfortable handpicked stays", "Local cultural experiences", "Time for leisure and shopping"],
  gallery: [details.image, ...(details.gallery || [
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  ])],
});

export const tours = [
  tour({ slug: "kashmir-paradise-trail", title: "Kashmir Paradise Trail", destination: "Kashmir", location: "Srinagar · Gulmarg · Pahalgam", places: ["Srinagar", "Gulmarg", "Pahalgam"], days: 7, price: 42500, category: "Family", type: "Domestic", featured: true, popularity: 98, image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1614591276564-7b3e69347a48?auto=format&fit=crop&w=1000&q=85"] }),
  tour({ slug: "royal-rajasthan", title: "Royal Rajasthan", destination: "Rajasthan", location: "Jaipur · Jodhpur · Udaipur", places: ["Jaipur", "Jodhpur", "Udaipur"], days: 8, price: 38900, category: "Heritage", type: "Domestic", featured: true, popularity: 94, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85"] }),
  tour({ slug: "kerala-backwaters", title: "Kerala Backwaters & Hills", destination: "Kerala", location: "Munnar · Thekkady · Alleppey", places: ["Munnar", "Thekkady", "Alleppey"], days: 6, price: 35750, category: "Honeymoon", type: "Domestic", featured: true, popularity: 92, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "konkan-coastal-escape", title: "Konkan Coastal Escape", destination: "Maharashtra", location: "Ganpatipule · Ratnagiri · Tarkarli", places: ["Ganpatipule", "Ratnagiri", "Tarkarli"], days: 5, price: 24900, category: "Weekend", type: "Domestic", featured: true, popularity: 88, image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "ashtavinayak-yatra", title: "Ashtavinayak Yatra", destination: "Maharashtra", location: "Eight sacred Ganpati temples", places: ["Morgaon", "Siddhatek", "Pali", "Mahad"], days: 3, price: 12500, category: "Spiritual", type: "Special", popularity: 86, image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "himachal-family-retreat", title: "Himachal Family Retreat", destination: "Himachal", location: "Shimla · Manali · Solang", places: ["Shimla", "Manali", "Solang Valley"], days: 7, price: 36500, category: "Family", type: "Domestic", popularity: 91, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "goa-sun-and-sand", title: "Goa Sun & Sand", destination: "Goa", location: "North Goa · South Goa", places: ["North Goa", "Panaji", "South Goa"], days: 4, price: 21900, category: "Weekend", type: "Domestic", popularity: 84, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "dubai-city-lights", title: "Dubai City Lights", destination: "Dubai", location: "Dubai · Abu Dhabi", places: ["Dubai", "Abu Dhabi"], days: 6, price: 78900, category: "Family", type: "International", featured: true, popularity: 96, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "singapore-malaysia-delight", title: "Singapore & Malaysia Delight", destination: "Singapore", location: "Singapore · Kuala Lumpur", places: ["Singapore", "Kuala Lumpur"], days: 7, price: 92500, category: "Group", type: "International", popularity: 90, image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "bali-island-escape", title: "Bali Island Escape", destination: "Bali", location: "Ubud · Kuta · Nusa Dua", places: ["Ubud", "Kuta", "Nusa Dua"], days: 6, price: 69500, category: "Honeymoon", type: "International", popularity: 89, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "european-highlights", title: "European Highlights", destination: "Europe", location: "Paris · Switzerland · Rome", places: ["Paris", "Lucerne", "Rome"], days: 11, price: 189000, category: "Group", type: "International", featured: true, popularity: 93, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85" }),
  tour({ slug: "chardham-sacred-journey", title: "Chardham Sacred Journey", destination: "Uttarakhand", location: "Yamunotri · Gangotri · Kedarnath · Badrinath", places: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"], days: 12, price: 72500, category: "Spiritual", type: "Special", featured: true, popularity: 95, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85" }),
];

export const vehicles = [
  { id: 1, name: "Premium Sedan", capacity: "4 passengers", ac: "AC", usage: ["Local", "Outstation", "Airport"], image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "SUV / MUV", capacity: "6–7 passengers", ac: "AC", usage: ["Local", "Outstation", "Tours"], image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Tempo Traveller", capacity: "12–17 passengers", ac: "AC / Non-AC", usage: ["Outstation", "Group Tours"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Luxury Coach", capacity: "32–45 passengers", ac: "AC / Non-AC", usage: ["Tours", "Events", "Outstation"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=85" },
];

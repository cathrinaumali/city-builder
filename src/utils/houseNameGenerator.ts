const adjectives = [
  "Cozy", "Grand", "Sunny", "Peaceful", "Serene", "Majestic", "Quaint", "Elegant",
  "Rustic", "Modern", "Classic", "Charming", "Welcoming", "Spacious", "Tranquil"
];

const nouns = [
  "Cottage", "Manor", "Residence", "Dwelling", "Abode", "Estate", "Villa", "Bungalow",
  "Lodge", "Mansion", "Palace", "Castle", "Haven", "Retreat", "Sanctuary"
];

const locations = [
  "Hill", "Valley", "Garden", "Park", "Woods", "Lake", "River", "Meadow",
  "Grove", "Field", "Court", "Place", "View", "Heights", "Ridge"
];

export const generateHouseName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  
  // Randomly choose between different name patterns
  const patterns = [
    `${adjective} ${noun}`,
    `${adjective} ${noun} on the ${location}`,
    `${location} ${noun}`,
    `${adjective} ${location} ${noun}`
  ];
  
  return patterns[Math.floor(Math.random() * patterns.length)];
}; 
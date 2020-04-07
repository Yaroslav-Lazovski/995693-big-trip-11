const typesOfEvent = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const getRandomType = () => {
  const type = typesOfEvent[Math.floor(Math.random() * typesOfEvent.length)];
  return type;
};

const randomType = getRandomType();


export {randomType};

const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const getRandomType = () => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  return city;
};

const randomCity = getRandomType();


export {randomCity};

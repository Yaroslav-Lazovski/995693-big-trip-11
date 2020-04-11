const typesOfEvent = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const cities = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
const offers = [
  {
    title: `add luggage`,
    cost: `30`,
  },
  {
    title: `switch to comfort`,
    cost: `100`,
  },
  {
    title: `add meal`,
    cost: `15`,
  },
  {
    title: `travel by train`,
    cost: `40`,
  },
  {
    title: `choose seats`,
    cost: `30`,
  }
];

const destinationDescription = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus`
;

const stringsArr = destinationDescription.split(`.`);

const shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


const photos = [`http://picsum.photos/248/152?r=${Math.random()}`];

const generateEvent = () => {
  return {
    type: typesOfEvent[Math.floor(Math.random() * typesOfEvent.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    price: Math.floor(Math.random() * 100),
    offer: shuffleArr(offers.slice(0, Math.floor(Math.random() * offers.length + 1))),
    description: shuffleArr(stringsArr.slice(0, Math.floor(Math.random() * 5 + 1))),
    photo: photos,
    startDate: new Date().getTime() + Math.floor(Math.random() * 300000000)
    // endDate: //duration
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};


export {generateEvents};

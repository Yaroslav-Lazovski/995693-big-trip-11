import TripController from "./controllers/trip.js";
import TripCostComponent from "./components/trip-cost.js";
import TripTabsComponent from "./components/trip-tabs.js";
import FilterController from "./controllers/filter.js";
import PointsModel from "./models/points.js";

import {generateEvents} from "./mock/events.js";
import {generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition} from "./utils/render.js";


const EVENT_COUNT = 2;


const events = generateEvents(EVENT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setEvents(events);


const tabs = generateTabs();

const countTripPrice = () => {
  const tripPrices = [];
  const offerPrices = [];

  events.forEach((item) => {
    tripPrices.push(item.price);
  });

  events.forEach((item) => {
    item.offers.forEach((element) => {
      offerPrices.push(+element.cost);
    });
  });

  return [...tripPrices, ...offerPrices].reduce((sum, current) => {
    return sum + current;
  }, 0);
};


const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);

const tripTabsComponent = new TripTabsComponent(tabs);
render(controlsElement[0], tripTabsComponent, RenderPosition.AFTEREND);

const filterController = new FilterController(controlsElement[1], pointsModel);
filterController.render();

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement, pointsModel);
tripController.render(events);

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripCostComponent(countTripPrice()), RenderPosition.BEFOREEND);


const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

newEventButton.addEventListener(`click`, () => {
  tripController.createEvent();
  filterController.render();
  newEventButton.disabled = true;
});

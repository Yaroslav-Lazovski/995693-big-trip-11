import TripController from "./controllers/trip.js";
import TripCostComponent from "./components/trip-cost.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";
import PointsModel from "./models/points.js";

import {generateEvents} from "./mock/events.js";
import {generateFilters, generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition} from "./utils/render.js";


const EVENT_COUNT = 20;


const events = generateEvents(EVENT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setEvents(events);


const filters = generateFilters();
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
render(controlsElement[0], new TripTabsComponent(tabs), RenderPosition.AFTEREND);
render(controlsElement[1], new TripFiltersComponent(filters), RenderPosition.AFTEREND);
const tripEventsElement = document.querySelector(`.trip-events`);


const tripController = new TripController(tripEventsElement, pointsModel);
tripController.render(events);

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripCostComponent(countTripPrice()), RenderPosition.BEFOREEND);

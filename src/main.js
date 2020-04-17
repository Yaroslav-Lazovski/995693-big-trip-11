import TripController from "./controllers/trip.js";
import TripInfoComponent from "./components/trip-info.js";
import TripCostComponent from "./components/trip-cost.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";

import {generateEvents} from "./mock/events.js";
import {generateFilters, generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition} from "./utils/render.js";


const EVENT_COUNT = 20;


const events = generateEvents(EVENT_COUNT);
const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))].sort((a, b) => {
  return new Date(a).getDate() - new Date(b).getDate();
});

const tripInfoData = {
  startDate: new Date(dates[0]).getDate(),
  endDate: new Date(dates[dates.length - 1]).getDate(),
  startCity: events[0].city,
  middleCity: events[events.length / 2 - 1].city,
  endCity: events[events.length - 1].city,
  month: new Date(dates[0]).toLocaleString(`default`, {month: `long`})
};

const filters = generateFilters();
const tabs = generateTabs();

const countTripPrice = () => {
  const tripPrices = [];
  const offerPrices = [];

  events.forEach((item) => {
    tripPrices.push(item.price);
  });

  events.forEach((item) => {
    item.offer.forEach((element) => {
      offerPrices.push(+element.cost);
    });
  });

  return [...tripPrices, ...offerPrices].reduce((sum, current) => {
    return sum + current;
  }, 0);
};

const infoElement = document.querySelector(`.trip-main`);
const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);


render(infoElement, new TripInfoComponent(tripInfoData), RenderPosition.AFTERBEGIN);
render(controlsElement[0], new TripTabsComponent(tabs), RenderPosition.AFTEREND);
render(controlsElement[1], new TripFiltersComponent(filters), RenderPosition.AFTEREND);

const tripInfo = document.querySelector(`.trip-info`);

render(tripInfo, new TripCostComponent(countTripPrice()), RenderPosition.BEFOREEND);


const tripController = new TripController();
tripController.render(events, dates);

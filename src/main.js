import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripTabsTemplate} from "./components/trip-tabs.js";
import {createTripFiltersTemplate} from "./components/trip-filters.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createFormEventsTemplate} from "./components/form-events.js";
import {createDayListTemplate} from "./components/day-list.js";
import {createDayInfoTemplate} from "./components/day-info.js";
import {generateEvents} from "./mock/events.js";
import {generateFilters, generateTabs} from "./mock/filters-tabs.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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


const filters = generateFilters();
const tabs = generateTabs();


const infoElement = document.querySelector(`.trip-main`);
const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);
const eventsElement = document.querySelector(`.trip-events`);
const eventsHeader = eventsElement.querySelector(`h2`);


render(infoElement, createTripInfoTemplate(tripInfoData), `afterbegin`);
render(controlsElement[0], createTripTabsTemplate(tabs), `afterend`);
render(controlsElement[1], createTripFiltersTemplate(filters), `afterend`);
render(eventsHeader, createTripSortTemplate(), `afterend`);
render(eventsElement, createFormEventsTemplate(events[0]), `beforeend`);

const tripInfo = document.querySelector(`.trip-info`);

render(tripInfo, createTripCostTemplate(countTripPrice()), `beforeend`);
render(eventsElement, createDayListTemplate(), `beforeend`);

const dayList = eventsElement.querySelector(`.trip-days`);


dates.forEach((item, index) => {
  render(dayList, createDayInfoTemplate(index, item, events.filter((event) => {
    return item === new Date(event.startDate).toDateString();
  })), `beforeend`);
});

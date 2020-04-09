import {createTripInfoTemplate} from "./components/trip-info.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createTripTabsTemplate} from "./components/trip-tabs.js";
import {createTripFiltersTemplate} from "./components/trip-filters.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createFormEventsTemplate} from "./components/form-events.js";
import {createDayListTemplate} from "./components/day-list.js";
import {createDayInfoTemplate} from "./components/day-info.js";
import {createEventsList} from "./components/events-list.js";
import {createEventTemplate} from "./components/event.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const infoElement = document.querySelector(`.trip-main`);
const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);
const eventsElement = document.querySelector(`.trip-events`);
const eventsHeader = eventsElement.querySelector(`h2`);


render(infoElement, createTripInfoTemplate(), `afterbegin`);
render(controlsElement[0], createTripTabsTemplate(), `afterend`);
render(controlsElement[1], createTripFiltersTemplate(), `afterend`);
render(eventsHeader, createTripSortTemplate(), `afterend`);
render(eventsElement, createFormEventsTemplate(), `beforeend`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createTripCostTemplate(), `beforeend`);


render(eventsElement, createDayListTemplate(), `beforeend`);

const dayList = eventsElement.querySelector(`.trip-days`);

render(dayList, createDayInfoTemplate(), `beforeend`);

const dayOfEvent = dayList.querySelector(`.trip-days__item`);

render(dayOfEvent, createEventsList(), `beforeend`);

const eventsList = eventsElement.querySelector(`.trip-events__list`);


for (let i = 0; i < 3; i++) {
  render(eventsList, createEventTemplate(), `beforeend`);
}

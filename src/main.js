import {createInfoTemplate} from "./components/info.js";
import {createTabsTemplate} from "./components/tabs.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createFormEventsTemplate} from "./components/form-events.js";
import {createTripSortTemplate} from "./components/trip-sort.js";
import {createEventTemplate} from "./components/event.js";


const infoElement = document.querySelector(`.trip-main`);
const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);
const eventsElement = document.querySelector(`.trip-events`);
const eventsHeader = eventsElement.querySelector(`h2`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(infoElement, createInfoTemplate(), `afterbegin`);
render(controlsElement[0], createTabsTemplate(), `afterend`);
render(controlsElement[1], createFiltersTemplate(), `afterend`);
render(eventsElement, createFormEventsTemplate(), `beforeend`);
render(eventsHeader, createTripSortTemplate(), `afterend`);

for (let i = 0; i < 3; i++) {
  render(eventsElement, createEventTemplate(), `beforeend`);
}

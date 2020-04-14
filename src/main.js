import TripInfoComponent from "./components/trip-info.js";
import TripCostComponent from "./components/trip-cost.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";
// import TripEventsComponent from "./components/trip-events.js";
import TripSortComponent from "./components/trip-sort.js";
import FormEventsComponent from "./components/form-events.js";
import EventComponent from "./components/event.js";
import DayListComponent from "./components/day-list.js";
import DayInfoComponent from "./components/day-info.js";
import {generateEvents} from "./mock/events.js";
import {generateFilters, generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition} from "./utils";


const EVENT_COUNT = 20;

const renderEvent = (eventListElement, event) => {
  const onEditButtonClick = () => {
    eventListElement.replaceChild(formEventsComponent.getElement(), eventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    eventListElement.replaceChild(eventComponent.getElement(), formEventsComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const rollupButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, onEditButtonClick);

  const formEventsComponent = new FormEventsComponent(event);

  // const editForm = formEventsComponent.getElement().querySelector(`form`);
  // editForm.addEventListener(`submit`, onEditFormSubmit);

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


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

const countedTripPrice = countTripPrice();


const filters = generateFilters();
const tabs = generateTabs();


const infoElement = document.querySelector(`.trip-main`);
const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);


render(infoElement, new TripInfoComponent(tripInfoData).getElement(), RenderPosition.AFTERBEGIN);
render(controlsElement[0], new TripTabsComponent(tabs).getElement(), RenderPosition.AFTEREND);
render(controlsElement[1], new TripFiltersComponent(filters).getElement(), RenderPosition.AFTEREND);
render(tripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new FormEventsComponent(events[0]).getElement(), RenderPosition.BEFOREEND);

const tripInfo = document.querySelector(`.trip-info`);

render(tripInfo, new TripCostComponent(countedTripPrice).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new DayListComponent().getElement(), RenderPosition.BEFOREEND);

const dayList = tripEventsElement.querySelector(`.trip-days`);

// dates.forEach((item, index) => {
//   render(dayList, new DayInfoComponent(index, item, events.filter((event) => {
//     return item === new Date(event.startDate).toDateString();
//   })), RenderPosition.BEFOREEND);
// });

events.slice(0, EVENT_COUNT)
  .forEach((event) => {
    renderEvent(dayList, event);
  });

/* ============================================== */

// const infoElement = document.querySelector(`.trip-main`);
// const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);
// const eventsElement = document.querySelector(`.trip-events`);
// const eventsHeader = eventsElement.querySelector(`h2`);


// render(infoElement, createTripInfoTemplate(tripInfoData), `afterbegin`); +++
// render(controlsElement[0], createTripTabsTemplate(tabs), `afterend`);+++
// render(controlsElement[1], createTripFiltersTemplate(filters), `afterend`);
// render(eventsHeader, createTripSortTemplate(), `afterend`);
// render(eventsElement, createFormEventsTemplate(events[0]), `beforeend`);

// const tripInfo = document.querySelector(`.trip-info`);

// render(tripInfo, createTripCostTemplate(countTripPrice()), `beforeend`);
// render(eventsElement, createDayListTemplate(), `beforeend`);

// const dayList = eventsElement.querySelector(`.trip-days`);


// dates.forEach((item, index) => {
//   render(dayList, createDayInfoTemplate(index, item, events.filter((event) => {
//     return item === new Date(event.startDate).toDateString();
//   })), `beforeend`);
// });

import TripInfoComponent from "./components/trip-info.js";
import TripCostComponent from "./components/trip-cost.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripFiltersComponent from "./components/trip-filters.js";
import TripSortComponent from "./components/trip-sort.js";
import AddNewEventComponent from "./components/add-new-event.js";
import EventComponent from "./components/event.js";
import EditEventComponent from "./components/edit-event.js";
import DayListComponent from "./components/day-list.js";
import DayInfoComponent from "./components/day-info.js";
import NoEventsComponent from "./components/no-events.js";
import {generateEvents} from "./mock/events.js";
import {generateFilters, generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition, replace, remove} from "./utils/render.js";


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
const tripEventsElement = document.querySelector(`.trip-events`);


render(infoElement, new TripInfoComponent(tripInfoData), RenderPosition.AFTERBEGIN);
render(controlsElement[0], new TripTabsComponent(tabs), RenderPosition.AFTEREND);
render(controlsElement[1], new TripFiltersComponent(filters), RenderPosition.AFTEREND);
render(tripEventsElement, new TripSortComponent(), RenderPosition.BEFOREEND);
render(tripEventsElement, new AddNewEventComponent(events[0]), RenderPosition.BEFOREEND);

const tripInfo = document.querySelector(`.trip-info`);

render(tripInfo, new TripCostComponent(countTripPrice()), RenderPosition.BEFOREEND);
render(tripEventsElement, new DayListComponent(), RenderPosition.BEFOREEND);

const dayList = tripEventsElement.querySelector(`.trip-days`);
const tripSortComponent = new TripSortComponent();
const addNewEventComponent = new AddNewEventComponent();

if (events.length === 0) {
  remove(tripSortComponent);
  remove(addNewEventComponent);
  render(dayList, new NoEventsComponent(), RenderPosition.BEFOREEND);
}

dates.forEach((item, index) => {
  const tripDay = new DayInfoComponent(index, item);
  const tripDayElement = tripDay.getElement();

  events.filter((event) => {
    return item === new Date(event.startDate).toDateString();
  }).forEach((element) => {
    const eventListElement = tripDayElement.querySelector(`.trip-events__list`);

    const replaceEventToEdit = () => {
      replace(editEventComponent, eventComponent);
    };

    const replaceEditToEvent = () => {
      replace(eventComponent, editEventComponent);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const eventComponent = new EventComponent(element);

    eventComponent.setEditButtonClickHandler(() => {
      replaceEventToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });


    const editEventComponent = new EditEventComponent(element);

    editEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
  });

  render(dayList, tripDay, RenderPosition.BEFOREEND);
});

import TripSortComponent, {SortType} from "../components/trip-sort.js";
import NewEventComponent from "../components/new-event.js";
import DayListComponent from "../components/day-list.js";
import DayInfoComponent from "../components/day-info.js";
import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";
import PointController from "./point.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const SHOWING_EVENTS_COUNT = 20;

const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => b.time - a.time);
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice(from, to);
};


const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);

    pointController.render(event);
    return pointController;
  });
};


const renderTripDay = (container, events, date, index, onDataChange, onViewChange) => {
  const tripDay = new DayInfoComponent(index + 1, date);
  const tripDayElement = tripDay.getElement();
  const eventListElement = tripDayElement.querySelector(`.trip-events__list`);

  const pointController = renderEvents(eventListElement, events, onDataChange, onViewChange);

  render(container, tripDay, RenderPosition.BEFOREEND);

  return pointController;
};

const renderEventsList = (container, events, dates, onDataChange, onViewChange) => {
  let points = [];

  dates.forEach((item, index) => {
    const dayEvents = events.filter((event) => {
      return item === new Date(event.startDate).toDateString();
    });

    points = points.concat(renderTripDay(container, dayEvents, item, index, onDataChange, onViewChange));
  });

  return points;
};

export default class TripController {
  constructor() {
    this._events = [];
    this._showedPointControllers = [];
    this._showingEventsCount = SHOWING_EVENTS_COUNT;
    this._tripSortComponent = new TripSortComponent();
    this._NewEventComponent = new NewEventComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._dayListComponent = new DayListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;

    this._dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))].sort((a, b) => {
      return new Date(a).getDate() - new Date(b).getDate();
    });

    const tripInfo = {
      startDate: new Date(this._dates[0]).getDate(),
      endDate: new Date(this._dates[this._dates.length - 1]).getDate(),
      startCity: events[0].city,
      middleCity: events[events.length / 2 - 1].city,
      endCity: events[events.length - 1].city,
      month: new Date(this._dates[0]).toLocaleString(`default`, {
        month: `long`
      })
    };

    const tripMainElement = document.querySelector(`.trip-main`);
    render(tripMainElement, new TripInfoComponent(tripInfo), RenderPosition.AFTERBEGIN);

    const tripEventsElement = document.querySelector(`.trip-events`);
    render(tripEventsElement, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayList = tripEventsElement.querySelector(`.trip-days`);


    if (this._events.length === 0) {
      remove(this._tripSortComponent);
      remove(this._addNewEventComponent);
      render(dayList, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
    }

    const newPoints = renderEventsList(dayList, events, this._dates, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingEventsCount = SHOWING_EVENTS_COUNT;
    const tripEventsElement = document.querySelector(`.trip-events`);
    const dayList = tripEventsElement.querySelector(`.trip-days`);

    const sortedEvents = getSortedEvents(this._events, sortType, 0, this._showingEventsCount);

    dayList.innerHTML = ``;

    if (sortType === SortType.EVENT) {
      const newPoints = renderEventsList(dayList, this._events, this._dates, this._onDataChange, this._onViewChange);
      this._showedPointControllers = newPoints;
    } else {
      const newPoints = renderTripDay(dayList, sortedEvents);
      this._showedPointControllers = newPoints;
    }
  }
}

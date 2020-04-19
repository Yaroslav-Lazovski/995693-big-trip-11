import TripSortComponent, {SortType} from "../components/trip-sort.js";
import NewEventComponent from "../components/new-event.js";
import EventComponent from "../components/event.js";
import EditEventComponent from "../components/edit-event.js";
import DayListComponent from "../components/day-list.js";
import DayInfoComponent from "../components/day-info.js";
import NoEventsComponent from "../components/no-events.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import TripInfoComponent from "../components/trip-info.js";

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

const renderTripDay = (container, events, date, index) => {
  const tripDay = new DayInfoComponent(index + 1, date);
  const tripDayElement = tripDay.getElement();

  events.forEach((element) => {
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

  render(container, tripDay, RenderPosition.BEFOREEND);
};

const renderEventsList = (container, events, eventsDates) => {
  eventsDates.forEach((item, index) => {
    const dayEvents = events.filter((event) => {
      return item === new Date(event.startDate).toDateString();
    });

    renderTripDay(container, dayEvents, item, index);
  });
};

export default class TripController {
  constructor() {
    this._tripSortComponent = new TripSortComponent();
    this._addNewEventComponent = new NewEventComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(events) {
    const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))].sort((a, b) => {
      return new Date(a).getDate() - new Date(b).getDate();
    });

    const tripInfo = {
      startDate: new Date(dates[0]).getDate(),
      endDate: new Date(dates[dates.length - 1]).getDate(),
      startCity: events[0].city,
      middleCity: events[events.length / 2 - 1].city,
      endCity: events[events.length - 1].city,
      month: new Date(dates[0]).toLocaleString(`default`, {
        month: `long`
      })
    };

    const tripMainElement = document.querySelector(`.trip-main`);
    render(tripMainElement, new TripInfoComponent(tripInfo), RenderPosition.AFTERBEGIN);

    const tripEventsElement = document.querySelector(`.trip-events`);
    render(tripEventsElement, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayList = tripEventsElement.querySelector(`.trip-days`);


    if (events.length === 0) {
      remove(this._tripSortComponent);
      remove(this._addNewEventComponent);
      render(dayList, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
    }

    renderEventsList(dayList, events, dates);


    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      const showingEventsCount = SHOWING_EVENTS_COUNT;

      const sortedEvents = getSortedEvents(events, sortType, 0, showingEventsCount);

      dayList.innerHTML = ``;

      if (sortType === SortType.EVENT) {
        renderEventsList(dayList, events, dates);
      } else {
        renderTripDay(dayList, sortedEvents);
      }

    });
  }
}

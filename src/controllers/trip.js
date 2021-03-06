import TripSortComponent from "../components/trip-sort.js";
import TripCostComponent from "../components/trip-cost.js";
import NewEventComponent from "../components/new-event.js";
import DayListComponent from "../components/day-list.js";
import DayInfoComponent from "../components/day-info.js";
import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point.js";
import {SortType, FilterType} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const HIDDEN_CLASS = `visually-hidden`;


const countTripPrice = (events) => {
  const tripPrices = [];
  const offerPrices = [];

  events.forEach((item) => {
    tripPrices.push(+item.price);
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


const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => b.endDate - b.startDate - (a.endDate - a.startDate));
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice();
};

const generateDays = (events) => {
  return [...new Set(events.map((item) => new Date(item.startDate).toDateString()))].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
};


const renderEvents = (container, events, onDataChange, onViewChange, onFavoriteClick) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange, onFavoriteClick);

    pointController.render(event, PointControllerMode.DEFAULT);
    return pointController;
  });
};


const renderTripDay = (container, events, onDataChange, onViewChange, onFavoriteClick, date, index) => {
  const tripDay = date ? new DayInfoComponent(index + 1, date) : new DayInfoComponent();
  const tripDayElement = tripDay.getElement();
  const eventListElement = tripDayElement.querySelector(`.trip-events__list`);

  const pointController = renderEvents(eventListElement, events, onDataChange, onViewChange, onFavoriteClick);

  render(container, tripDay, RenderPosition.BEFOREEND);

  return pointController;
};

const renderEventsList = (container, events, onDataChange, onViewChange, onFavoriteClick) => {
  let points = [];
  const dates = generateDays(events);

  dates.forEach((date, index) => {
    const days = events.filter((event) => {
      return date === new Date(event.startDate).toDateString();
    });

    points = points.concat(renderTripDay(container, days, onDataChange, onViewChange, onFavoriteClick, date, index));
  });

  return points;
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._newEventButton = newEventButton;

    this._showedPointControllers = [];
    this._tripSortComponent = new TripSortComponent();
    this._NewEventComponent = new NewEventComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._dayListComponent = new DayListComponent();
    this._tripCostComponent = new TripCostComponent();
    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._removeEvents = this._removeEvents.bind(this);
    this._updateEvents = this._updateEvents.bind(this);
    this.renderCostComponent = this.renderCostComponent.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    this._pointsModel.setDataChangeHandler(this.renderCostComponent);
  }

  hide() {
    if (this._container) {
      this._container.classList.add(HIDDEN_CLASS);
    }
  }

  show() {
    if (this._container) {
      this._container.classList.remove(HIDDEN_CLASS);
    }
  }

  render() {
    const events = this._pointsModel.getEvents();

    this._dates = generateDays(events);


    const tripInfo = {
      startDate: new Date(this._dates[0]).getDate(),
      endDate: new Date(this._dates[this._dates.length - 1]).getDate(),
      startCity: events[0].city,
      // middleCity: events[events.length / 2 - 1].city,
      endCity: events[events.length - 1].city,
      month: new Date(this._dates[0]).toLocaleString(`default`, {
        month: `long`
      })
    };

    const tripMainElement = document.querySelector(`.trip-main`);
    render(tripMainElement, new TripInfoComponent(tripInfo), RenderPosition.AFTERBEGIN);

    render(this._container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._dayListComponent, RenderPosition.BEFOREEND);

    const dayListElement = this._container.querySelector(`.trip-days`);

    if (events.length === 0) {
      remove(this._tripSortComponent);
      render(dayListElement, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
    }

    this.renderCostComponent();

    this._renderEvents(dayListElement, events.slice(0, this._showingEventsCount));
  }

  renderCostComponent() {
    remove(this._tripCostComponent);
    this._tripCostComponent = new TripCostComponent(countTripPrice(this._pointsModel.getEvents()));
    const tripInfoElement = document.querySelector(`.trip-info`);
    render(tripInfoElement, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _onFavoriteClick(oldData, newData) {
    this._pointsModel.updateEvent(oldData.id, newData);
  }

  createEvent() {
    const dayListElement = this._container.querySelector(`.trip-days`);

    this._pointsModel.setFilter(FilterType.EVERYTHING);
    this._onSortTypeChange(SortType.EVENT);
    this._tripSortComponent.resetSortType();

    this._creatingEvent = new PointController(dayListElement, this._onDataChange, this._onViewChange, this._onFavoriteClick);
    this._showedPointControllers.push(this._creatingEvent);
    this._creatingEvent.render(EmptyEvent, PointControllerMode.ADDING);
  }

  resetSortType() {
    this._onSortTypeChange(SortType.EVENT);
    this._tripSortComponent.resetSortType();
  }

  _removeEvents() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
    const dayListElement = this._container.querySelector(`.trip-days`);
    dayListElement.innerHTML = ``;
  }

  _renderEvents(container, events) {
    const newPoints = renderEventsList(container, events, this._onDataChange, this._onViewChange, this._onFavoriteClick);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _renderTripDay(container, events) {
    const newPoints = renderTripDay(container, events, this._onDataChange, this._onViewChange, this._onFavoriteClick);
    this._showedPointControllers = newPoints;
  }

  _updateEvents() {
    this._removeEvents();
    this._renderEvents(this._container.querySelector(`.trip-days`), this._pointsModel.getEvents().slice());
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;

      if (newData === null) {
        pointController.destroy();
        this._newEventButton.disabled = false;
        this._creatingEvent = null;
        this._showedPointControllers.pop();
      } else {
        this._pointsModel.addEvent(newData);
        this._updateEvents();
        this._newEventButton.disabled = false;

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._onViewChange();
      }
    } else if (newData === null) {
      this._pointsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._pointsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const tripEventsElement = document.querySelector(`.trip-events`);
    const dayListElement = tripEventsElement.querySelector(`.trip-days`);
    const sortedEvents = getSortedEvents(this._pointsModel.getEvents(), sortType);

    dayListElement.innerHTML = ``;
    newEventButton.disabled = false;


    if (sortType === SortType.EVENT) {
      this._removeEvents();
      this._renderEvents(dayListElement, sortedEvents);
    } else {
      this._removeEvents();
      this._renderTripDay(dayListElement, sortedEvents);
    }
  }

  _onFilterChange() {
    newEventButton.disabled = false;
    this._updateEvents();
  }
}

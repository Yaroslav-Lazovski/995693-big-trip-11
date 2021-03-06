import TripController from "./controllers/trip.js";
import TripTabsComponent, {TabItem} from "./components/trip-tabs.js";
import TripStatisticsComponent from "./components/trip-statistics.js";
import FilterController from "./controllers/filter.js";
import PointsModel from "./models/points.js";

import {generateEvents} from "./mock/events.js";
import {generateTabs} from "./mock/filters-tabs.js";
import {render, RenderPosition} from "./utils/render.js";
import {FilterType} from "./const.js";


const EVENT_COUNT = 5;


const events = generateEvents(EVENT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setEvents(events);


const tabs = generateTabs();


const controlsElement = document.querySelector(`.trip-controls`).querySelectorAll(`h2`);

const tripTabsComponent = new TripTabsComponent(tabs);
render(controlsElement[0], tripTabsComponent, RenderPosition.AFTEREND);

const filterController = new FilterController(controlsElement[1], pointsModel);
filterController.render();

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement, pointsModel);
tripController.render(events);

const tripStatisticsComponent = new TripStatisticsComponent(pointsModel);
render(tripEventsElement, tripStatisticsComponent, RenderPosition.AFTEREND);
tripStatisticsComponent.hide();


tripTabsComponent.setOnChange((tabItem) => {
  switch (tabItem) {
    case TabItem.TABLE:
      tripTabsComponent.setActiveItem(TabItem.TABLE);
      tripStatisticsComponent.hide();
      tripController.show();
      pointsModel.setFilter(FilterType.EVERYTHING);
      filterController.render();
      break;
    case TabItem.STATS :
      tripTabsComponent.setActiveItem(TabItem.STATS);
      tripController.hide();
      tripStatisticsComponent.show();
      tripController.resetSortType();
      pointsModel.setFilter(FilterType.EVERYTHING);
      filterController.render();
      break;
  }
});


const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

newEventButton.addEventListener(`click`, () => {
  tripTabsComponent.setActiveItem(TabItem.TABLE);
  tripStatisticsComponent.hide();
  tripController.show();
  tripController.createEvent();
  filterController.render();
  newEventButton.disabled = true;
});

import TripSortComponent from "../components/trip-sort.js";
import AddNewEventComponent from "../components/add-new-event.js";
import EventComponent from "../components/event.js";
import EditEventComponent from "../components/edit-event.js";
import DayListComponent from "../components/day-list.js";
import DayInfoComponent from "../components/day-info.js";
import NoEventsComponent from "../components/no-events.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";


const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, new TripSortComponent(), RenderPosition.BEFOREEND);
// render(tripEventsElement, new AddNewEventComponent(events[0]), RenderPosition.BEFOREEND);

render(tripEventsElement, new DayListComponent(), RenderPosition.BEFOREEND);

const dayList = tripEventsElement.querySelector(`.trip-days`);


export default class TripController {
  constructor() {
    this._tripSortComponent = new TripSortComponent();
    this._addNewEventComponent = new AddNewEventComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(events, dates) {
    if (events.length === 0) {
      remove(this._tripSortComponent);
      remove(this._addNewEventComponent);
      render(dayList, this._noEventsComponent, RenderPosition.BEFOREEND);

      return;
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
  }
}

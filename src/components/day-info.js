import {createEventTemplate} from "./event";

const createDayInfoTemplate = (index, day, events) => {
  const eventsList = events.map((item) => createEventTemplate(item)).join(`\n`);

  const year = new Date(day).getFullYear();

  const getMonth = () => {
    let month = new Date(day).getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    }
    return month;
  };

  const date = new Date(day).getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${year}-${getMonth()}-${date}">${new Date(day).toLocaleString(`default`, {month: `long`})} ${new Date(day).getDate()}</time>
      </div>
      <ul class="trip-events__list">
        ${eventsList}
      </ul>
    </li>`
  );
};

export default class FormEvent {
  constructor(index, day, events) {
    this._index = index;
    this._day = day;
    this._events = events;

    this._element = null;
  }

  getTemplate() {
    return createDayInfoTemplate(this._index, this._day, this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createDayInfoTemplate(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}

import {createElement} from "../utils.js";

const createDayInfoTemplate = (index, day) => {
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
      </ul>
    </li>`
  );
};

export default class DayInfo {
  constructor(index, day) {
    this._index = index;
    this._day = day;

    this._element = null;
  }

  getTemplate() {
    return createDayInfoTemplate(this._index, this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

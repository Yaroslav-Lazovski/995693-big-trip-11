import AbstractComponent from "./abstract-component.js";

import moment from "moment";

const createDayInfoTemplate = (index, day) => {
  const timestamp = new Date(day).getTime();
  const dayCounter = index || ``;
  const fullDate = day && moment.utc(timestamp).format(`YYYY-MM-DDThh:mm`) || ``;
  const date = day && moment(timestamp).format(`MMM D`) || ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${fullDate}">${date}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class DayInfo extends AbstractComponent {
  constructor(index, day) {
    super();

    this._index = index;
    this._day = day;
  }

  getTemplate() {
    return createDayInfoTemplate(this._index, this._day);
  }
}

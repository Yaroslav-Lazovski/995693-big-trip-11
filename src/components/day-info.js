import AbstractComponent from "./abstract-component.js";

import moment from "moment";

const createDayInfoTemplate = (index, day) => {
  const timestamp = new Date(day).getTime();
  const dayCounter = index || ``;
  const fullDate = moment(timestamp).format(`YYYY-MM-DDThh:mm`) || ``;
  const month = moment(timestamp).format(`MMMM`) || ``;
  const date = moment(timestamp).format(`DD`) || `` || ``;


  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${fullDate}">${month} ${date}</time>
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

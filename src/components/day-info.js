import AbstractComponent from "./abstract-component.js";

const createDayInfoTemplate = (index, day) => {
  const dayCounter = index || ``;
  const fullDate = day && new Date(day).toLocaleDateString() || ``;
  const month = day && new Date(day).toLocaleString(`default`, {month: `long`}) || ``;
  const date = day && new Date(day).getDate() || ``;


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

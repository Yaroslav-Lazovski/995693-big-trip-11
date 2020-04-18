import AbstractComponent from "./abstract-component.js";

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

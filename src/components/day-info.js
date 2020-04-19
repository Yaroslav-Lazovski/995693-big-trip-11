import AbstractComponent from "./abstract-component.js";

const createDayInfoTemplate = (index, day) => {
  // let year = new Date(day).getFullYear();

  // if (!(index && day)) {

  // }

  // const getMonth = () => {
  //   let month = new Date(day).getMonth() + 1;
  //   if (month < 10) {
  //     return `0${month}`;
  //   }
  //   return month;
  // };

  // let date = new Date(day).getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index || ``}</span>
        <time class="day__date" datetime="${day && new Date(day).toLocaleDateString() || ``}">${day && new Date(day).toLocaleString(`default`, {month: `long`}) || ``} ${day && new Date(day).getDate() || ``}</time>
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

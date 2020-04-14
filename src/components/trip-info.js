import {createElement} from "../utils.js";

const createTripInfoTemplate = (tripInfo) => {
  const {startDate, endDate, startCity, middleCity, endCity, month} = tripInfo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startCity} &mdash; ${middleCity} &mdash; ${endCity}</h1>
        <p class="trip-info__dates">${month} ${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>
    </section>`
  );
};

export default class TripInfo {
  constructor(tripInfo) {
    this._tripInfo = tripInfo;

    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}

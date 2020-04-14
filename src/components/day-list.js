import {createElement} from "../utils.js";

const createDayListTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayListTemplate();
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

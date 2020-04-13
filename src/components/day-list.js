import {createElement} from "../utils.js";

export const createDayListTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export class DayList {
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

import {createElement} from "../utils.js";

export const createTripCostTemplate = (cost) => {
  return (
    `
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
  `
  );
};

export class TripCost {
  constructor(cost) {
    this._cost = cost;

    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._cost);
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

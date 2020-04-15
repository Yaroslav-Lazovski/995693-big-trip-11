import {createElement} from "../utils.js";

const createTabMarkup = (tab, isActive) => {
  const {name} = tab;

  return (
    `<a class="trip-tabs__btn  trip-tabs__btn${isActive ? `--active` : ``}" href="#">${name}</a>`
  );
};

const createTripTabsTemplate = (tabs) => {
  const tabsMarkup = tabs.map((it, i) => createTabMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabsMarkup}
    </nav>`
  );
};

export default class TripTabs {
  constructor(tabs) {
    this._tabs = tabs;

    this._element = null;
  }

  getTemplate() {
    return createTripTabsTemplate(this._tabs);
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

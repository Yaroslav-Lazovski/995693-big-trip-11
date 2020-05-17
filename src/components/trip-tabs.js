import AbstractComponent from "./abstract-component.js";

export const TabItem = {
  TABLE: `TABLE`,
  STATS: `STATS`,
};

const createTabMarkup = (tab, isActive) => {
  const {name} = tab;

  return (
    `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`
  );
};

const createTripTabsTemplate = (tabs) => {
  const tabsMarkup = tabs.map((item, i) => createTabMarkup(item, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabsMarkup}
    </nav>`
  );
};

export default class TripTabs extends AbstractComponent {
  constructor(tabs) {
    super();

    this._tabs = tabs;
  }

  getTemplate() {
    return createTripTabsTemplate(this._tabs);
  }

  setActiveItem(tablItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    items.forEach((item) => {
      if (item.text.toUpperCase() === tablItem) {
        item.classList.add(`trip-tabs__btn--active`);
      } else {
        item.classList.remove(`trip-tabs__btn--active`);
      }
    });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const tablItem = evt.target.text.toUpperCase();

      handler(tablItem);
    });
  }
}

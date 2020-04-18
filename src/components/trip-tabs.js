import AbstractComponent from "./abstract-component.js";

const createTabMarkup = (tab, isActive) => {
  const {name} = tab;

  return (
    `<a class="trip-tabs__btn  trip-tabs__btn${isActive ? `--active` : ``}" href="#">${name}</a>`
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
}

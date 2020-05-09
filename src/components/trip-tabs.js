import AbstractComponent from "./abstract-component.js";

export const TablItem = {
  TABS: `control__table`,
  STATS: `control__stats`,
};

const createTabMarkup = (tab, isActive) => {
  const {name} = tab;

  return (
    `<a class="trip-tabs__btn  trip-tabs__btn${isActive ? `--active control__table` : ` control__stats`}" href="#">${name}</a>`
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
    const item = this.getElement().querySelector(`.${tablItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const tablItem = evt.target.id;

      handler(tablItem);
    });
  }
}

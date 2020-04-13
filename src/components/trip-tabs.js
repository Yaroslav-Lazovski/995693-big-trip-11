const createTabMarkup = (tab, isActive) => {
  const {name} = tab;

  return (
    `<a class="trip-tabs__btn  trip-tabs__btn${isActive ? `--active` : ``}" href="#">${name}</a>`
  );
};

export const createTripTabsTemplate = (tabs) => {
  const tabsMarkup = tabs.map((it, i) => createTabMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabsMarkup}
    </nav>`
  );
};

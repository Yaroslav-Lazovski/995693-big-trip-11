const createFilterMarkup = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id = "filter-${name}"
        class = "trip-filters__filter-input  visually-hidden"
        type = "radio"
        name = "trip-filter"
        value = "${name.toLowerCase()}"
        ${isChecked ? `checked` : ``}
      />
      <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
    </div>`
  );
};

export const createTripFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

import AbstractComponent from "./abstract-component.js";

import moment from "moment";

const generateOfferList = (offer) => {
  return offer
    .map((item) => {
      const {title, cost} = item;
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${cost}</span>
        </li>`
      );
    }).slice(0, 3).join(`\n`);
};

const createEventTemplate = (event) => {
  const {type, city, price, offers, startDate, endDate} = event;

  const isMove = [`Check-in`, `Sightseeing`, `Restaurant`].some((item) => item === type) ? `in` : `to`;
  const isArrive = !!offers;

  const duration = moment(endDate).diff(moment(startDate));
  const startDatetime = moment(startDate).format(`YYYY-MM-DDThh:mm`);
  const endDatetime = moment(endDate).format(`YYYY-MM-DDThh:mm`);
  let days = moment.utc(duration).format(`DD`);
  let hours = moment.utc(duration).format(`HH`);
  let minutes = moment.utc(duration).format(`mm`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${isMove} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDatetime}">${moment(startDatetime).format(`hh:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDatetime}">${moment(endDatetime).format(`hh:mm`)}</time>
          </p>
          <p class="event__duration">${days ? days + `D` : ``} ${hours ? hours + `H` : ``} ${minutes ? minutes + `M` : ``}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${isArrive ?
      `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
            ${generateOfferList(offers)}
            </ul>`
      : ``
    }
          <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

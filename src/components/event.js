import {createElement} from "../utils.js";

const generateOfferList = (offer) => {
  return offer
    .map((it) => {
      const {title, cost} = it;
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
  const {type, city, price, offer} = event;

  const isMove = [`Check-in`, `Sightseeing`, `Restaurant`].some((it) => it === type) ? `in` : `to`;
  const isArrive = !!offer;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${isMove} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${isArrive ?
      `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
            ${generateOfferList(offer)}
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

export default class Event {
  constructor(event) {
    this._event = event;

    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._event);
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

import AbstractSmartComponent from "./abstract-smart-component.js";

const Type = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`,
};


const createTypeOfEventMarkup = (type) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type.toLowerCase() === Type.TAXI ? `checked` : ``}>
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type.toLowerCase() === Type.BUS ? `checked` : ``}>
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type.toLowerCase() === Type.TRAIN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type.toLowerCase() === Type.SHIP ? `checked` : ``}>
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type.toLowerCase() === Type.TRANSPORT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type.toLowerCase() === Type.DRIVE ? `checked` : ``}>
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type.toLowerCase() === Type.FLIGHT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type.toLowerCase() === Type.CHECK_IN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type.toLowerCase() === Type.SIGHTSEEING ? `checked` : ``}>
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type.toLowerCase() === Type.RESTAURANT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>`
  );
};

const createOffersMarkup = (offers) => {
  return offers
    .map((item) => {
      const {title, cost} = item;
      const offerName = title.split(` `);
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName[offerName.length - 1]}-1" type="checkbox" name="event-offer-${offerName[offerName.length - 1]}" checked>
          <label class="event__offer-label" for="event-offer-${offerName[offerName.length - 1]}-1">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${cost}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
};


const createEditEventTemplate = (event) => {
  const {type, city, price, offer, isFavorite} = event;

  const typeOfEventMarkup = createTypeOfEventMarkup(type);
  const isMove = [`Check-in`, `Sightseeing`, `Restaurant`].some((item) => item === type) ? `in` : `to`;
  const offersMarkup = createOffersMarkup(offer);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          ${typeOfEventMarkup}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type} ${isMove}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersMarkup}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._editButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._event);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._editButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setEditButtonClickHandler(this._editButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const eventTypeButtons = element.querySelectorAll(`.event__type-input`);

    eventTypeButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        const eventTypeIcon = element.querySelector(`.event__type-icon`);
        evt.target.setAttribute(`checked`, ``);
        eventTypeIcon.src = `img/icons/${evt.target.value}.png`;
      });
    });
  }
}

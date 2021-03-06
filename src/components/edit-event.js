import AbstractSmartComponent from "./abstract-smart-component.js";
import {EventType} from "../const.js";
import {cities, offers as mockOffersArray, generateOffers, generateCities, generateDescription, generatePhotos} from "../mock/events.js";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import moment from "moment";


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
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type.toLowerCase() === EventType.TAXI ? `checked` : ``}>
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type.toLowerCase() === EventType.BUS ? `checked` : ``}>
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type.toLowerCase() === EventType.TRAIN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type.toLowerCase() === EventType.SHIP ? `checked` : ``}>
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type.toLowerCase() === EventType.TRANSPORT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type.toLowerCase() === EventType.DRIVE ? `checked` : ``}>
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type.toLowerCase() === EventType.FLIGHT ? `checked` : ``}>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type.toLowerCase() === EventType.CHECK_IN ? `checked` : ``}>
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type.toLowerCase() === EventType.SIGHTSEEING ? `checked` : ``}>
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type.toLowerCase() === EventType.RESTAURANT ? `checked` : ``}>
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
          <input class="event__offer-checkbox visually-hidden" value ="${title}" id="event-offer-${offerName[offerName.length - 1]}-1" type="checkbox" name="event-offer" checked>
          <label class="event__offer-label" for="event-offer-${offerName[offerName.length - 1]}-1">
            <span class="event__offer-title">${title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${cost}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
};

const createDescriptionMarkup = (text, url) => {
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${text}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="${url}" alt="Event photo">
          </div>
        </div>
      </section>`
  );
};

const createEditEventButton = () => {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
};

const createEventFavoriteCheckbox = (event, isFavorite) => {
  return (
    `<input id="event-favorite-${event.startDate}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label label class = "event__favorite-btn" for = "event-favorite-${event.startDate}" >
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
};


const createEditEventTemplate = (event, options = {}) => {
  const {price, isFavorite, isNew} = event;
  const {type, city, offers, description, photos} = options;

  const typeOfEventMarkup = createTypeOfEventMarkup(type);
  const isMove = [`Check-in`, `Sightseeing`, `Restaurant`].some((item) => item === type) ? `in` : `to`;
  const offersMarkup = createOffersMarkup(offers);
  const descriptionOfEvent = createDescriptionMarkup(description, photos);
  const editEventButton = createEditEventButton();
  const eventFavoriteCheckbox = createEventFavoriteCheckbox(event, isFavorite);


  return (
    `${isNew ? `` : `<li class="trip-events__item">`}<form class="event  event--edit" action="#" method="post">
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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${event.startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${event.endDate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNew ? `Cancel` : `Delete`}</button>
          ${isNew ? `` : eventFavoriteCheckbox}
          ${isNew ? `` : editEventButton}
        </header>

        ${isNew || !city ? `` : `<section class="event__details">
         <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${city ? offersMarkup : ``}
            </div>

         </section>

          ${city ? descriptionOfEvent : ``}
        </section>`}
      </form>${isNew ? `` : `</li>`}`
  );
};

const parseFormData = (formData) => {
  const offers = mockOffersArray.filter((offer) => {
    return formData.getAll(`event-offer`).some((offerTitle) => {
      return offerTitle === offer.title;
    });
  });

  return {
    type: formData.get(`event-type`),
    city: formData.get(`event-destination`),
    offers,
    price: formData.get(`event-price`),
    startDate: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
    endDate: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
    isFavorite: formData.get(`event-favorite`)
  };
};

const isDestinationInCitiesList = (citiesList, destination) => {
  return citiesList.some((city) => city === destination);
};


export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._type = event.type;
    this._offers = event.offers;
    this._city = event.city;
    this._description = event.description;
    this._photos = event.photos;
    this._startDate = event.startDate;
    this._endDate = event.endDate;
    this._isNew = event.isNew;

    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._editButtonClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._priceInputKeydownHandler = null;

    this._flatpickr = null;
    this._applyFlatpickr();

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._event,
        {
          type: this._type,
          city: this._city,
          offers: this._offers,
          description: this._description,
          photos: this._photos,
          startDate: this._startDate,
          endDate: this._endDate
        }
    );
  }

  getData() {
    let form;
    if (this._isNew) {
      form = document.querySelector(`.event--edit`);
    } else {
      form = this.getElement().querySelector(`.event--edit`);
    }
    const formData = new FormData(form);
    const formDataAll = Object.assign({}, parseFormData(formData), {photos: this._photos, description: this._description});

    return formDataAll;
  }

  setSubmitHandler(handler) {
    if (this._isNew) {
      this.getElement().addEventListener(`submit`, handler);
    } else {
      this.getElement().querySelector(`form`)
        .addEventListener(`submit`, handler);
    }

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    const eventFavoriteButton = this.getElement().querySelector(`.event__favorite-checkbox`);

    if (eventFavoriteButton) {
      eventFavoriteButton.addEventListener(`click`, handler);
    }

    this._favoriteButtonClickHandler = handler;
  }

  setEditButtonClickHandler(handler) {
    const editEventButton = this.getElement().querySelector(`.event__rollup-btn`);

    if (editEventButton) {
      editEventButton.addEventListener(`click`, handler);
    }

    this._editButtonClickHandler = handler;
  }

  setPriceInputKeydownHandler(handler) {
    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`keydown`, handler);

    this._priceInputKeydownHandler = handler;
  }


  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setEditButtonClickHandler(this._editButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setPriceInputKeydownHandler(this._priceInputKeydownHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const event = this._event;

    this._type = event.type;
    this._offers = event.offers;
    this._city = event.city;
    this._description = event.description;
    this._photos = event.photos;
    this._startDate = event.startDate;
    this._endDate = event.endDate;

    this.rerender();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._startDate) {
      const dateElement = this.getElement().querySelector(`input[name="event-start-time"]`);
      this._flatpickr = flatpickr(dateElement, {
        allowInput: true,
        defaultDate: moment(this._startDate).format(`DD/MM/YY hh:mm`),
        enableTime: true,
        dateFormat: `d/m/y H:i`
      });
      dateElement.value = moment(this._startDate).format(`DD/MM/YY hh:mm`);
    }

    if (this._endDate) {
      const dateElement = this.getElement().querySelector(`input[name="event-end-time"]`);
      this._flatpickr = flatpickr(dateElement, {
        allowInput: true,
        defaultDate: moment(this._endDate).format(`DD/MM/YY hh:mm`),
        enableTime: true,
        dateFormat: `d/m/y H:i`
      });
      dateElement.value = moment(this._endDate).format(`DD/MM/YY hh:mm`);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const eventTypeButtons = element.querySelectorAll(`.event__type-input`);
    const destinationInputs = element.querySelectorAll(`.event__input--destination`);
    const submitButton = element.querySelector(`.event__save-btn`);

    eventTypeButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        const type = evt.target.value;

        this._type = type[0].toUpperCase() + type.slice(1);
        this._offers = generateOffers();
        this._city = generateCities();
        this._description = generateDescription();
        this._photos = generatePhotos();

        this.rerender();
      });
    });


    destinationInputs.forEach((input) => {
      input.addEventListener(`change`, () => {
        if (!isDestinationInCitiesList(cities, input.value)) {
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }
      });
    });
  }
}

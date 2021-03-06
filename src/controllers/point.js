import EventComponent from "../components/event.js";
import EditEventComponent from "../components/edit-event.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};


export const EmptyEvent = {
  type: `taxi`,
  city: ``,
  offers: [],
  price: 0,
  description: ``,
  photos: [],
  startDate: Date.now(),
  endDate: Date.now(),
  isFavorite: false,
  isNew: true
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, onFavoriteClick) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._editEventComponent = null;
    this._onFavoriteClick = onFavoriteClick;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;

    this._mode = mode;
    this._eventComponent = new EventComponent(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit(event);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });


    switch (mode) {
      case Mode.DEFAULT:
        if (this._editEventComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (this._editEventComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(this._editEventComponent);
        }

        const container = document.querySelector(`.trip-events__trip-sort`);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        this._replaceEventToEdit(event);
        render(container, this._editEventComponent, RenderPosition.AFTEREND);
        document.querySelector(`.event--edit`).classList.add(`trip-events__item`);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT && this._editEventComponent) {

      this._replaceEditToEvent();
    }
  }

  destroy() {
    if (this._editEventComponent) {
      remove(this._editEventComponent);
    }

    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit(event) {
    this._onViewChange();
    this._editEventComponent = new EditEventComponent(event);

    this._editEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const data = this._editEventComponent.getData();
      remove(this._editEventComponent);
      this._editEventComponent = null;
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._editEventComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._editEventComponent.setPriceInputKeydownHandler(() => {
      const priceInput = document.querySelector(`.event__input--price`);

      if ((Number.isNaN(+priceInput.value))) {
        priceInput.setCustomValidity(`Please, write a number`);
      } else {
        priceInput.setCustomValidity(``);
      }
    });

    if (this._mode === Mode.ADDING) {
      return;
    }

    replace(this._editEventComponent, this._eventComponent);

    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._editEventComponent.reset();
    replace(this._eventComponent, this._editEventComponent);

    if (document.contains(this._editEventComponent.getElement())) {
      replace(this._eventComponent, this._editEventComponent);
    }

    if (this._mode === Mode.ADDING) {
      this._onDataChange(this, EmptyEvent, null);
    }

    remove(this._editEventComponent);
    this._editEventComponent = null;

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }

      if (this._editEventComponent) {
        this._replaceEditToEvent();
      }

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

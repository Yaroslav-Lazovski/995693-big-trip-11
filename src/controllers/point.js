import EventComponent from "../components/event.js";
import EditEventComponent from "../components/edit-event.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};


export const EmptyEvent = {
  type: ``,
  city: ``,
  offers: null,
  price: ``,
  description: ``,
  startDate: null,
  endDate: null,
  isFavorite: false
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEditEventComponent = this._editEventComponent;

    this._mode = mode;
    this._eventComponent = new EventComponent(event);
    this._editEventComponent = new EditEventComponent(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setEditButtonClickHandler(() => {
      this._replaceEditToEvent();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._editEventComponent.getData();
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editEventComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._editEventComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEditEventComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._editEventComponent, oldEditEventComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEditEventComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEditEventComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._editEventComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._editEventComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit() {
    this._onViewChange();
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

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }

      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

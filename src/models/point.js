export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.description = data[`destination`][`description`] || ``;
    this.city = data[`destination`][`name`];
    this.price = +data[`base_price`];
    this.photos = data[`destination`][`pictures`];
    this.offers = data[`offers`] || ``;
    this.type = data[`type`];
    this.startDate = data[`date_from`];
    this.endDate = data[`date_to`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.DATA = data;
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}

import {FilterType} from "../const.js";

export const getFutureEvents = (events, date) => {
  return events.filter((event) => {
    const eventDate = event.startDate;

    if (eventDate < date) {
      return false;
    }

    return event;
  });
};

export const getPastEvents = (events, date) => {
  return events.filter((event) => {
    const eventDate = event.startDate;

    if (eventDate > date) {
      return false;
    }

    return event;
  });
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date().getTime();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
  }

  return events;
};

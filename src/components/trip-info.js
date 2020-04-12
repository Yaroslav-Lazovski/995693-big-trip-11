export const createTripInfoTemplate = (tripInfo) => {
  const {startDate, endDate, startCity, middleCity, endCity, month} = tripInfo;
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startCity} &mdash; ${middleCity} &mdash; ${endCity}</h1>
        <p class="trip-info__dates">${month} ${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>
    </section>`
  );
};

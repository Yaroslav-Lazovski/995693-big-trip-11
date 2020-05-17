import AbstractSmartComponent from "./abstract-smart-component.js";

import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// const BAR_HEIGHT = 55;
const unicodeTypes = {
  TAXI: `🚕`,
  DRIVE: `🚗`,
  BUS: `🚌`,
  FLIGHT: `✈️`,
  TRAIN: `🚂`,
  SHIP: `🚢`,
  TRANSPORT: `🚊`,
  RESTAURANT: `🍴`,
  CHECK_IN: `🏨`,
  SIGHTSEEING: `🏛️`
};


const renderMoneyChart = (moneyCtx, events) => {
  const typesOfEventAll = [];
  const filteredTypes = {};


  events.forEach((event) => {
    typesOfEventAll.push(event.type.toUpperCase());
  });

  for (let i = 0; i < typesOfEventAll.length; i++) {
    let currentType = typesOfEventAll[i];

    if (filteredTypes[currentType]) {
      filteredTypes[currentType] += events[i].price;
    } else {
      filteredTypes[currentType] = events[i].price;
    }
  }

  const types = Object.keys(filteredTypes).sort((a, b) => filteredTypes[b] - filteredTypes[a]);
  const money = Object.values(filteredTypes).sort((a, b) => b - a);

  let titles = [];

  types.forEach((type) => {
    if (Object.keys(unicodeTypes).includes(type)) {
      titles.push(unicodeTypes[type.toUpperCase()] + type);
    }
  });


  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: titles,
      datasets: [{
        minBarLength: 50,
        barThickness: 44,
        data: money,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {
  const transportTypes = [`transport`, `taxi`, `train`, `bus`, `drive`, `flight`, `ship`];
  const typesOfEvent = [];
  const filteredTypes = {};


  events.forEach((event) => {
    return transportTypes.includes(event.type.toLowerCase()) ? typesOfEvent.push(event.type.toUpperCase()) : null;
  });

  for (let i = 0; i < typesOfEvent.length; i++) {
    let currentType = typesOfEvent[i];

    if (filteredTypes[currentType]) {
      filteredTypes[currentType] += 1;
    } else {
      filteredTypes[currentType] = 1;
    }
  }

  const types = Object.keys(filteredTypes).sort((a, b) => filteredTypes[b] - filteredTypes[a]);
  const count = Object.values(filteredTypes).sort((a, b) => b - a);

  let titles = [];

  types.forEach((type) => {
    if (Object.keys(unicodeTypes).includes(type)) {
      titles.push(unicodeTypes[type.toUpperCase()] + type);
    }
  });

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: titles,
      datasets: [{
        barThickness: 44,
        minBarLength: 50,
        data: count,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, events) => {
  const typesOfEventAll = [];
  const filteredTypes = {};


  events.forEach((event) => {
    typesOfEventAll.push(event.type.toUpperCase());
  });

  for (let i = 0; i < typesOfEventAll.length; i++) {
    const currentType = typesOfEventAll[i];
    const duration = moment.duration(moment(events[i].endDate).diff(moment(events[i].startDate)));

    if (filteredTypes[currentType]) {
      filteredTypes[currentType] += Math.round(duration.asHours());
    } else {
      filteredTypes[currentType] = Math.round(duration.asHours());
    }
  }

  const types = Object.keys(filteredTypes).sort((a, b) => filteredTypes[b] - filteredTypes[a]);
  const time = Object.values(filteredTypes).sort((a, b) => b - a);

  let titles = [];

  types.forEach((type) => {
    if (Object.keys(unicodeTypes).includes(type)) {
      titles.push(unicodeTypes[type.toUpperCase()] + type);
    }
  });


  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: titles,
      datasets: [{
        barThickness: 44,
        minBarLength: 50,
        data: time,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(events) {
    super();

    this._events = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;


    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._events);
  }

  recoveryListeners() {}

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();


    const moneyCtx = element.querySelector(`.statistics__chart--money`);

    const transportCtx = element.querySelector(`.statistics__chart--transport`);

    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);


    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._transportChart = renderTransportChart(transportCtx, this._events);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._events);

    // moneyCtx.height = BAR_HEIGHT * this._moneyChart.$datalabels._labels.length;
    // transportCtx.height = BAR_HEIGHT * this._transportChart.$datalabels._labels.length;
    // timeSpendCtx.height = BAR_HEIGHT * this._timeSpendChart.$datalabels._labels.length;
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }

  }
}

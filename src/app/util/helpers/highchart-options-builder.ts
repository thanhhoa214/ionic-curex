import { format } from 'date-fns/format';
import type { Options } from 'highcharts';

const HOUR_MIN_RANGE = 1,
  MINUTES_MIN_RANGE = 60,
  SECOND_MIN_RANGE = 60;

function formatThousandSeparator(number: number, digitDecimaNumber: number) {
  let tempNumberSplit = '';
  // Because error met by toFixed therefore we can't appy toFixed for all case.
  // 110911818.666.toFixed(9) => '110911818.665999994'
  tempNumberSplit =
    number < 1e-6 ? number.toFixed(digitDecimaNumber + 1) : number.toString();
  let [integerPart, decimalPart] = tempNumberSplit.split('.');

  // Clear decimal remainder
  if (decimalPart) {
    const tempDigitDecimaNumber =
      decimalPart.length < digitDecimaNumber
        ? decimalPart.length
        : digitDecimaNumber;
    decimalPart = decimalPart.slice(0, tempDigitDecimaNumber);

    for (let i = tempDigitDecimaNumber - 1; i >= 0; i--) {
      if (Number(decimalPart[i]) === 0) {
        decimalPart = decimalPart.slice(0, -1);
      } else {
        break;
      }
    }
  }

  let result = '';
  let temp = integerPart;
  while (integerPart.length > 3) {
    temp = integerPart.substring(integerPart.length - 3);
    result = ',' + temp + result;
    integerPart = integerPart.slice(0, -3);
  }
  if (integerPart) result = integerPart + result;
  if (decimalPart) result += '.' + decimalPart;
  return result;
}

export interface GetChartOptionsParams {
  counter: string;
  rates: [number, number][];
}

export function getChartOptions({
  counter,
  rates,
}: GetChartOptionsParams): Options {
  const values = rates;

  return {
    chart: {
      type: 'area',
      backgroundColor: 'var(--ion-background-color)',
      style: { fontFamily: 'Inter', fontWeight: 'normal' },
      zooming: { mouseWheel: false, singleTouch: false, type: 'x' },
      events: {
        load: function () {
          // Set chart width to maintain aspect ratio of 1.9
          this.update({ chart: { height: this.chartWidth / 1.9 } }, false);
          this.reflow();
        },
        render: function () {
          drawLatestYValue(this);
        },
      },
    },
    series: [
      {
        type: 'area',
        data: insertDataLabels(values),
        dataGrouping: { enabled: false },
        turboThreshold: 0,
        boostThreshold: 0,
        lineWidth: 1,
      },
    ],
    xAxis: {
      labels: {
        style: { fontSize: '10px', color: 'var(--ion-color-dark-tint)' },
        formatter: ({ value }) => `${format(value, 'dd/MM')}`,
      },
      minRange: HOUR_MIN_RANGE * MINUTES_MIN_RANGE * SECOND_MIN_RANGE * 1000,
      min: values[0][0],
      max: new Date().getTime(),
      lineWidth: 0,
      tickWidth: 0,
    },
    yAxis: {
      floor: 0,
      labels: {
        align: 'left',
        overflow: 'allow',
        x: 20,
        style: { fontSize: '11px', color: 'var(--ion-color-dark-tint)' },
        formatter: ({ value }) => `${value}`,
      },
      gridLineColor: 'var(--ion-color-light-shade)',
      gridLineDashStyle: 'Solid',
      gridLineWidth: 0.7,
      min: (() => {
        const dayData = values.filter((element) => element != null);
        dayData.sort((a, b) => a[1] - b[1]);
        return dayData[0][1];
      })(),
    },
    time: {
      useUTC: true,
      timezoneOffset: new Date().getTimezoneOffset(),
    },

    tooltip: {
      headerFormat: '',
      useHTML: true,
      borderWidth: 0,
      borderRadius: 12,
      padding: 0,
      shadow: {
        color: 'var(--ion-color-primary)',
        opacity: 0.1,
        offsetX: 0,
        offsetY: 0,
        width: 3,
      },
      shape: 'rect',
      formatter: function () {
        const formatCurrency = counter;
        const startedRate = values[0][1];
        const change =
          (this.y && ((this.y - startedRate) / startedRate) * 100) || 0;
        const price = formatThousandSeparator(Number(this.y), 8);
        const date = new Date(this.x || new Date()).toDateString();
        return `
              <p class="py-2 px-3">
                <strong class="text-sm ${
                  change > 0 ? 'text-green-600' : 'text-red-500'
                }">${formatCurrency} ${price}</strong>
                <br>
                <small class="text-gray-500">${date}</small>
              </p>`;
      },
    },
    plotOptions: {
      area: {
        crisp: false,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, '#69bb7b60'],
            [1, '#69bb7b10'],
          ],
        },
        lineColor: 'var(--ion-color-primary)',
      },
    },

    scrollbar: { liveRedraw: false, enabled: false },
    rangeSelector: { enabled: false },
    exporting: { enabled: false },
    credits: { enabled: false },
    navigator: { enabled: false },
  };
}

function insertDataLabels(
  numbers: number[][]
): Highcharts.SeriesAreaOptions['data'] {
  const highLow = getDataHighLowIndex(numbers.filter((d) => d));
  const result: Highcharts.SeriesAreaOptions['data'] = [...numbers];

  highLow.forEach((element, index) => {
    const isHigh = index === 0;
    result[element] = {
      marker: {
        enabled: true,
        fillColor: 'var(--ion-color-primary-shade)',
        radius: 2,
      },
      y: numbers[element][1],
      x: numbers[element][0],
      dataLabels: {
        enabled: true,
        animation: { defer: 1000 },
        y: isHigh ? 0 : 24,
        x: isHigh ? 0 : 24,
      },
    };
  });

  const latestIndex = result.length - 1;
  result[latestIndex] = {
    ...(result[latestIndex] as Highcharts.PointOptionsObject),
    y: numbers[latestIndex][1],
    x: numbers[latestIndex][0],
    marker: {
      enabled: true,
      fillColor: 'var(--ion-color-primary-shade)',
      radius: 4,
      lineColor: '#69bb7b33',
      lineWidth: 4,
    },
  };

  return result;
}

function getDataHighLowIndex(data: number[][]): [number, number] {
  let high = 0;
  let low = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] > data[high][1]) {
      high = i;
    }
    if (data[i][1] < data[low][1]) {
      low = i;
    }
  }
  return [high, low];
}

let latestLabel: Highcharts.SVGElement;
function formatNumberWithTotalLength(number: number, totalLength: number) {
  const integer = Math.round(number);
  const numOfInteger = (integer + '').length;
  const numOfThousandSeparators = Math.floor(Math.log10(number) / 3);
  const numOfFractionDigits =
    totalLength - numOfInteger - numOfThousandSeparators - 1;
  return formatThousandSeparator(
    number,
    numOfFractionDigits < 0 ? 0 : numOfFractionDigits
  );
}

function drawLatestYValue(chart: Highcharts.Chart) {
  const renderer = chart.renderer;
  const points = chart.series[0].points;
  const lastPoint = points[points.length - 1];

  if (latestLabel) latestLabel.destroy();
  latestLabel = renderer.g('latest-label-group').attr({
    translateX: chart.plotWidth,
    translateY: (lastPoint.plotY || 0) + chart.plotTop,
    zIndex: 10000,
  });
  const lineWidth = 14;
  const yLabelWidth = chart.chartWidth - chart.plotWidth;
  const rectWidth = yLabelWidth - lineWidth;
  const maxTextChars = Math.round(rectWidth / 12);
  const text = formatNumberWithTotalLength(Number(lastPoint.y), maxTextChars);

  const labelHeight = 22;
  const rect = renderer
    .rect(lineWidth, -labelHeight / 2, rectWidth, labelHeight)
    .attr({ fill: 'var(--ion-background-color)' });
  const textLabel = renderer
    .text(text)
    .attr({ fill: 'var(--ion-color-primary-shade)' })
    .css({ fontSize: '11px', height: labelHeight });

  rect.add(latestLabel);
  textLabel.add(latestLabel);
  latestLabel.add();

  const textTranslateX = (rect.getBBox().width - textLabel.getBBox().width) / 2;
  textLabel.translate(lineWidth + textTranslateX, 4);
}

import { Component, computed, input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
// @ts-ignore
import Highcharts from 'highcharts/highcharts.src';
import initStock from 'highcharts/modules/stock.src';
import initA11y from 'highcharts/modules/accessibility.src';
import {
  GetChartOptionsParams,
  getChartOptions,
} from 'src/app/util/helpers/highchart-options-builder';

if (typeof Highcharts === 'object') {
  initStock(Highcharts);
  initA11y(Highcharts);
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule],
})
export class LineChartComponent {
  readonly Highcharts = Highcharts;

  params = input<GetChartOptionsParams>();

  // API only supports rates with base PLN, so need calling 2 apis for base/counter then merging
  chartOptions = computed(() => {
    const params = this.params();
    return params ? getChartOptions(params) : undefined;
  });
}

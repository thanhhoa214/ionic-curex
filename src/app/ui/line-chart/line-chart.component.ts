import { Component, computed, input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import initStock from 'highcharts/modules/stock';
import initA11y from 'highcharts/modules/accessibility';
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
  readonly Highcharts: typeof Highcharts = Highcharts;

  params = input<GetChartOptionsParams>();

  // API only supports rates with base PLN, so need calling 2 apis for base/counter then merging
  chartOptions = computed(() => {
    const params = this.params();
    return params ? getChartOptions(params) : undefined;
  });
}
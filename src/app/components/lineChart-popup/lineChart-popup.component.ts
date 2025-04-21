import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  input,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { catchError, finalize } from 'rxjs';
import { MockDataService } from '../../mocks/mock-care.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lineChart',
  templateUrl: './lineChart-popup.component.html',
  styleUrls: ['./lineChart-popup.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  loading = false;
  lineChartDataFromApi: any;
  lineChart: any;
  @Input() lineChartData: any;
  @Output() clickOnData = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
    private route: Router
  ) {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getLineChartData();
  }

  ngOnInit(): void {
    this.getLineChartData();
  }

  createLineChart() {
    if (this.lineChart) {
      this.lineChart.destroy();
      this.lineChart = null;
    }
    this.lineChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.wrapLabels(this.lineChartDataFromApi.Labels),
        datasets: [
          {
            label: this.lineChartDataFromApi.DataReports[1].Label,
            data: this.lineChartDataFromApi.DataReports[1].Data,
            hoverBackgroundColor: [
              '#012D6A',
              '#BB6038',
              '#85BBD8',
              '#C0A25D',
              '#D6D6D6',
              '#545453',
            ],
            hoverBorderColor: [
              '#012D6A',
              '#BB6038',
              '#85BBD8',
              '#C0A25D',
              '#D6D6D6',
              '#545453',
            ],
            hoverBorderWidth: 16,
            backgroundColor: [
              'rgb(194 221 235)',
              'rgb(221 155 155) ',
              'rgb(223 208 174)',
              'rgb(128 150 180)',
            ],
            borderColor: [
              'rgb(194 221 235)',
              'rgb(221 155 155) ',
              'rgb(223 208 174)',
              'rgb(128 150 180)',
            ],
            borderWidth: 1,
            barThickness: 15,
            maxBarThickness: 10,
            minBarLength: 6,
          },
          {
            label: this.lineChartDataFromApi.DataReports[0].Label,
            data: this.lineChartDataFromApi.DataReports[0].Data,
            backgroundColor: ['#85BBD8', '#BB3837', '#BFA25D', '#012D6A'],
            borderColor: ['#85BBD8', '#BB3837', '#BFA25D', '#012D6A'],
            hoverBackgroundColor: [
              '#012D6A',
              '#BB6038',
              '#85BBD8',
              '#C0A25D',
              '#D6D6D6',
              '#545453',
            ],
            hoverBorderColor: [
              '#012D6A',
              '#BB6038',
              '#85BBD8',
              '#C0A25D',
              '#D6D6D6',
              '#545453',
            ],
            hoverBorderWidth: 16,
            borderWidth: 1,
            barThickness: 15,
            maxBarThickness: 10,
            minBarLength: 6,
          },
        ],
      },
      options: {
        onClick: (e, item, chartines) => {
          if (item.length) {
            const data =
              chartines.data.datasets[item[0].datasetIndex].data[item[0].index];
            const index = chartines.data.datasets[item[0].datasetIndex].label;
            const label = item[0].index;
            this.navigateToTable(
              chartines.data.datasets[item[0].datasetIndex].label != 'متأخرة',
              item[0].index,
              data
            );
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            position: 'right',

            ticks: {
              font: {
                size:
                  window.innerWidth < 526
                    ? 10
                    : window.innerWidth < 990
                    ? 15
                    : 20,
              },
            },
          },
          x: {
            position: 'right',
            ticks: {
              font: {
                size:
                  window.innerWidth < 526
                    ? 20
                    : window.innerWidth < 990
                    ? 20
                    : 15,
              },
              color: '#012D6A',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getLineChartData() {
    let query = {
      requestType: this.lineChartData.index,
    };
    this.http
      .get(
        'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/RequestTypeByIdTime',
        { params: query }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching dashboard data:', error);
          return this.mockDataService.getMockDashboardHeaderData();
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        this.lineChartDataFromApi = res.Result;
        this.createLineChart();
      });
  }

  navigateToTable(onTime: boolean, index: number, data: any) {
    this.route.navigate([
      'care/' +
        4 +
        '/' +
        index +
        '/' +
        onTime +
        '/' +
        data +
        '/' +
        this.lineChartData.index,
    ]);
  }
  wrapLabels(labels: string[]): string[][] {
    return labels.map((label) => {
      if (label.length <= 12) {
        return [label];
      }

      const words = label.split(' ');
      let currentLine = '';
      const wrappedLines: string[] = [];

      words.forEach((word) => {
        if ((currentLine + ' ' + word).trim().length <= 12) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          wrappedLines.push(currentLine.trim());
          currentLine = word;
        }
      });

      if (currentLine) {
        wrappedLines.push(currentLine.trim());
      }

      return wrappedLines;
    });
  }
}

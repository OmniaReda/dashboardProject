import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PopupDetailsComponent } from '../popup-details/popup-details.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs';
import { MockDataService } from '../../mocks/mock-care.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-care',
  templateUrl: './care.component.html',
  styleUrl: './care.component.css',
})
export class CareComponent implements OnInit {
  chart: any;
  showHardship: boolean = false;
  loading = true;
  careData: any = {};
  CasesCountByMonth: any;
  showBar: boolean = false;
  showlineChart: boolean = false;
  AgreedCasesCountByMonth: any;
  requestsTypes: any;
  mongz: any = '50%';
  hardshipData: any;
  hardshipBarData: any;
  lineChartData: any;
  requestsTypesTime: any;
  baseUrl = environment.baseUrl;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private mockDataService: MockDataService,
    private route: Router
  ) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getData();
  }

  // handleButtonClick(): void {
  //   setTimeout(() => {
  //     this.scrollToSections3(['sec3']);
  //     this.scrollToSection2('sec2');
  //   }, 0);
  //   this.openPopup();
  // }
  // scrollToSection2(sectionId: string): void {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     setTimeout(() => {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }, 0);
  //   }
  // }

  // scrollToSections3(sectionIds: string[]): void {
  //   sectionIds.forEach((sectionId, index) => {
  //     setTimeout(() => {
  //       const element = document.getElementById(sectionId);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }, 0);
  //   });
  // }

  private scrollTimeout: any;

  scrollToSection(sectionId: string): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  showHardshipPopup(sectionId: string): void {
    this.scrollToSection(sectionId);
    this.hardshipData = {
      data: this.requestsTypes?.DataReports[0]?.Data,
      label: this.requestsTypes?.DataReports[0]?.Label,
    };
    this.showlineChart = false;
    this.showHardship = true;
  }

  showBarPopup(event: any, sectionId: string): void {
    this.scrollToSection(sectionId);
    this.hardshipBarData = {
      data: event.data,
      label: event.label,
      index: event.index,
    };
    this.showBar = true;
  }
  showLineChartPopup(
    index: any,
    label: any,
    data: any,
    sectionId: string
  ): void {
    this.scrollToSection(sectionId);
    this.lineChartData = {
      data: data,
      label: label,
      index: index,
    };
    this.showBar = false;
    this.showHardship = false;
    this.showlineChart = true;
  }

  createChart() {
    this.chart = new Chart('myAreaChart', {
      type: 'line',
      data: this.CasesCountByMonth,
      options: {
        maintainAspectRatio: false,
        aspectRatio: 3 | 2,
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
    this.chart = new Chart('myAreaChart2', {
      type: 'line',
      data: this.AgreedCasesCountByMonth,
      options: {
        maintainAspectRatio: false,
        aspectRatio: 3 | 2,

        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
  }
  createBarChart() {
    this.chart = new Chart('myBarChart', {
      type: 'bar',
      data: {
        labels: this.wrapLabels(this.requestsTypesTime.Labels),
        datasets: [
          {
            label: this.requestsTypesTime.DataReports[1].Label,
            data: this.requestsTypesTime.DataReports[1].Data,
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
            label: this.requestsTypesTime.DataReports[0].Label,
            data: this.requestsTypesTime.DataReports[0].Data,
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
            this.navigateTODetails(
              item[0].index,
              chartines.data.datasets[item[0].datasetIndex].label != 'متأخرة',
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

  getData() {
    this.http
      .get(this.baseUrl + '/api-gateway-odoo/api/Dashboard/Header')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching dashboard data:', error);
          return this.mockDataService.getMockDashboardHeaderData();
        }),
        finalize(() => {
          this.getRequestsType();
        })
      )
      .subscribe((res: any) => {
        this.careData = res.Result;
        this.mongz = (this.careData.CasesOnTime * 100).toString() + '%';
        this.loading = false;
        this.handleChartsData();
        this.createChart();
        this.getRequestsType();
        this.getRequestsTypesTime();
      });
  }

  handleChartsData() {
    this.AgreedCasesCountByMonth = {
      labels: this.careData.AgreedCasesCountByMonth.map((res: any) => res.Key),
      datasets: [
        {
          label: '',
          data: this.careData.AgreedCasesCountByMonth.map(
            (res: any) => res.Value
          ),
          backgroundColor: 'rgb(128 150 180)',
          borderColor: '#012D6A',
          drawActiveElementsOnTop: false,

          fill: true, //
        },
      ],
    };

    this.CasesCountByMonth = {
      labels: this.careData.CasesCountByMonth.map((res: any) => res.Key),
      datasets: [
        {
          label: '',
          data: this.careData.AgreedCasesCountByMonth.map(
            (res: any) => res.Value
          ),
          backgroundColor: 'rgb(128 150 180)',
          borderColor: '#012D6A',
          drawActiveElementsOnTop: false,

          fill: true, //
          pointRadius: 0, //
          pointHoverRadius: 0,
        },
      ],
    };

    this.CasesCountByMonth = {
      labels: this.careData.CasesCountByMonth.map((res: any) => res.Key),
      datasets: [
        {
          label: '',
          data: this.careData.CasesCountByMonth.map((res: any) => res.Value),
          backgroundColor: 'rgb(128 150 180)',
          borderColor: '#012D6A',
          fill: true, //
        },
      ],
    };
  }
  getRequestsType() {
    this.http
      .get(this.baseUrl + '/api-gateway-odoo/api/Dashboard/RequestTypes')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching request types:', error);
          return this.mockDataService.getMockRequestTypesData();
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res: any) => {
        this.requestsTypes = res.Result;
      });
  }

  getRequestsTypesTime() {
    this.http
      .get(this.baseUrl + '/api-gateway-odoo/api/Dashboard/RequestTypesTime')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching request types times:', error);
          return this.mockDataService.getMockRequestTypesData();
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res: any) => {
        this.requestsTypesTime = res.Result;
        this.createBarChart();
      });
  }
  navigateTODetails(index: number, onTime: boolean, data: any) {
    this.route.navigate([
      'care/' + 1 + '/' + index + '/' + onTime + '/' + data,
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

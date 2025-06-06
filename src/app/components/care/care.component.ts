import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PopupDetailsComponent } from '../popup-details/popup-details.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, Subject } from 'rxjs';
import { MockDataService } from '../../mocks/mock-care.service';

@Component({
  selector: 'app-care',
  templateUrl: './care.component.html',
  styleUrl: './care.component.css',
})
export class CareComponent implements OnInit {
  chart: any;
  showPopup: boolean = false;
  loading = true;
  careData: any = {};
  CasesCountByMonth: any;
  AgreedCasesCountByMonth: any;
  requestsTypes: any;
  hardshipData: any;
  bar: any;
  mongz: any = '50%';
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {
    Chart.register(...registerables);
    this.getData();
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

  handleButtonClick(sectionId: string): void {
    this.scrollToSection(sectionId);
    this.openPopup();
  }

  openPopup() {
    // this.scrollToSection('sec2');
    this.hardshipData = {
      popupDetails: {
        title: 'ضائقة',
        subTitle: 'انواع طلبات الضائقة',
        total: '205',
        progressBars: [
          {
            title: 'مساعدة الزواج',
            count: 50,
            p1: { color: '#012D6A', count: '33' },
            p2: { color: '#7d91b1', count: '27' },
          },
          {
            title: 'مساعدة مسكن',
            count: 19,
            p1: { color: '#85BBD7', count: '33' },
            p2: { color: '#85BBD7', count: '27' },
          },
          {
            title: 'مصاريف العلاج',
            count: 1,
            p1: { color: '#d6d6d4', count: '33' },
            p2: { color: '#e5e6e8', count: '27' },
          },
          {
            title: ' مساعدات الدراسة',
            count: 30,
            p1: { color: '#b86139', count: '33' },
            p2: { color: '#d5ab97', count: '27' },
          },
          {
            title: ' مشاريع الاسرة المنتجة',
            count: 25,
            p1: { color: '#bda15e', count: '33' },
            p2: { color: '#d9ccab', count: '27' },
          },
          {
            title: 'مساعدات المقطوعة',
            count: 25,
            p1: { color: '#545452', count: '33' },
            p2: { color: '#a4a6a5', count: '27' },
          },
        ],
      },
      chartOptions: {
        type: 'doughnut',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'عدد الحالات',
              data: [50, 30, 19, 25, 1, 25],
              backgroundColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
              borderColor: [
                '#012D6A',
                '#BB6038',
                '#85BBD8',
                '#C0A25D',
                '#D6D6D6',
                '#545453',
              ],
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
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            datalabels: {
              color: '#fff',
              formatter: (value: number, ctx: any) => value,
              font: {
                weight: 'bold',
                size:
                  window.innerWidth < 526
                    ? 12
                    : window.innerWidth < 990
                    ? 16
                    : 20,
              },
              textAlign: 'center',
            },
          },
        },
      },
    };
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
        labels: this.wrapLabels([
          'مساعدة شهرية لكبار السن',
          'غارم',
          'غارم محبوس',
          'ضائقة',
        ]),
        datasets: [
          {
            label: 'المتأخرة',
            data: [38, 58, 65, 55],

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
            label: 'علي الوقت',
            data: [58, 85, 99, 90],
            backgroundColor: ['#85BBD8', '#BB3837', '#BFA25D', '#012D6A'],
            borderColor: ['#85BBD8', '#BB3837', '#BFA25D', '#012D6A'],
            borderWidth: 1,
            barThickness: 15,
            maxBarThickness: 10,
            minBarLength: 6,
          },
        ],
      },
      options: {
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
    this.loading = true;

    // Fetch dashboard header data with fallback to mock data
    this.http
      .get(
        'https://78e85d90-4d6b-4c15-86c8-7303cc6a33a3.mock.pstmn.io/api-gateway-odoo/api/Dashboard/Header'
      )
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
        this.handleChartsData();
        this.createChart();
        this.createBarChart();
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
          pointRadius: 0, //
          pointHoverRadius: 0,
        },
      ],
    };
  }

  getRequestsType() {
    this.http
      .get(
        'https://78e85d90-4d6b-4c15-86c8-7303cc6a33a3.mock.pstmn.io/api-gateway-odoo/api/Dashboard/RequestTypes'
      )
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

  handleFlipSectionEvent($event: any) {
    this.bar = $event;
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

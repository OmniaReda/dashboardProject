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
import { environment } from '../../../../environment';

@Component({
  selector: 'app-hardship-bar',
  templateUrl: './hardship-bar.component.html',
  styleUrls: ['./hardship-bar.component.css'],
})
export class HardshipBarComponent implements OnInit, OnChanges {
  loading = false;
  hardshipChart: any;
  isFlipped: any = false;
  donughtData: any;
  progressBars: any;
  @Input() hardshipDataTypes: any;
  @Output() clickOnData = new EventEmitter<any>();
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
    private route: Router
  ) {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getDonughtData();
  }

  ngOnInit(): void {
    console.log(this.hardshipDataTypes);

    this.getDonughtData();
  }

  createDoughnutChart() {
    if (this.hardshipChart) {
      this.hardshipChart.destroy();
      this.hardshipChart = null;
    }
    this.hardshipChart = new Chart('popupDoughnutBarChart', {
      type: 'doughnut',
      data: {
        labels: this.donughtData.Labels,
        datasets: [
          {
            label: 'عدد الحالات',
            data: this.donughtData.DataReports[0].Data.map(
              (res: any, index: number) =>
                res + this.donughtData.DataReports[1].Data[index]
            ),
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
        onClick: (e, item, chartines) => {
          if (item.length) {
            const data =
              chartines.data.datasets[item[0].datasetIndex].data[item[0].index];
            const index = item[0].index;
            const label = chartines.data.labels![index];
            this.clickOnSpeceficData(item[0].index, label, data);
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: '#fff',
            formatter: (value: number, ctx: any) => value,
            font: {
              weight: 'bold',
              size:
                window.innerWidth < 526 ? 8 : window.innerWidth < 990 ? 10 : 12,
            },
            textAlign: 'center',
          },
        },
      },
    });
  }

  clickOnSpeceficData(index: any, label: any, data: any) {
    this.clickOnData.emit({ index: index, label: label, data: data });
  }

  // getDonughtData() {
  //   let query = {
  //     // hardshipType: this.hardshipDataTypes.index
  //     //   ? this.hardshipDataTypes.index
  //     //   : 9,
  //     hardshipType: this.hardshipDataTypes?.ar || 'Other',
  //   };
  //   this.http
  //     .get(
  //       'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypeByIdTime',
  //       { params: query }
  //     )
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error fetching dashboard data toto:', error);
  //         return this.mockDataService.getMockDashboardHeaderData();
  //       }),
  //       finalize(() => {})
  //     )
  //     .subscribe((res: any) => {
  //       this.donughtData = res.Result;
  //       console.log('testOmar', this.donughtData);
  //       this.createDoughnutChart();
  //       this.getBarData();
  //     });
  // }
  helpTypes = [
    { id: 1, en: 'Hardship', ar: 'ضائقة' },
    { id: 2, en: 'In Debt', ar: 'غارم' },
    { id: 3, en: 'Imprisoned-InDept', ar: 'غارم محبوس' },
    { id: 4, en: 'Monthly Help', ar: 'إعانة شهرية' },
    { id: 5, en: 'Marriage Help', ar: 'مساعدة زواج' },
    { id: 6, en: 'Education Help', ar: 'مساعدة دراسة' },
    { id: 7, en: 'Treatment Expenses', ar: 'مصاريف علاج' },
    { id: 8, en: 'productive families projects', ar: 'مشاريع الأسر المنتجة' },
    { id: 9, en: 'Other', ar: 'أخرى' },
    { id: 28, en: 'Monthly Rental', ar: 'الإيجار الشهري' },
    { id: 29, en: 'Debt', ar: 'مديونية' },
    { id: 30, en: 'Monthly Installment', ar: 'الاقساط الشهرية' },
    { id: 31, en: 'Cut off financial Help', ar: 'المساعدة المالية المقطوعة' },
    { id: 89, en: 'Home Help', ar: 'مساعدة مسكن' },
    { id: 90, en: 'InDebt Hardship', ar: 'ضائقة مدين' },
  ];
  getDonughtData() {
    const selectedHelpType = this.hardshipDataTypes.name;
    const selectedLanguage = 'ar';

    const helpType = this.helpTypes.find(
      (item) => item[selectedLanguage] === selectedHelpType
    );

    const hardshipId = helpType ? helpType.id : 9;

    let query = {
      hardshipType: hardshipId,
    };

    this.http
      .get(
        this.baseUrl + '/api-gateway-odoo/api/Dashboard/HardshipTypeByIdTime',
        { params: query }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching dashboard data:', error);
          return this.mockDataService.getMockDashboardHeaderData(); // استخدام البيانات الافتراضية في حال حدوث خطأ
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        this.donughtData = res.Result;
        console.log('testOmar', this.donughtData);
        this.createDoughnutChart();
        this.getBarData();
      });
  }

  getBarData() {
    this.progressBars = this.donughtData.Labels.map(
      (label: string, index: number) => {
        let percentageP1: number = Math.abs(
          this.donughtData.DataReports[0].Data[index] /
            this.donughtData.DataReports[0].Data[index] +
            this.donughtData.DataReports[1].Data[index] * 100
        );
        let percentageP2: number = Math.abs(
          this.donughtData.DataReports[0].Data[index] /
            this.donughtData.DataReports[0].Data[index] +
            this.donughtData.DataReports[1].Data[index] * 100
        );
        let progressbar = {
          title: label,
          count:
            this.donughtData.DataReports[1].Data[index] +
            this.donughtData.DataReports[0].Data[index],
          p1: {
            color: '#c00000',
            count: this.donughtData.DataReports[1].Data[index],
            percentage: percentageP1,
          },
          p2: {
            color: '#bd9f57',
            count: this.donughtData.DataReports[0].Data[index],
            percentage: percentageP2,
          },
        };
        return progressbar;
      }
    );
  }
  getpercentage(count: number, total: number) {
    let percentage = (count / total) * 100;
    return percentage + '%';
  }
  navigateToTable(onTime: boolean, index: number, data: number) {
    this.route.navigate([
      'care/' +
        3 +
        '/' +
        index +
        '/' +
        onTime +
        '/' +
        data +
        '/' +
        this.hardshipDataTypes.index,
    ]);
  }
}

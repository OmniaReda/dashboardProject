import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-hardship-bar',
  templateUrl: './hardship-bar.component.html',
  styleUrls: ['./hardship-bar.component.css'],
})
export class HardshipBarComponent implements OnInit, OnChanges, OnDestroy {
  loading = false;
  chart: any;
  isFlipped: any = false;
  hardshipBarData: any;
  @Input() barSpecifications: any;

  constructor() {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {}

  ngOnChanges(simpleChanges: any): void {
    if (simpleChanges?.barSpecifications?.currentValue) {
      this.flipSection(simpleChanges.barSpecifications.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  createDoughnutChart(): void {
    if (this.hardshipBarData && this.hardshipBarData.chartOptions) {
      this.destroyChart();

      this.chart = new Chart(
        'popupDoughnutChart',
        this.hardshipBarData.chartOptions
      );
    }
  }

  flipSection(bar: any): void {
    console.log(bar);
    this.hardshipBarData = {
      popupDetails: {
        title: bar.title,
        subTitle: 'انواع طلبات ' + bar.title,
        total: bar.count,
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
            p1: { color: '#8abad6', count: '33' },
            p2: { color: '#bfd8e7', count: '27' },
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

    this.loader();
    this.createDoughnutChart();
  }

  loader(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}

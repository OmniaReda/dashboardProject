import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-hardship-bar',
  templateUrl: './hardship-bar.component.html',
  styleUrls: ['./hardship-bar.component.css'],
})
export class HardshipBarComponent implements OnInit, OnDestroy {
  loading = false;
  chart: any;
  isFlipped: any = false;
  hardshipBarData: any;

  constructor(private http:HttpClient) {
    Chart.register(...registerables, ChartDataLabels);
  }

  ngOnInit(): void {
    this.getHardshipdataTypesTime()
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
      this.destroyChart();

      this.chart = new Chart(
        'popupDoughnutChartbar',
        {
          type: 'doughnut',
          data: {
            labels: this.hardshipBarData.Labels,
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
      );
  }

 

  getHardshipdataTypesTime(){
    this.loading = true;

    this.http.get('https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypesTime').subscribe((res:any)=>{
      this.hardshipBarData = res.Result
      this.loading = false;

      this.createDoughnutChart();

    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  chart: any;
  careData = {
    totalcare: 205,
    percentage: 0.88,
    calculatedValue: 0,
    remainingPercentage: 0,
    remainingValue: 0,
  };
  bookData = {
    totalbook: 205,
    incomepercentage: 0.498,
    incomeValue: 0,
    outgoingPercentage: 0.22,
    outgoingValue: 0,
    interiorpercentage: 0,
    interiorValue: 0,
  };

  constructor() {
    Chart.register(...registerables);
    this.calculatecare();
    this.calculatebook();
  }
  ngOnInit(): void {
    this.createBarChart();
  }

  calculatecare() {
    this.careData.calculatedValue = Math.round(
      this.careData.totalcare * this.careData.percentage
    ); // 180
    this.careData.remainingPercentage = 1 - this.careData.percentage; // 0.13
    this.careData.remainingValue =
      this.careData.totalcare - this.careData.calculatedValue; // 25
  }

  calculatebook() {
    this.bookData.incomeValue = Math.round(
      this.bookData.totalbook * this.bookData.incomepercentage
    );
    this.bookData.outgoingValue = Math.round(
      this.bookData.totalbook * this.bookData.outgoingPercentage
    );
    this.bookData.interiorpercentage =
      1 - this.bookData.incomepercentage - this.bookData.outgoingPercentage;
    this.bookData.interiorValue = Math.round(
      this.bookData.totalbook * this.bookData.interiorpercentage
    );
  }
  createBarChart() {
    this.chart = new Chart('dashboardBar', {
      type: 'bar',
      data: {
        labels: ['قيد المتابعة', 'منجز', 'مرفوض'],
        datasets: [
          {
            data: [65, 50, 35],
            label: 'على الوقت',
            backgroundColor: ['green', 'green ', 'green'],
            borderColor: ['green', 'green ', 'green'],
            borderWidth: 1,
            barThickness: 15,
            maxBarThickness: 10,
            minBarLength: 6,
          },
          {
            label: 'المتأخره',

            data: [35, 45, 25],
            backgroundColor: ['red', 'red ', 'red'],
            borderColor: ['red', 'red ', 'red'],
            borderWidth: 1,
            barThickness: 15,
            maxBarThickness: 10,
            minBarLength: 6,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            position: 'right',
          },
          x: {
            position: 'right',
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
}

import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-hardship',
  templateUrl: './hardship.component.html',
  styleUrl: './hardship.component.css',
})
export class HardshipComponent implements OnInit {
  loading = false;
  chart: any;
  isFlipped: any = false;
  @Input() hardshipData: any;
  @Output() flipSectionEvent = new EventEmitter<any>();

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createDoughnutChart();
  }

  createDoughnutChart() {
    Chart.register(ChartDataLabels);
    this.chart = new Chart(
      'popupDoughnutChart',
      this.hardshipData.chartOptions
    );
  }

  flipSection(bar: any) {
    this.flipSectionEvent.emit(bar);
  }
}

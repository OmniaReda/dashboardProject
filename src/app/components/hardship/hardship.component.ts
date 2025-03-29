import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  input,
  Input,
  numberAttribute,
  OnInit,
  Output,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { catchError, finalize } from 'rxjs';
import { MockDataService } from '../../mocks/mock-care.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hardship',
  templateUrl: './hardship.component.html',
  styleUrl: './hardship.component.css',
})
export class HardshipComponent implements OnInit {
  loading = false;
  chart: any;
  isFlipped: any = false;
  donughtData:any
  barData:any;
  progressBars:any
  @Input() hardshipData:any;
  @Output() clickOnData = new EventEmitter<any>();

  constructor(private http: HttpClient,
      private mockDataService: MockDataService,
       private route:Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getDonughtData();
    this.getBarData()
  }

  createDoughnutChart() {
    Chart.register(ChartDataLabels);
    this.chart = new Chart(
      'popupDoughnutChart',
      {type: 'doughnut',
        data: {
          labels: this.donughtData.Labels,
          datasets: [
            {
              label: 'عدد الحالات',
              data: this.donughtData.DataReports.map((res:any)=> res.Data[0]),
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
          onClick: (e, item,chartines)=> {
            if (item.length) {
              const data = chartines.data.datasets[item[0].datasetIndex].data[item[0].index];
              const index = item[0].index;
              const label = chartines.data.labels![index];
              this.clickOnSpeceficData(item[0].index,label,data)
            }},
          responsive: true,
          plugins: {
            legend: {
              display:false,
            },
            datalabels: {
              color: '#fff',
              formatter: (value: number, ctx: any) => value,
              font: {
                weight: 'bold',
                size:
                  window.innerWidth < 526
                    ? 8
                    : window.innerWidth < 990
                    ? 10
                    : 12,
              },
              textAlign: 'center',
            },
          },
        },
      },
    );
  }

  clickOnSpeceficData(index: any,label:any,data:any) {
    this.clickOnData.emit({index:index,label:label,data:data});
  }

  getDonughtData(){
      this.http.get("https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypes").pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('Error fetching dashboard data:', error);
              return this.mockDataService.getMockDashboardHeaderData();
            }),
            finalize(() => {
              
            })
          ).subscribe((res:any)=>{
            this.donughtData = res.Result
            this.createDoughnutChart()
             })
    
  }
  
  getBarData(){
    this.loading = true;
    this.http.get('https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypesTime').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching dashboard data:', error);
        return this.mockDataService.getMockDashboardHeaderData();
      }),
      finalize(() => {
        
      })
    ).subscribe((res:any)=>{
      this.barData = res.Result;
      
      this.progressBars=this.barData.Labels.map((label:string,index:number)=>{
        let percentageP1:number= Math.abs(this.barData.DataReports[0].Data[index]/this.barData.DataReports[0].Data[index]+this.barData.DataReports[1].Data[index] *100)
        let percentageP2:number=  Math.abs(this.barData.DataReports[0].Data[index]/this.barData.DataReports[0].Data[index]+this.barData.DataReports[1].Data[index]*100)
        let progressbar={
          title: label,
          count: this.barData.DataReports[0].Data[index]+this.barData.DataReports[1].Data[index],
          p1: { color: '#c00000', count: this.barData.DataReports[0].Data[index],percentage:percentageP1 },
          p2: { color: '#bd9f57', count: this.barData.DataReports[1].Data[index],percentage:percentageP2 },
        }
        return progressbar
      })
      
      this.loading = false;
    })
    
  }
  getpercentage(count:number,total:number){
    let percentage = (count/total *100)
      return percentage+'%';
  }
}

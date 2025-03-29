import { Component, inject } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.css'
})
export class LeadershipComponent {
  dashboardService: DashboardService = inject(DashboardService);
  careData = {
    CasesCount: 0, 
    CompletedCasesCount: 0, 
    ApplierCount: 0, 
    CasesOnTime: 0.0, 
    CasesDelayed: 0.0
  };

  completedCasesPercentage = '0%';
  remainingCasesPercentage = '0%';
  casesOnTimePercentage = '0%';

  bookData = {
    totalbook: 205, 
    incomepercentage: '0%', 
    incomeValue: 0, 
    outgoingPercentage: '0%',
    outgoingValue:  0,
    interiorpercentage:'0%',
    interiorValue:0,
    onTimePercentage:'0%',
    delayedPercentage:'0%',
    onTime:0,
    delayed:0
  };
  resourcesData = {
    totalresource: 1049, 
    specializationpercentage: 0.534, 
    specializationValue: 0, 
    radioPercentage: 0,
    radioValue:  0,
  };

  constructor() {
    this.dashboardService.getHeaderStatistics().then((list: any) => {
      if (list.Result)
      {
        this.careData = list.Result;
        this.completedCasesPercentage = Math.round(this.careData.CompletedCasesCount / this.careData.CasesCount * 100).toString() + '%';
        this.remainingCasesPercentage = Math.round((this.careData.CasesCount - this.careData.CompletedCasesCount) / this.careData.CasesCount * 100).toString() + '%';
        this.casesOnTimePercentage = (this.careData.CasesOnTime * 100).toString() + '%';
      }
    });

    this.dashboardService.getIncoming().then((incoming: any) => {
      this.dashboardService.getOutgoing().then((outgoing: any) => {
        this.dashboardService.getInternal().then((internal: any) => {
                
          this.bookData.totalbook = 0;
          this.bookData.incomeValue = 0;
          this.bookData.outgoingValue = 0;
          this.bookData.interiorValue = 0;

          incoming.dataReports.forEach((income: any,index:any) => {
            income.data.forEach((incomeData:any)=>{
              this.bookData.totalbook += incomeData;
              this.bookData.incomeValue += incomeData;
              if (index == 0) {
                this.bookData.onTime += incomeData;
              } else {
                this.bookData.delayed += incomeData;
              }
            })
          });

          outgoing.dataReports.forEach((outgo: any,index:any) => {
            outgo.data.forEach((outgoData:any)=>{
              this.bookData.totalbook += outgoData;
              this.bookData.outgoingValue += outgoData;
              if (index == 0) {
                this.bookData.onTime += outgoData;
              } else {
                this.bookData.delayed += outgoData;
              }
            })
          });

          internal.dataReports.forEach((intern: any,index:any) => {
            intern.data.forEach((internData:any)=>{
              this.bookData.totalbook += internData;
              this.bookData.interiorValue += internData;
              if (index == 0) {
                this.bookData.onTime += internData;
              } else {
                this.bookData.delayed += internData;
              }
            })
          });
          
          
          this.bookData.incomepercentage = Math.round(this.bookData.incomeValue / this.bookData.totalbook * 100).toString() + '%';  
          this.bookData.outgoingPercentage = Math.round(this.bookData.outgoingValue / this.bookData.totalbook * 100).toString() + '%';  
          this.bookData.interiorpercentage = Math.round(this.bookData.interiorValue / this.bookData.totalbook * 100).toString() + '%';  

          this.bookData.delayedPercentage = Math.round(this.bookData.delayed / this.bookData.totalbook * 100).toString() + '%';  
          this.bookData.onTimePercentage = Math.round(this.bookData.onTime / this.bookData.totalbook * 100).toString() + '%';                      

        });
      });
    });
    
    


    
    
    this.calculateresource();
  }

  calculateresource() {
    this.resourcesData.specializationValue = Math.round(this.resourcesData.totalresource * this.resourcesData.specializationpercentage); 
    this.resourcesData.radioPercentage = 1 - this.resourcesData.specializationValue; 
    this.resourcesData.radioValue = this.resourcesData.totalresource -this.resourcesData.specializationValue;
  }
}

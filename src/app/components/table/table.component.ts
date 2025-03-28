import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  careDetails :any;
  total:any;
  onTime!:string;
  typeId!:number;
  dataIsLoaded:boolean=false;
  onTimeValue:string = 'متأخره'
  constructor(private router: ActivatedRoute,private http:HttpClient) {
    // this.careDetails = this.router.
  }
  ngOnInit() {
    this.router.paramMap.subscribe((event: any) => {
      console.log(event.params)
      this.typeId=event.params.TypeId
      this.onTime=event.params.OnTime
      this.onTimeValue = this.onTime === 'true' ? "علي الوقت":"متأخره"
      this.total=event.params.Total
      let query ={TypeId:this.typeId,OnTime:this.onTime}
      this.getDetails(query)
    });
  }
  getDetails(queryParams:any){
    this.http.get(" https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/RequestTypeDetails",{params:queryParams}).subscribe((res:any)=>{
      this.careDetails= res.Result
      this.dataIsLoaded = true
    })
  }
}

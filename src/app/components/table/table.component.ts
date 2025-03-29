import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  careDetails: any;
  total: any;
  onTime!: string;
  typeId!: number;
  src: any;
  dataIsLoaded: boolean = false;
  onTimeValue: string = 'متأخره';
  constructor(private router: ActivatedRoute, private http: HttpClient) {
    // this.careDetails = this.router.
  }
  ngOnInit() {
    this.router.paramMap.subscribe((event: any) => {
      this.src = event.params.src;
      /// from bar chart
      if (this.src == 1) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'علي الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = { TypeId: this.typeId, OnTime: this.onTime };
        this.getDetails(
          'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/RequestTypeDetails',
          query
        );
      }
      //// from progress bars
      if (this.src == 2) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'علي الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = { HardshipTypeId: this.typeId, OnTime: this.onTime };
        this.getDetails(
          'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypeDetails',
          query
        );
      }
      //// from progress bar and dounght child of hardship
      if (this.src == 3) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'علي الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = {
          HardshipTypeId: event.params.parentIndex,
          OnTime: this.onTime,
          Status: this.typeId,
        };
        this.getDetails(
          'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/HardshipTypeStatusDetails',
          query
        );
      }
      //// from line chart in gharm
      if (this.src == 4) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'علي الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = {
          TypeId: event.params.parentIndex,
          OnTime: this.onTime,
          Status: Number(this.typeId) + 1,
        };
        this.getDetails(
          'https://quilled-autumn-move.glitch.me/api-gateway-odoo/api/Dashboard/RequestTypeStatusDetails',
          query
        );
      }
    });
  }
  getDetails(apiPath: string, queryParams: any) {
    this.http.get(apiPath, { params: queryParams }).subscribe((res: any) => {
      this.careDetails = res.Result;
      this.dataIsLoaded = true;
    });
  }
}

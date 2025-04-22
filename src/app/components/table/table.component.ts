import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../../environment';
import { DashboardService } from '../../services/dashboard.service';

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
  label: any;
  dataIsLoaded: boolean = false;
  onTimeValue: string = 'متأخره';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  private baseUrl = environment.baseUrl;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private dashService: DashboardService
  ) {
    // this.careDetails = this.router.
  }
  ngOnInit() {
    this.dashService.filteValue.subscribe((res) => {
      this.careDetails.filteredData = this.careDetails.Data.filter((obj: any) =>
        Object.values(obj).some((val) =>
          String(val).toLowerCase().includes(res)
        )
      );
    });
    this.router.paramMap.subscribe((event: any) => {
      this.src = event.params.src;
      /// from bar chart
      if (this.src == 1) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'على الوقت' : 'متأخره';
        this.total = event.params.Total;
        this.label = event.params.Label;
        let query = { TypeId: this.typeId, OnTime: this.onTime };
        this.getDetails(
          this.baseUrl + '/api-gateway-odoo/api/Dashboard/RequestTypeDetails',
          query
        );
      }
      //// from progress bars
      if (this.src == 2) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'على الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = { HardshipTypeId: this.typeId, OnTime: this.onTime };
        this.getDetails(
          this.baseUrl + '/api-gateway-odoo/api/Dashboard/HardshipTypeDetails',
          query
        );
      }
      //// from progress bar and dounght child of hardship
      if (this.src == 3) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'على الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = {
          HardshipTypeId: event.params.parentIndex,
          OnTime: this.onTime,
          Status: this.typeId,
        };
        this.getDetails(
          this.baseUrl +
            '/api-gateway-odoo/api/Dashboard/HardshipTypeStatusDetails',
          query
        );
      }
      //// from line chart in gharm
      if (this.src == 4) {
        this.typeId = event.params.TypeId;
        this.onTime = event.params.OnTime;
        this.onTimeValue = this.onTime === 'true' ? 'على الوقت' : 'متأخره';
        this.total = event.params.Total;
        let query = {
          TypeId: event.params.parentIndex,
          OnTime: this.onTime,
          Status: Number(this.typeId) + 1,
        };
        this.getDetails(
          this.baseUrl +
            '/api-gateway-odoo/api/Dashboard/RequestTypeStatusDetails',
          query
        );
      }
    });
  }
  getDetails(apiPath: string, queryParams: any) {
    this.http.get(apiPath, { params: queryParams }).subscribe((res: any) => {
      this.careDetails = res.Result;
      this.careDetails.filteredData = res.Result.Data;
      this.sortTable('ApplyingDate');
      this.dataIsLoaded = true;
    });
  }

  // ##########  Sorting   #############
  sortTable(columnName: string) {
    if (this.sortColumn === columnName) {
    } else {
      this.sortColumn = columnName;
    }
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    const direction = this.sortDirection === 'asc' ? 1 : -1;

    this.careDetails.Data.sort((a: any, b: any) => {
      const aValue = a[columnName];
      const bValue = b[columnName];

      if (!isNaN(aValue) && !isNaN(bValue)) {
        return (aValue - bValue) * direction;
      }

      return (
        aValue.toString().localeCompare(bValue.toString(), 'ar') * direction
      );
    });
  }
}

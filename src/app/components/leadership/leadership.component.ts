import { Component } from '@angular/core';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.css'
})
export class LeadershipComponent {
  careData = {
    totalcare: 205, 
    percentage: 0.88, 
    calculatedValue: 0, 
    remainingPercentage: 0,
    remainingValue:  0,
  };

  bookData = {
    totalbook: 205, 
    incomepercentage: 0.498, 
    incomeValue: 0, 
    outgoingPercentage: 0.22,
    outgoingValue:  0,
    interiorpercentage:0,
    interiorValue:0
  };
  resourcesData = {
    totalresource: 1049, 
    specializationpercentage: 0.534, 
    specializationValue: 0, 
    radioPercentage: 0,
    radioValue:  0,
  };

  constructor() {
    this.calculatecare(); 
    this.calculatebook();
    this.calculateresource();
  }

  calculatecare() {
    this.careData.calculatedValue = Math.round(this.careData.totalcare * this.careData.percentage); // 180
    this.careData.remainingPercentage = 1 - this.careData.percentage; // 0.13
    this.careData.remainingValue = this.careData.totalcare - this.careData.calculatedValue; // 25
  }
  calculatebook() {
    this.bookData.incomeValue = Math.round(this.bookData.totalbook * this.bookData.incomepercentage); 
    this.bookData.outgoingValue = Math.round(this.bookData.totalbook * this.bookData.outgoingPercentage);
    this.bookData.interiorpercentage = 1 - this.bookData.incomepercentage - this.bookData.outgoingPercentage; 
    this.bookData.interiorValue = Math.round(this.bookData.totalbook *this.bookData.interiorpercentage);
  }
  calculateresource() {
    this.resourcesData.specializationValue = Math.round(this.resourcesData.totalresource * this.resourcesData.specializationpercentage); 
    this.resourcesData.radioPercentage = 1 - this.resourcesData.specializationValue; 
    this.resourcesData.radioValue = this.resourcesData.totalresource -this.resourcesData.specializationValue;
  }
}

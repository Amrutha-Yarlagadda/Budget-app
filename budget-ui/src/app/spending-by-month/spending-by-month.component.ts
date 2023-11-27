import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SpendByCategory } from '../models';

@Component({
  selector: 'app-spending-by-month',
  templateUrl: './spending-by-month.component.html',
  styleUrls: ['./spending-by-month.component.scss']
})
export class SpendingByMonthComponent implements OnInit {
  data : any
  options: any;
  public spendingByCategory: SpendByCategory[] = []
  colorCodes = [
    "#808080",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#008080",
    "#0000FF",
    "#000080",
    "#FF00FF",
    "#800080",
    "#000000",
    "#FF0000",
    "#800000",
    "#FFFF00",
    "#808000",
    ]

    currentDate: Date = new Date()
  constructor(private apiService: ApiService) {
   }
  ngOnInit() {
    this.apiService.getTransactionsByCategory(this.currentDate.getMonth() + 1, this.currentDate.getFullYear())
    .subscribe((res: SpendByCategory[])=> {
    this.spendingByCategory = res

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = "blue";
      this.data = {
          labels: this.spendingByCategory.map(value => value.categoryId),
          datasets: [
              {
                  data: this.spendingByCategory.map(value => value.amount),
                  backgroundColor: this.colorCodes.splice(this.spendingByCategory.length),
                  hoverBackgroundColor: this.colorCodes.splice(this.spendingByCategory.length)
              }
          ]
      };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };
    });
  }



}

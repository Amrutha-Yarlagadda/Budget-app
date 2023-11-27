import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Category, SpendingByMonth } from '../models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-month-by-month',
  templateUrl: './month-by-month.component.html',
  styleUrls: ['./month-by-month.component.scss']
})
export class MonthByMonthComponent  implements OnInit {
  data: any;
  public spendingByMonth: SpendingByMonth[] = []

  options: any;


  constructor(private apiService: ApiService) {

  }


  ngOnInit() {
    this.apiService.getSpendingByMonth()
    .subscribe((res: SpendingByMonth[])=> {
    this.spendingByMonth = res
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      console.log(this.spendingByMonth.map(value => value))
      this.data = {
          labels: this.spendingByMonth.map(value => value.month),
          datasets: [
              {
                  label: 'Spent',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: this.spendingByMonth.map(value => value.amount)
              },
              {
                  label: 'Budget',
                  backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                  borderColor: documentStyle.getPropertyValue('--pink-500'),
                  data:  this.spendingByMonth.map(value => value.limit)
              }
          ]
      };
      console.log(this.data)

      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }

          }
      };
    })
  }
}

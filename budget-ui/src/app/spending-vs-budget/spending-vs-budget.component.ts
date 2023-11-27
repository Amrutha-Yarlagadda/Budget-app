import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SpendByCategory } from '../models';

@Component({
  selector: 'app-spending-vs-budget',
  templateUrl: './spending-vs-budget.component.html',
  styleUrls: ['./spending-vs-budget.component.scss']
})
export class SpendingVsBudgetComponent implements OnInit {
  data: any;

  options: any;
  currentDate: Date = new Date()
  public spendingByCategory: SpendByCategory[] = []
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getTransactionsByCategory(this.currentDate.getMonth() + 1, this.currentDate.getFullYear())
      .subscribe((res: SpendByCategory[]) => {
        this.spendingByCategory = res
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
          labels: this.spendingByCategory.map(value => value.categoryId),
          datasets: [
            {
              label: 'Spent',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: this.spendingByCategory.map(value => value.amount)
            },
            {
              label: 'Budget Limit',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: this.spendingByCategory.map(value => value.limit)
            }
          ]
        };

        this.options = {
          indexAxis: 'y',
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


import { Component } from '@angular/core';
import { Transaction } from '../models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions!: Transaction[];

  constructor(private apiService: ApiService) {
    this.apiService.getTransactions("2023-01-01", "2023-12-12")
    .subscribe((res: Transaction[])=> {
    this.transactions = res
    });
   }


}

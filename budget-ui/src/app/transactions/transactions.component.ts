import { Component } from '@angular/core';
import { Transaction } from '../models';
import { ApiService } from '../api.service';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from '../utils';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions!: Transaction[];
  ref: DynamicDialogRef | undefined;

  constructor(private apiService: ApiService, private dialogService: DialogService) {
    this.apiService.getTransactions("2023-01-01", Utils.toDateString(new Date()))
    .subscribe((res: Transaction[])=> {
    this.transactions = res
    });
  }


  addTransaction() {
    this.ref = this.dialogService.open(AddTransactionComponent, { header: 'Add New Transaction'});
    this.ref.onClose.subscribe((product: FormData) => {
        this.apiService.getTransactions("2023-01-01", Utils.toDateString(new Date()))
        .subscribe((res: Transaction[])=> {
        this.transactions = res
        });
  });
  }

  addCategory() {
    this.ref = this.dialogService.open(AddCategoryComponent, { header: 'Add New Category'});
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    if (dateRangeStart.value && dateRangeEnd.value) {
      this.apiService.getTransactions(Utils.toDateString(new Date(dateRangeStart.value)), Utils.toDateString(new Date(dateRangeEnd.value)))
      .subscribe((res: Transaction[])=> {
      this.transactions = res
      });}

  }
}

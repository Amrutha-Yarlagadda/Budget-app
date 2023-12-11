import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Category, ServerResponse } from '../models';
import { Utils } from '../utils';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  public isSuccess = false
  public message = ""
  public requestDone = false
  title = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);

  categories: Category[] = []
  constructor(private apiService: ApiService, private dialogService: DialogService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.apiService.getCategories().subscribe(response =>
      this.categories = response
    )
  }

  form: FormGroup = new FormGroup({
    title: this.title,
    date: this.date,
    amount: this.amount,
    category: this.category
  })

  submit() {
    if (this.form.valid) {
      let transaction = {
        "title": this.form.value.title,
        "amount": this.form.value.amount,
        "categoryId": this.form.value.category,
        "createdDate": Utils.toDateString(new Date(this.form.value.date))
      }
      this.apiService.addTransaction(transaction).subscribe((res: ServerResponse) => {
        this.requestDone = true
        this.isSuccess = res.success;
        this.message = res.message;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        if (this.isSuccess) {
          this.apiService.getCategories().subscribe(response =>
            this.categories = response
          )
          this.dialogService.dialogComponentRefMap.forEach(dialog => {
            dialog.destroy();
          });
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
          this.isSuccess = false;
          this.requestDone = true
          this.message = error.error;
        })
    }
  }

  getErrorMessage(valueToCheck: FormControl) {
    if (valueToCheck.hasError('required')) {
      return 'You must enter a value';
    }

    return valueToCheck.hasError('email') ? 'Not a valid email' : '';
  }
}


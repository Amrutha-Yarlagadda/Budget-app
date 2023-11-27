import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Category, ServerResponse } from '../models';
import { Utils } from '../utils';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  public isSuccess = false
  public message = ""
  public requestDone = false
  constructor(private apiService: ApiService, private dialogService: DialogService) {}

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    limit: new FormControl(''),
})

submit() {
  if (this.form.valid) {
  }
    this.apiService.addCategory(this.form.value).subscribe((res: ServerResponse)=> {

      this.requestDone = true
      this.isSuccess = res.success;
      this.message = res.message;
      if (this.isSuccess) {
        this.dialogService.dialogComponentRefMap.forEach(dialog => {
          dialog.destroy();
        });
      }
    },
    error => {
      this.isSuccess = false;
      this.requestDone = true
      this.message = error.error;
    })
  }

}

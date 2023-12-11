import { Component, OnInit } from '@angular/core';
import { Category } from '../models';
import { ApiService } from '../api.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-configurebudget',
  templateUrl: './configurebudget.component.html',
  styleUrls: ['./configurebudget.component.scss']
})
export class ConfigureBudgetComponent implements OnInit {
  categories: Category[] = []
  ref: DynamicDialogRef | undefined;
  constructor(private apiService: ApiService, private dialogService: DialogService) {
    this.apiService.getCategories().subscribe(response =>
      this.categories = response
    )
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe(response =>
      this.categories = response
    )
  }

  onRowEditInit(category: Category) {
    console.log(category)
  }

  onRowEditSave(category: Category) {
    this.apiService.updateCategory(category).subscribe(res => console.log(res))
  }

  onRowEditCancel(category: Category, index: Number) {
    console.log(category)
    console.log(index)

  }

  addCategory() {
    this.ref = this.dialogService.open(AddCategoryComponent, { header: 'Add New Category' });
    this.ref.onClose.subscribe((product) => {
      this.apiService.getCategories().subscribe(response =>
        this.categories = response
      )
    });

    this.ref.onDestroy.subscribe((product) => {
      this.apiService.getCategories().subscribe(response =>
        this.categories = response
      )
    });
  }
}

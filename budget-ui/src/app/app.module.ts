import { ErrorHandler, NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/LoginComponent';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {
  MatCardModule,
} from '@angular/material/card';
import {
  MatInputModule,
} from '@angular/material/input';
import {
  MatButtonModule,
} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatListModule} from '@angular/material/list';
import { TransactionsComponent } from './transactions/transactions.component';
import { MonthByMonthComponent } from './month-by-month/month-by-month.component';
import { SpendingByMonthComponent } from './spending-by-month/spending-by-month.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ErrorHandlerService } from './error-handler.service';
import { MenubarModule } from 'primeng/menubar';
import { ArticleComponent } from './article/article.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import {VERSION as MAT_VERSION, MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatSelectModule } from '@angular/material/select';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SpendingVsBudgetComponent } from './spending-vs-budget/spending-vs-budget.component';
import { ConfigureBudgetComponent } from './configurebudget/configurebudget.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TokenRefreshComponent } from './token-refresh/token-refresh.component';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    LogoutComponent,
    HomepageComponent,
    TransactionsComponent,
    MonthByMonthComponent,
    SpendingByMonthComponent,
    ArticleComponent,
    AddTransactionComponent,
    AddCategoryComponent,
    SpendingVsBudgetComponent,
    ConfigureBudgetComponent,
    TokenRefreshComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatListModule,
    ChartModule,
    TableModule,
    MenubarModule,
    DynamicDialogModule,
    ButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    ConfirmDialogModule,
    FieldsetModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    DialogService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

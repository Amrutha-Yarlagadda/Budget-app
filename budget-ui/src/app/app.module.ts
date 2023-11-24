import { NgModule } from '@angular/core';
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
    SpendingByMonthComponent
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
        TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

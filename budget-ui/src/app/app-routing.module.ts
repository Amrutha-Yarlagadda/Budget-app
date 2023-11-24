import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/LoginComponent';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MonthByMonthComponent } from './month-by-month/month-by-month.component';
import { SpendingByMonthComponent } from './spending-by-month/spending-by-month.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent,
    children : [
    { path: '', redirectTo: 'transactions', pathMatch: 'full' },
    { path: 'transactions', component: TransactionsComponent},
    { path: 'month-by-month', component: MonthByMonthComponent },
    { path: 'spending-by-month', component: SpendingByMonthComponent}
  ] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

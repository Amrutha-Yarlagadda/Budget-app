import { Injectable } from '@angular/core';
import { Category, ServerResponse, SpendByCategory, SpendingByMonth, Transaction } from './models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private loginService: LoginService) {
  }

  private getBearerHeader() : HttpHeaders | {
    [header: string]: string | string[];
} {
    return {'Authorization': `Bearer ${this.loginService.getToken()}`}
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Transaction[]>('/api/categories', {
       headers: this.getBearerHeader()
    }).pipe(map((res: any) => {
        return res.categories
      }))
  }

  addCategory(category: Category): Observable<ServerResponse> {
    return this.http.post<ServerResponse>('/api/category', category, {
       headers: this.getBearerHeader()
    })
  }

  updateCategory(category: Category): Observable<ServerResponse> {
    return this.http.put<ServerResponse>('/api/category', category, {
       headers: this.getBearerHeader()
    })
  }


  addTransaction(transaction: Transaction): Observable<ServerResponse> {
    return this.http.post<ServerResponse>('/api/transaction', transaction, {
       headers: this.getBearerHeader()
    })
  }

  getTransactions(start: string, end: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions', {
       headers: this.getBearerHeader(),
       params: new HttpParams().set("startDate", start).set("endDate", end)
    }).pipe(map((res: any) => {
        return res.transactions
      }))
  }

  getTransactionsByCategory(month: number, year: number): Observable<SpendByCategory[]> {
    return this.http.get<SpendByCategory[]>('/api/spendingByCategory', {
      headers: this.getBearerHeader(),
       params: new HttpParams().set("month", month).set("year", year)
    }) .pipe(map((res: any) => {
        return res.spendingByCategory
      }))
  }

  getSpendingByMonth(): Observable<SpendingByMonth[]> {
    return this.http.get<SpendingByMonth[]>('/api/budgetByMonth', {
      headers: this.getBearerHeader(),
    }) .pipe(map((res: any) => {
        return res.spendingByCategory
      }))
  }
}

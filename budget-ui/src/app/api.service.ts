import { Injectable } from '@angular/core';
import { ServerResponse, Transaction } from './models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public signUpUrl = "/api/bu"

  constructor(private http: HttpClient) {
  }


  getTransactions(start: string, end: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions', {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
       params: new HttpParams().set("startDate", start).set("endDate", end)
    }) .pipe(
        catchError(Utils.handleError)
      ).pipe(map((res: any) => {
        return res.transactions
      }))
  }

  getTransactionsByCategory(month: number, year: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/spendingByMonth', {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
       params: new HttpParams().set("month", month).set("year", year)
    }) .pipe(
        catchError(Utils.handleError)
      ).pipe(map((res: any) => {
        return res.body.transactions
      }))
  }
}

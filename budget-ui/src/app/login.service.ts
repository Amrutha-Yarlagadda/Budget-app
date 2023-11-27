import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoginRequest, ServerResponse } from './models';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly  loggedInState = new BehaviorSubject<boolean>(this.isLoggedIn());
    public endpoint = "/api/login"
  constructor(private http: HttpClient) {}

  login(req: LoginRequest): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.endpoint, req );
    }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false
  }

  isLoggedInObs(): Observable<boolean> {
    return this.loggedInState
  }

  getToken(): string | null{
     return localStorage.getItem('token')
  }

  checkLoggedInObs() {
    this.loggedInState.next(this.isLoggedIn());
  }
}

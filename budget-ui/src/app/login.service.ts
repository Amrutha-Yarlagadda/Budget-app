import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoginRequest, ServerResponse } from './models';
import { ErrorHandlerService } from './error-handler.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly  loggedInState = new BehaviorSubject<boolean>(this.isLoggedIn());
  private readonly  tokenState = new BehaviorSubject<string | null>(this.getToken());

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

  checkLoggedInObs(token: string | null) {
    if (token == null) {
      localStorage.removeItem("token")
    } else {
      localStorage.setItem("token", token)
    }
    this.tokenState.next(this.getToken());
    this.loggedInState.next(this.isLoggedIn());
  }


  getTokenObs(): Observable<string | null> {
    return this.tokenState
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}

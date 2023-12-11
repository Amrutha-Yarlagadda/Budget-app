import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoginRequest, ServerResponse } from './models';
import { ErrorHandlerService } from './error-handler.service';
import jwt_decode from "jwt-decode";

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

  refreshToken(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>( "/api/refreshToken", {
      headers: this.getBearerHeader()
   });
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false
  }

  isLoggedInObs(): Observable<boolean> {
    return this.loggedInState
  }
  private getBearerHeader() : HttpHeaders | {
    [header: string]: string | string[];
} {
    return {'Authorization': `Bearer ${this.getToken()}`}
  }

  getToken(): string | null {
     let token =  localStorage.getItem('token')
     if (token !=null) {
      let d = new Date().toUTCString();
      let currentTime =new Date(d).getTime()/1000
      let tokenExpiry = this.getDecodedAccessToken(token).exp
      let tokenTimeout = tokenExpiry - currentTime

      if (tokenTimeout > 0) {
        return token
      } else {
        return null
      }
    } else {
      return null
    }

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
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}

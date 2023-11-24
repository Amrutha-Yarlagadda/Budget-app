import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoginRequest, ServerResponse } from './models';
import { Utils } from './utils';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public endpoint = "/api/login"
  constructor(private http: HttpClient) {
  }

  login(req: LoginRequest): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.endpoint, req )
      .pipe(
        catchError(Utils.handleError)
      );
    }

}

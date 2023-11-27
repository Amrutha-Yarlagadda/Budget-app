import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { ServerResponse, User } from './models';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  public signUpUrl = "/api/signup"
  constructor(private http: HttpClient){}

  signUp(user: User): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.signUpUrl, user );
  }

}

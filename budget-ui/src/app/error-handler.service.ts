import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      const router = this.injector.get(Router);
      console.log(router)
      let isLoginPage = router.url == 'login'
      console.log(router.url)
      console.log(error)
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error);
      } else if (!isLoginPage && error.status == 401) {
        localStorage.removeItem('token')
        router.navigate(['login']);
      }  else if (error.status == 409) {
        return throwError(() => new Error(error.error));
      }
      else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

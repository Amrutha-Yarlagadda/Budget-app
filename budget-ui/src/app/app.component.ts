import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { LoginService } from './login.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { delay, of, timeout } from 'rxjs';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ServerResponse } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [ ConfirmationService]
})
export class AppComponent implements OnInit {
  title = 'budget-ui';
 constructor(private confirmationService: ConfirmationService, private loginService: LoginService,  private router: Router,  private dialogService: DialogService) {


  }
  ngOnInit(): void {
    this.loginService.getTokenObs().subscribe(token => {
      if (token !=null) {
        let d = new Date().toUTCString();
        let currentTime =new Date(d).getTime()/1000
        let tokenExpiry = this.loginService.getDecodedAccessToken(token).exp
        let tokenTimeout = tokenExpiry - currentTime
        if (tokenTimeout > 0) {
          if (tokenTimeout > 40) {
            tokenTimeout = 40
          }
          of("refresh").pipe(delay(tokenTimeout*1000)).subscribe(x => {
            this.extendTokenValidity()
          })
        } else {
          this.router.navigate(['login']);
        }
      }
    })
  }

  extendTokenValidity() {
   // this.ref = this.dialogService.open(AddTransactionComponent, { header: 'Add New Transaction'});
   this.confirmationService.confirm({
    message: 'Your token expires in 20 seconds, do you want refresh it?',
    accept: () => {
      this.loginService.refreshToken().subscribe((res: ServerResponse) => {
        if (res.success) {
          this.loginService.checkLoggedInObs(res.body.token)
          this.router.navigate(['dashboard']);
        }
      });
    },
    reject: () => {
      console.log('Dialog closed');
    }
});
  }
}

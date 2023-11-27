import { Component } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { LoginService } from './login.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budget-ui';
  constructor(private confirmationService: ConfirmationService, private loginService: LoginService,  private router: Router) {

      this.loginService.getTokenObs().subscribe(token => {
        if (token !=null) {
          let currentTime = new Date().getTime()/1000
          let tokenExpiry = this.loginService.getDecodedAccessToken(token).exp
          let tokenTimeout = currentTime - tokenExpiry
          if (tokenTimeout > 0) {
            setTimeout(this.extendTokenValidity, tokenTimeout*1000)
          } else {
            this.router.navigate(['login']);
          }
        }
      })
  }

  extendTokenValidity() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log("accept")
        },
        reject: (type: any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                  console.log("REJECT")
                  break;
                case ConfirmEventType.CANCEL:
                  console.log("CANCEL")
                    break;
            }
        }
    });
  }
}

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerResponse } from '../models';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() submitEM = new EventEmitter();

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password
  });

  public isSuccess = false;
  public message = "";
  public requestDone = false;

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['dashboard']);
      } else {
        this.loginService.checkLoggedInObs(null)
      }
    }
  submit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe((res: ServerResponse) => {
        this.requestDone = true;
        this.isSuccess = res.success;
        this.message = res.message;
        if (res.success) {
          this.loginService.checkLoggedInObs(res.body.token)
          this.router.navigate(['dashboard']);
        }
      },

      error => {
        this.requestDone = true
        this.isSuccess = error?.error?.success;
        this.message = error?.error?.message;
      });
    }
  }

  getErrorMessage(valueToCheck: FormControl) {
    if (valueToCheck.hasError('required')) {
      return 'You must enter a value';
    }

    return valueToCheck.hasError('email') ? 'Not a valid email' : '';
  }

}

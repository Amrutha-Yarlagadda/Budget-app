import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
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
      });
    }
  }

}

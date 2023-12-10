import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ServerResponse } from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  });

  public isSuccess = false
  public message = ""
  public requestDone = false

  constructor(private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router ) {}

    ngOnInit(): void {
      if (localStorage.getItem("token")) {
        this.router.navigate(['dashboard']);
      }
    }

  submit() {
    if (this.form.valid) {
      this.signupService.signUp(this.form.value).subscribe((res: ServerResponse)=> {
        this.requestDone = true
        this.isSuccess = res.success;
        this.message = res.message;
        if (res.success) {
          this.router.navigate(['login']);
        }
      },
      error => {
        this.requestDone = true
        this.isSuccess = error?.error?.success;
        this.message = error?.error?.message;
      })
    }
  }

  getErrorMessage(valueToCheck: FormControl) {
    if (valueToCheck.hasError('required')) {
      return 'You must enter a value';
    }

    return valueToCheck.hasError('email') ? 'Not a valid email' : '';
  }
}

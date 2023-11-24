import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
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
      })
    }
  }
}

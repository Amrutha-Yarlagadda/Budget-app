import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false
  constructor(private loginService: LoginService) {
    this.isLoggedIn = this.loginService.isLoggedIn()
    this.loginService.isLoggedInObs().subscribe(loggedInState => {
      console.log(loggedInState)
       this.isLoggedIn = loggedInState
    })
  }

}

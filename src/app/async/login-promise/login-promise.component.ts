import { Component, OnInit } from '@angular/core';
import { AuthPromiseService } from '../auth-promise.service';

@Component({
  selector: 'app-login-promise',
  template: `
  <a>
    <span *ngIf="needsLogin">Login</span>
    <span *ngIf="!needsLogin">Logout</span>
  </a>
`
})
export class LoginPromiseComponent implements OnInit {

  needsLogin: boolean = true;

  constructor(private auth: AuthPromiseService) {
  }

  ngOnInit() {
    this.auth.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    })
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-not-permission',
  templateUrl: './not-permission.component.html',
  styleUrls: ['./not-permission.component.scss']
})
export class NotPermissionComponent {

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  isAnonymous: boolean;

  constructor(
    // private usersService: AuthService
  ) { }

  async onLogout() {
    // const returnUrl = await this.usersService.logOff().toPromise()
    // window.location.href = returnUrl ? returnUrl : environment.loginUrl;
  }
}

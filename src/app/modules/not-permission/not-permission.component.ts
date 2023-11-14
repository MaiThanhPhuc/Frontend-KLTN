import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    private usersService: AuthService
  ) { }

  onLogout() {
    this.usersService.logout()
  }
}

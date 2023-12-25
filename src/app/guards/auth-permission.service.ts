import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { SecurityHelper } from '../modules/common/helper/securityHelper';
import { ToastService } from '../modules/common/toast/toast.service';
import { AuthService } from '../services/auth.service';
import { LocalStorage } from '../modules/common/helper/localStorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '../constants';
@Injectable()
export class AuthPermissionService implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private localStorage: LocalStorage) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(route.data.expectedPermission);
    if (this.authService.isLoggedIn() && !this.authService.isExpiredToken()) {
      if (this.checkPermission(route.data.expectedPermission)) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }
    this.router.navigate(['/login']);
    return Promise.resolve(false);
  }
  isAdmin(): boolean {
    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      if (decodeToken.role === Constants.AdminRole.id) return true
    }
    return false;
  }

  isManager(): boolean {
    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      if (decodeToken.role === Constants.ManagerRole.id) return true
    }
    return false;
  }

  isHumanResource(): boolean {
    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      if (decodeToken.role === Constants.HrRole.id) return true
    }
    return false;
  }
  checkPermission(expectedPermissions: string): boolean {

    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const role = this.getRoleValue()
      const expectedPermission = Constants.EmployeePermission.find(role => role.text === expectedPermissions)?.id || -1

      if (role === Constants.AdminRole.id) return true;
      console.log(expectedPermission);
      console.log(role);
      if (role && (expectedPermission >= role)) {
        return true
      }
      this.router.navigate(['/not-permission']);
      ToastService.error('Are you sure have permission to access page?', "bottom", "center");
      return false;
    }
    // Navigate to the login page with extras
    this.router.navigate(['/not-permission']);
    ToastService.error('Are you sure have permission to access page?', "bottom", "center");
    return false;
  }

  getRoleValue(value?: number): number {
    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      return Constants.EmployeePermission.find(role => role.id === decodeToken.role)?.id
    }
    return -1;
  }
}

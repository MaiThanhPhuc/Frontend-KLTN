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

  // canLoad(route: Route): Promise<boolean> {
  //   const url = `/${route.path}`;
  //   return this.checkPermission(url);
  // }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      if (this.checkPermission(state.url)) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }
    this.router.navigate(['/login']);
    return Promise.resolve(false);
  }

  checkPermission(url: any): boolean {
    const token = this.localStorage.getStore('accessToken');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      const page = url.toString().substr(1)
      if (page.includes(Constants.AdminRole.text.toLowerCase()) && decodeToken.role !== Constants.AdminRole.id) {
        this.router.navigate(['/not-permission']);
        ToastService.error('Are you sure have permission to access page?', "bottom", "center");
        return false;
      }
      return true
    }
    // Navigate to the login page with extras
    this.router.navigate(['/not-permission']);
    ToastService.error('Are you sure have permission to access page?', "bottom", "center");
    return false;
  }
}

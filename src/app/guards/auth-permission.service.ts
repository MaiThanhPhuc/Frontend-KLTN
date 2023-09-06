import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { SecurityHelper } from '../modules/common/helper/securityHelper';
import { ToastService } from '../modules/common/toast/toast.service';

@Injectable()
export class AuthPermissionService implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) { }

  canLoad(route: Route): Promise<boolean> {
    const url = `/${route.path}`;
    return this.checkPermission(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = route.data;
    if (user) {
      const url: string = state.url;
      return this.checkPermission(url, user);
    }
    return this.canActivate(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = route.data;
    if (user) {
      const url: string = state.url;
      return this.checkPermission(url, user);
    }
    return this.canActivate(route, state);
  }

  async checkPermission(url?: string, data?: any): Promise<boolean> {

    if (!data.controller && !data.action) {
      return true;
    }

    if (data.controller && !data.action) {
        return true;
    }
    else if (data.controller && data.action) {
        return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/not-permission']);
    ToastService.error('Are you sure have permission to access page?');
    return false;
}
}

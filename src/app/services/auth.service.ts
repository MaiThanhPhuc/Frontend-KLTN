import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService extends BaseService {

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "auth/login", data);
  }

  public isLoggedIn(): boolean {
    return this.localStorage.getStore('accessToken') !== undefined;
  }

  isExpiredToken(): boolean {
    const token = this.localStorage.getStore('accessToken');
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  public logout() {
    localStorage.clear();
    window.location.href = "http://localhost:4200/login";
  }
}

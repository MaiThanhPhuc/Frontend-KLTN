import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService extends BaseService {

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "auth/login", data);
  }

  public isLoggedIn(): boolean {
    return this.localStorage.getStore('accessToken') !== undefined;
  }

  public logout() {
    this.localStorage.removeStore('userData');
    this.localStorage.removeStore('accessToken');
    this.router.navigate(['/login']);
  }
}

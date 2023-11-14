import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalService extends BaseService {

  private toggleIconSubject = new Subject<boolean>();
  toggleIconSubject$ = this.toggleIconSubject.asObservable();

  private isLoginSubject = new Subject<boolean>();
  isLoginSubject$ = this.isLoginSubject.asObservable();
  announceToggleIconClicked(forceExpand = false): void {
    this.toggleIconSubject.next(forceExpand);
  }
  announceIsLogin(isLogin = false): void {
    this.isLoginSubject.next(isLogin);
  }

}


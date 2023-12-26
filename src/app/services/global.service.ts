import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class GlobalService extends BaseService {

  private toggleIconSubject = new Subject<boolean>();
  toggleIconSubject$ = this.toggleIconSubject.asObservable();

  private reloadUserLeave = new Subject<boolean>();
  reloadUserLeave$ = this.reloadUserLeave.asObservable();

  private isLoginSubject = new Subject<boolean>();
  isLoginSubject$ = this.isLoginSubject.asObservable();
  announceToggleIconClicked(forceExpand = false): void {
    this.toggleIconSubject.next(forceExpand);
  }
  announceIsLogin(isLogin = false): void {
    this.isLoginSubject.next(isLogin);
  }

  announceReloadUserLeaveTable(isReload = false): void {
    this.reloadUserLeave.next(isReload);
  }

}


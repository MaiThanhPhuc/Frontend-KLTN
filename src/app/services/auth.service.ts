import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AtuhService extends BaseService {
  login(data: any): Observable<string> {
    return this.post("admin/addOffice", data);
  }
}


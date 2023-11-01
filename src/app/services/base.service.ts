/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import helper from 'qms-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { LocalStorage } from '../modules/common/helper/localStorage';

@Injectable()
export class BaseService {
  constructor(public http: HttpClient,
    // private localStorage: WindowLocalStorage
  ) {
  }

  private resolveBaseUrl(): string {
    return environment.apiUrl || "";
  }

  protected resolveHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Jwt token`);
    return headers;
  }

  private download(url: string): Observable<any> {
    const fullurl = url.startsWith('http') ? url : this.resolveBaseUrl() + url;
    const headers = this.resolveHeader();
    return this.http.get(fullurl, {
      headers: headers, responseType: 'arraybuffer'
    });
  }

  protected get(url: string, params: any = {},): Observable<any> {
    return this.http.get(this.resolveBaseUrl() + url, {
      headers: this.resolveHeader(), params: params
    });
  }

  protected post(url: string, data: any): Observable<any> {
    return this.http.post(this.resolveBaseUrl() + url, data, {
      headers: this.resolveHeader()
    });
  }

  protected put(url: string, data: any): Observable<any> {
    return this.http.put(this.resolveBaseUrl() + url, data, {
      headers: this.resolveHeader()
    });
  }

  protected delete(url: string): Observable<any> {
    return this.http.delete(this.resolveBaseUrl() + url, {
      headers: this.resolveHeader()
    });
  }

  // protected postFile(url: string, data: any): Observable<any> {
  //     return this.http.post(environment.api + url, data, {
  //         responseType: 'blob',
  //         headers: new HttpHeaders().append('Content-Type', 'application/json')
  //     });
  // }
}

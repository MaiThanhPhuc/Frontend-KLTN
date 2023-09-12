/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import helper from 'qms-js';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { LocalStorage } from '../modules/common/helper/localStorage';

@Injectable()
export class BaseService {
    constructor(public http: HttpClient,
      // private localStorage: LocalStorage
      ) {
    }

    public resolveBaseUrl(isSdsPortal?: boolean, isSdsPortalSecond?: boolean): string {

      return "Test";
    }

    protected resolveHeader(isSdsPortal?: boolean, headers?: HttpHeaders, isSdsPortalSecond?: boolean, isAdmin55Api?: boolean): HttpHeaders {
        if (!headers) {
            headers = new HttpHeaders();
        }
        //TODO: TRAP!!! don't uncomment! Will cause the dead of uploading file via formData
        // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        // headers = headers.set('accept', 'application/json');

        if (!isSdsPortal && !isSdsPortalSecond) {
            return headers;
        }

        // if (isSdsPortalSecond) {
        //     const token = this.localStorage.getStore('sdsPortalSecondToken');
        //     if (!token) {
        //         return headers;
        //     }
        //     headers = headers.set('Authorization', `Jwt ${token}`);
        //     return headers;
        // }

        // const token = isAdmin55Api ? this.localStorage.getStore('sdsPortalAdmin55Token') : this.localStorage.getStore('sdsPortalToken');
        // if (!token) {
        //     return headers;
        // }
        headers = headers.set('Authorization', `Jwt avc`);
        return headers;

    }

    public download(url: string, params: any = {}, isSdsPortal?: boolean): Observable<any> {
        const fullurl = url.startsWith('http') ? url : this.resolveBaseUrl(isSdsPortal) + url;
        const headers = this.resolveHeader(isSdsPortal);
        return this.http.get(fullurl, {
            headers: headers, responseType: 'arraybuffer'
        });
    }

    // protected get(url: string, params: any = {}, isSdsPortal?: boolean, headers?: HttpHeaders, isSdsPortalSecond?: boolean, isAdmin55Api?: boolean): Observable<any> {
    //     return this.http.get(this.resolveBaseUrl(isSdsPortal, isSdsPortalSecond) + url, {
    //         headers: this.resolveHeader(isSdsPortal, headers, isSdsPortalSecond, isAdmin55Api), params: helper.removeInvalidFields(params)
    //     });
    // }

    // protected getHubEnv(url: string, params: any = {}, headers?: HttpHeaders): Observable<any> {
    //     return this.http.get(`${environment.server.hubApi}/api/${url}`, {
    //         headers: this.resolveHeader(false, headers), params: helper.removeInvalidFields(params)
    //     });
    // }

    // protected post(url: string, data: any, isSdsPortal?: boolean, isSdsPortalSecond?: boolean): Observable<any> {
    //     return this.http.post(this.resolveBaseUrl(isSdsPortal, isSdsPortalSecond) + url, helper.removeInvalidFields(data), {
    //         headers: this.resolveHeader(isSdsPortal, null, isSdsPortalSecond)
    //     });
    // }

    // protected getDynamicUrl(url: string, params: any = {}, isSdsPortal?: boolean, headers?: HttpHeaders, isSdsPortalSecond?: boolean, isAdmin55Api?: boolean): Observable<any> {
    //     return this.http.get(url, {
    //         headers: this.resolveHeader(isSdsPortal, headers, isSdsPortalSecond, isAdmin55Api), params: helper.removeInvalidFields(params)
    //     });
    // }

    // protected postDynamicUrl(url: string, data: any, isSdsPortal?: boolean, isSdsPortalSecond?: boolean): Observable<any> {
    //     return this.http.post(url, helper.removeInvalidFields(data), {
    //         headers: this.resolveHeader(isSdsPortal, null, isSdsPortalSecond)
    //     });
    // }

    // protected put(url: string, data: any, isSdsPortal?: boolean, isSdsPortalSecond?: boolean): Observable<any> {
    //     return this.http.put(this.resolveBaseUrl(isSdsPortal, isSdsPortalSecond) + url, helper.removeInvalidFields(data), {
    //         headers: this.resolveHeader(isSdsPortal, null, isSdsPortalSecond)
    //     });
    // }

    // protected patch(url: string, data: any, isSdsPortal?: boolean): Observable<any> {
    //     return this.http.patch(this.resolveBaseUrl(isSdsPortal) + url, helper.removeInvalidFields(data), {
    //         headers: this.resolveHeader(isSdsPortal)
    //     });
    // }

    // protected delete(url: string, isSdsPortal?: boolean, isSdsPortalSecond?: boolean): Observable<any> {
    //     return this.http.delete(this.resolveBaseUrl(isSdsPortal, isSdsPortalSecond) + url, {
    //         headers: this.resolveHeader(isSdsPortal, null, isSdsPortalSecond)
    //     });
    // }

    // protected getProcessApi(url: string, params: any = {}): Observable<any> {
    //     const headers = new HttpHeaders();
    //     return this.http.get(environment.processApiUrl + url, { headers: headers, params, withCredentials: true });
    // }

    // protected postFile(url: string, data: any): Observable<any> {
    //     return this.http.post(environment.handbookDomain + url, data, {
    //         responseType: 'blob',
    //         headers: new HttpHeaders().append('Content-Type', 'application/json')
    //     });
    // }
}

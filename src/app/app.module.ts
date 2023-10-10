import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from "./modules/common/app-common.module";
import { APP_INITIALIZER, ErrorHandler, Injector, NgModule } from '@angular/core';
import { AppInjector } from './services/app-injector.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GlobalService } from './services/global.service';
import { environment, mergeNewSettings } from 'src/environments/environment';

export function StartupServiceFactory(http: HttpClient) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return () => {
    return http.get(`${environment.appSettings}`).toPromise().then(settings => {
      mergeNewSettings(settings);
      // update apiUrl to make sure when deployinig API + angular in same server,
      // we dont need to set apiUrl anymore.
      // if (environment.apiUrl && !environment.apiUrl.startsWith('http')) {
      //   environment.apiUrl = `${window.location.protocol}//${window.location.host}${environment.apiUrl}`;
      // }

      // if (!environment.handbookDomain) {
      //   environment.handbookDomain = `${window.location.protocol}//${window.location.host}/`;
      // }

      // if (environment.sdsPortalUrl && environment.sdsPortalUrl.startsWith('http://')
      //   && environment.apiUrl && environment.apiUrl.startsWith('https://')) {
      //   environment.sdsPortalUrl = environment.sdsPortalUrl.replace('http://', 'https://');
      // }
      // // ensure compatibility.
      // if (!environment.baseUrl) {
      //   environment.baseUrl = '/chemical-db/';
      // }
      // if (!environment.sdsPortalEnable && !environment.sdsPortalAdmin55Enable && !environment.sdsPortalSIKTEnable) {
      //   return getServerConfigs(http);
      // }

      // return Promise.all([environment.sdsPortalEnable ? challengeSdsPortal(http, localStorage) : RefreshTokenLoginSdsManager(localStorage),
      // challengeSdsPortalSecond(http, localStorage)
      //   , getServerConfigs(http)]);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    GlobalService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [HttpClient],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCommonModule,
    HttpClientModule
  ],
})
export class AppModule {
  constructor(private injectors: Injector) {
    AppInjector.setInjector(this.injectors);
  }
}

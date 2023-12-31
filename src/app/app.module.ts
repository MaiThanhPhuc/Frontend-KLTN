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
import { NotPermissionComponent } from './modules/not-permission/not-permission.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthPermissionService } from './guards/auth-permission.service';
import { AuthService } from './services/auth.service';
import { EmployeeProfileModule } from './modules/employee-profile/employee-profile.module';
import { ExportCSVSerice } from './services/exportCSV.service';

export function StartupServiceFactory(http: HttpClient) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return () => {
    return http.get(`${environment.appSettings}`).toPromise().then(settings => {
      mergeNewSettings(settings);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NotPermissionComponent,
  ],
  providers: [
    GlobalService,
    AuthPermissionService,
    ExportCSVSerice,
    AuthService,
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
    HttpClientModule,
    LoginComponent,
    EmployeeProfileModule
  ],
})
export class AppModule {
  constructor(private injectors: Injector) {
    AppInjector.setInjector(this.injectors);
  }
}

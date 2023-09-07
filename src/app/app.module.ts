import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './modules/admin/admin.component';
import { AppCommonModule } from "./modules/common/app-common.module";

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppCommonModule
    ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import locale from '@angular/common/locales/pt';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './modules/shared/navbar/navbar.module';
import { ModalModule } from './modules/shared/modal/modal.module';
import { ToastModule } from './modules/shared/toast/toast.module';
import { HomeModule } from './modules/home/home.module';
import { GlobalErrorHandler } from './handlers/global-error-handler';
import { AuthInterceptor } from './interceptors/auth-interceptor';

registerLocaleData(locale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    NavbarModule,
    ModalModule,
    ToastModule,
    HomeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

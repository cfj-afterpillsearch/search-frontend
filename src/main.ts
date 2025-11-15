import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { EnvHeaderInterceptor } from './app/core/interceptors/env-header.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: EnvHeaderInterceptor, multi: true },
    { provide: 'googleTagManagerId', useValue: environment.GTM_ID },
    GoogleTagManagerService,
  ],
}).catch((err) => console.error(err));

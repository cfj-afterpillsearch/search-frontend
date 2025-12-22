import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GM_API_KEY}`;
document.head.appendChild(script);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: 'googleTagManagerId', useValue: environment.GTM_ID },
    GoogleTagManagerService,
  ],
}).catch((err) => console.error(err));

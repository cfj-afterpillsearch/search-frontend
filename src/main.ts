import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        {provide: 'googleTagManagerId', useValue: environment.GTM_ID}
    ]
})
  .catch(err => console.error(err));

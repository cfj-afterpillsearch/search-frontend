import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MedicalInstitutionSearchComponent } from './medical-institution-search/medical-institution-search.component';
import { PharmacySearchComponent } from './pharmacy-search/pharmacy-search.component';
import { MedicalInstitutionsComponent } from './medical-institutions/medical-institutions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'medical-institution-search', component: MedicalInstitutionSearchComponent },
  { path: 'pharmacy-search', component: PharmacySearchComponent },
  { path: 'medical-institutions', component: MedicalInstitutionsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicalInstitutionSearchComponent,
    PharmacySearchComponent,
    MedicalInstitutionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

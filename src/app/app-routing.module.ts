import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ErrorComponent } from './features/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'medical-institutions',
    loadChildren: () =>
      import('./features/medical-institutions/medical-institutions.module').then((m) => m.MedicalInstitutionsModule),
  },
  {
    path: 'pharmacies',
    loadChildren: () => import('./features/pharmacies/pharmacies.module').then((m) => m.PharmaciesModule),
  },
  { path: 'error/:errorCode', component: ErrorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

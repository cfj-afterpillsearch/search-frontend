import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PrivacyComponent } from './features/privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'medical-institutions',
    loadChildren: () =>
      import('./features/medical-institutions/medical-institutions.module').then((m) => m.MedicalInstitutionsModule),
  },
  {
    path: 'pharmacies',
    loadChildren: () => import('./features/pharmacies/pharmacies.module').then((m) => m.PharmaciesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

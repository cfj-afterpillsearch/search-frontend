import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MedicalInstitutionsModule } from './features/medical-institutions/medical-institutions.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'medical-institutions',
    loadChildren: () =>
      import('./features/medical-institutions/medical-institutions.module').then((m) => m.MedicalInstitutionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MedicalInstitutionsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

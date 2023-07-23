import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MedicalInstitutionsComponent } from './medical-institutions/medical-institutions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'medical-institutions', component: SearchComponent },
  { path: 'medical-institutions/current-location', component: MedicalInstitutionsComponent },
  { path: 'medical-institutions/address', component: MedicalInstitutionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

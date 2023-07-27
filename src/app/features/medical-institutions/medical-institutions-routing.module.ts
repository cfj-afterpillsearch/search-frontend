import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalInstitutionsComponent } from './medical-institutions/medical-institutions.component';
import { ResultsCurrentLocationComponent } from './results-current-location/results-current-location.component';
import { ResultsAddressComponent } from './results-address/results-address.component';

const routes: Routes = [
  { path: '', component: MedicalInstitutionsComponent },
  { path: 'address', component: ResultsAddressComponent },
  { path: 'current-location', component: ResultsCurrentLocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalInstitutionsRoutingModule {}

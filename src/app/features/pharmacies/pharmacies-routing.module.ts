import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PharmaciesComponent} from "./pharmacies/pharmacies.component";
import {ResultsAddressComponent} from "./results-address/results-address.component";
import {ResultsCurrentLocationComponent} from "./results-current-location/results-current-location.component";

const routes: Routes = [
  { path: '', component: PharmaciesComponent },
  { path: 'address', component: ResultsAddressComponent},
  { path: 'current-location', component: ResultsCurrentLocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmaciesRoutingModule { }

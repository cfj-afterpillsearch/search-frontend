import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, MedicalInstitutionCardComponent, AreaTitleCardComponent],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.getMedicalInstitutionsByAddress();
    });
  }

  getMedicalInstitutionsByAddress() {
    this.apiService
      .getMedicalInstitutionsByAddress(this.todofuken, this.shikuchoson)
      .subscribe((apiResponse) => (this.medicalInstitutions = apiResponse.results));
  }
}

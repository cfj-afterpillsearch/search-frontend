import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { MedicalInstitutionService } from '../../../shared/medical-institution.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  prefecture = '';
  municipality = '';

  constructor(private medicalInstitutionService: MedicalInstitutionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prefecture = params['todofuken'];
      this.municipality = params['shikuchoson'];
      this.getMedicalInstitutionsByAddress();
    });
  }

  getMedicalInstitutionsByAddress() {
    this.medicalInstitutionService
      .getMedicalInstitutionsByAddress(this.prefecture, this.municipality)
      .subscribe((apiResponse) => (this.medicalInstitutions = apiResponse.results));
  }

}



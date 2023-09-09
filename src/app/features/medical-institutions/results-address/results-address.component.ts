import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { LoadingSpinnerComponent } from 'src/app/shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MedicalInstitutionCardComponent, AreaTitleCardComponent, LoadingSpinnerComponent],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;

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
      .subscribe((apiResponse) => {
        this.medicalInstitutions = apiResponse.results;
        this.totalItems = apiResponse.meta.totalItems;
        this.loading = false;
      });
  }
}

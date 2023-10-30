import { Component, OnInit } from '@angular/core';
import { MedicalInstitution } from '../../../shared/medical-institution';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MedicalInstitutionCardComponent } from '../../../shared/ui/medical-institution-card/medical-institution-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medical-institutions',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, MedicalInstitutionCardComponent, AreaTitleCardComponent],
})
export class ResultsAddressComponent implements OnInit {
  medicalInstitutions: MedicalInstitution[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  is_open_sunday = '';
  is_open_holiday = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.is_open_sunday = params['is_open_sunday'];
      this.is_open_holiday = params['is_open_holiday'];
      this.getMedicalInstitutionsByAddress();
    });
  }

  getMedicalInstitutionsByAddress() {
    this.apiService
      .getMedicalInstitutionsByAddress(this.todofuken, this.shikuchoson, this.is_open_sunday, this.is_open_holiday)
      .subscribe({
        next: (apiResponse) => {
          this.medicalInstitutions = apiResponse.results;
          this.totalItems = apiResponse.meta.totalItems;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.router.navigate(['/error']);
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../../shared/pharmacy';
import { ApiService } from '../../../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PharmacyCardComponent } from '../../../shared/ui/pharmacy-card/pharmacy-card.component';
import { AreaTitleCardComponent } from '../../../shared/ui/area-title-card/area-title-card.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './results-address.component.html',
  styleUrls: ['./results-address.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, PharmacyCardComponent, AreaTitleCardComponent],
})
export class ResultsAddressComponent implements OnInit {
  pharmacies: Pharmacy[] = [];
  todofuken = '';
  shikuchoson = '';
  totalItems = 0;
  loading = true;
  is_out_of_hours = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.todofuken = params['todofuken'];
      this.shikuchoson = params['shikuchoson'];
      this.is_out_of_hours = params['is_out_of_hours'];
      this.getPharmaciesByAddress();
    });
  }

  getPharmaciesByAddress() {
    this.apiService
      .getPharmaciesByAddress(this.todofuken, this.shikuchoson, this.is_out_of_hours)
      .subscribe({
        next: (apiResponse) => {
          this.pharmacies = apiResponse.results;
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

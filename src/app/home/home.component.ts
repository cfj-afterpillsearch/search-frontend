import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  openPillNyan() {
    window.open('https://pillnyan.jp/', '_blank');
  }

  navigateToMedicalInstitutionSearch() {
    this.router.navigate(['/search']);
  }

  navigateToPharmacySearch() {
    this.router.navigate(['/pharmacy-search']);
  }
}

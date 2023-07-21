import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Addresses} from "../addresses";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit{
  addresses: Addresses = {};
  prefectures: string[] = [];
  municipalities: string[] = [];
  selectedPrefecture = '';
  selectedMunicipality = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Addresses>('assets/addresses.json').subscribe(data => {
      this.addresses = data;
      this.prefectures = Object.keys(data);
    });
  }

  onPrefectureChange() {
    this.municipalities = this.addresses[this.selectedPrefecture] || [];
  }

  onAddressSearch() {
    this.router.navigate(['/medical-institutions/address'], {
      queryParams: {
        todofuken: this.selectedPrefecture,
        shikuchoson: this.selectedMunicipality
      }
    });
  }
}

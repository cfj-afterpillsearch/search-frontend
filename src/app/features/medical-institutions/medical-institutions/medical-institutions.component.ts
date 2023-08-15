import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addresses } from '../../../shared/types/addresses';
import { Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-search',
  templateUrl: './medical-institutions.component.html',
  styleUrls: ['./medical-institutions.component.css'],
  standalone: true,
  imports: [ButtonComponent, FormsModule, NgFor, NgClass],
})
export class MedicalInstitutionsComponent implements OnInit {
  addresses: Addresses = {};
  todofukenList: string[] = [];
  shikuchosonList: string[] = [];
  selectedTodofuken = '';
  selectedShikuchoson = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Addresses>('assets/addresses.json').subscribe((data) => {
      this.addresses = data;
      this.todofukenList = Object.keys(data);
    });
  }

  onTodofukenChange() {
    this.shikuchosonList = this.addresses[this.selectedTodofuken] || [];
  }

  onAddressSearch() {
    if (!this.isTodofukenAndShikuchosonSelected()) {
      window.alert('都道府県と市区町村を選択してください。');
      return;
    }
    this.router.navigate(['/medical-institutions/address'], {
      queryParams: {
        todofuken: this.selectedTodofuken,
        shikuchoson: this.selectedShikuchoson,
      },
    });
  }

  isTodofukenAndShikuchosonSelected() {
    return this.selectedTodofuken !== '' && this.selectedShikuchoson !== '';
  }
}

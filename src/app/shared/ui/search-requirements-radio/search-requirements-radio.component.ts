import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApsRadioComponent } from '../aps-radio/aps-radio.component';
import { RadioMetaData, SearchRequirement } from '../../types/search-requirements';

@Component({
  selector: 'app-search-requirements-radio',
  templateUrl: './search-requirements-radio.component.html',
  styleUrls: ['./search-requirements-radio.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass, NgFor, ApsRadioComponent],
})
export class SearchRequirementsRadioComponent implements OnInit {
  flexBasis = '';

  @Input() radioMetaDatas: RadioMetaData[] = [];
  @Input() name = '';
  @Input() styleChecked = '';
  @Output() searchRequirementsEvent = new EventEmitter<SearchRequirement>();

  ngOnInit() {
    this.setFlexBasis(this.radioMetaDatas.length);
  }

  selectRequirement(value: SearchRequirement) {
    this.searchRequirementsEvent.emit(value);
  }

  setFlexBasis(value: number) {
    switch (value) {
      case 1:
        this.flexBasis = 'basis-1/1';
        break;
      case 2:
        this.flexBasis = 'basis-1/2';
        break;
      case 3:
        this.flexBasis = 'basis-1/3';
        break;
      default:
        this.flexBasis = 'basis-1/4';
        break;
    }
  }
}

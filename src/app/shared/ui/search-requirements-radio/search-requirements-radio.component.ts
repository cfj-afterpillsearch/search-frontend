import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApsRadioComponent } from '../aps-radio/aps-radio.component';
import { SearchRequirements } from '../../types/search-requirements';
import { RadioMetaData } from '../../types/search-requirements';

@Component({
  selector: 'app-search-requirements-radio',
  templateUrl: './search-requirements-radio.component.html',
  styleUrls: ['./search-requirements-radio.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass, ApsRadioComponent],
})
export class SearchRequirementsRadioComponent {
  @Input() searchRequirements: SearchRequirements = {
    first: {
      name: '',
      value: '',
    },
    second: {
      name: '',
      value: '',
    },
    third: {
      name: '',
      value: '',
    },
  };
  @Input() name = '';
  @Output() searchRequirementsEvent = new EventEmitter<RadioMetaData>();

  selectRequirement(value: RadioMetaData) {
    this.searchRequirementsEvent.emit(value);
  }
}

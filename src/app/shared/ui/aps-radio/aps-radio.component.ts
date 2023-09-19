import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Radio, SearchRequirement } from '../../types/search-requirements';

@Component({
  selector: 'app-aps-radio',
  templateUrl: './aps-radio.component.html',
  styleUrls: ['./aps-radio.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class ApsRadioComponent {
  @Input() id = '';
  @Input() radio: Radio = {
    label: '',
    value: '',
    initialIsChecked: false,
  };
  @Input() name = '';
  @Input() styleChecked = '';
  @Output() radioEvent = new EventEmitter<SearchRequirement>();

  selectRadio() {
    this.radioEvent.emit({
      name: this.name,
      radioMetaData: this.radio,
    });
  }
}

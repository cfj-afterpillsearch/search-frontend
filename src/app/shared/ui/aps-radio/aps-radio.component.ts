import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RadioMetaData, SearchRequirement } from '../../types/search-requirements';

@Component({
  selector: 'app-aps-radio',
  templateUrl: './aps-radio.component.html',
  styleUrls: ['./aps-radio.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class ApsRadioComponent implements OnInit {
  @Input() id = '';
  @Input() radioMetaData: RadioMetaData = {
    label: '',
    value: '',
    initialIsChecked: false
  };
  @Input() name = '';
  @Input() styleChecked = '';
  @Output() radioEvent = new EventEmitter<SearchRequirement>();

  ngOnInit() {
  }

  selectRadio() {
    this.radioEvent.emit({
      name: this.name,
      radioMetaData: this.radioMetaData
    });
  }
}
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RadioMetaData } from '../../types/search-requirements';

@Component({
  selector: 'app-aps-radio',
  templateUrl: './aps-radio.component.html',
  styleUrls: ['./aps-radio.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class ApsRadioComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Output() radioEvent = new EventEmitter<RadioMetaData>();

  radioMetaData: RadioMetaData = {
    name: this.name,
    value: this.value
  }

  ngOnInit() {
    console.log(this.radioMetaData)
  }

  selectRadio() {
    this.radioEvent.emit({
      name: this.name,
      value: this.value,
    })
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: true,
})
export class SelectComponent {
  @Input() id = '';
}

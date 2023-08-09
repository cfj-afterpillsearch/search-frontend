import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
  host: {
    class: 'w-full'
  }
})
export class ButtonComponent {
  @Input() link = '';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();
}

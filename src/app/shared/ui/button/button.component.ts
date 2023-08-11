import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class ButtonComponent {
  @Input() link = '';
  @Input() disabled = false;
  @Output() clickEvent = new EventEmitter<void>();
  @HostBinding('class.w-full') wFull = true;
}

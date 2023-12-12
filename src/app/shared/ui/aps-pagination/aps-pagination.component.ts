import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-aps-pagination',
  templateUrl: './aps-pagination.component.html',
  styleUrls: ['./aps-pagination.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ApsPaginationComponent {
  pageList: number[] = [];
  @Input() totalPages = 1;
  @Input() currentPage = 1;
  @Output() pagerEvent = new EventEmitter<number>();

  pager(selectedPage: number) {
    this.pagerEvent.emit(selectedPage);
  }
}

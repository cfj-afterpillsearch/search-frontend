import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NewlineToBrPipe } from '../../newline-to-br.pipe';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { searchResultItemType, searchResultItem } from '../../types/search-result-item';

@Component({
  selector: 'app-card',
  templateUrl: './search-result-item-card.component.html',
  styleUrls: ['./search-result-item-card.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, NewlineToBrPipe, NgIf],
})
export class SearchResultItemCardComponent {
  constructor(private gtmService: GoogleTagManagerService) {}

  @Input() itemCategory = '' as searchResultItemType;
  @Input() item = {} as searchResultItem;
  @Input() openingHourLabel = '';
  @Input() buttonBgColor = '';
  @Input() searchEventName = '';
  @Input() telEventName = '';

  faMagnifyingGlass = faMagnifyingGlass;
  faPhone = faPhone;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  searchButtonPushTag(searchResultItem: searchResultItem) {
    const gtmTag = {
      event: this.searchEventName,
      data: {
        name: searchResultItem.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }

  telButtonPushTag(searchResultItem: searchResultItem) {
    const gtmTag = {
      event: this.telEventName,
      data: {
        name: searchResultItem.name,
      },
    };
    this.gtmService.pushTag(gtmTag);
  }
}

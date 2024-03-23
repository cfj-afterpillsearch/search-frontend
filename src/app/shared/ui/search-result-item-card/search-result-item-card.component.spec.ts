import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultItemCardComponent } from './search-result-item-card.component';

describe('CardComponent', () => {
  let component: SearchResultItemCardComponent;
  let fixture: ComponentFixture<SearchResultItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultItemCardComponent],
    });
    fixture = TestBed.createComponent(SearchResultItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

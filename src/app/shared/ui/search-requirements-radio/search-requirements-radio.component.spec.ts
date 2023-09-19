import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequirementsRadioComponent } from './search-requirements-radio.component';

describe('SearchRequirementsRadioComponent', () => {
  let component: SearchRequirementsRadioComponent;
  let fixture: ComponentFixture<SearchRequirementsRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchRequirementsRadioComponent],
    });
    fixture = TestBed.createComponent(SearchRequirementsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

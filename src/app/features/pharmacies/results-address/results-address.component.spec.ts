import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAddressComponent } from './results-address.component';

describe('ResultsAddressComponent', () => {
  let component: ResultsAddressComponent;
  let fixture: ComponentFixture<ResultsAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsAddressComponent],
    });
    fixture = TestBed.createComponent(ResultsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

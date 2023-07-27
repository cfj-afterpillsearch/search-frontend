import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCurrentLocationComponent } from './results-current-location.component';

describe('MedicalInstitutionsComponent', () => {
  let component: ResultsCurrentLocationComponent;
  let fixture: ComponentFixture<ResultsCurrentLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResultsCurrentLocationComponent],
    });
    fixture = TestBed.createComponent(ResultsCurrentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

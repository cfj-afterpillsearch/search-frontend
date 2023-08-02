import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInstitutionsComponent } from './medical-institutions.component';

describe('MedicalInstitutionSearchComponent', () => {
  let component: MedicalInstitutionsComponent;
  let fixture: ComponentFixture<MedicalInstitutionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MedicalInstitutionsComponent],
    });
    fixture = TestBed.createComponent(MedicalInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

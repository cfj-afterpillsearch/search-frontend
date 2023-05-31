import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInstitutionSearchComponent } from './medical-institution-search.component';

describe('MedicalInstitutionSearchComponent', () => {
  let component: MedicalInstitutionSearchComponent;
  let fixture: ComponentFixture<MedicalInstitutionSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalInstitutionSearchComponent],
    });
    fixture = TestBed.createComponent(MedicalInstitutionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInstitutionCardComponent } from './medical-institution-card.component';

describe('MedicalInstitutionCardComponent', () => {
  let component: MedicalInstitutionCardComponent;
  let fixture: ComponentFixture<MedicalInstitutionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MedicalInstitutionCardComponent],
    });
    fixture = TestBed.createComponent(MedicalInstitutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

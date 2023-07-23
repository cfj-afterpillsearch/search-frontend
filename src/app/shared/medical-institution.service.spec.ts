import { TestBed } from '@angular/core/testing';

import { MedicalInstitutionService } from './medical-institution.service';

describe('MedicalInstituteService', () => {
  let service: MedicalInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

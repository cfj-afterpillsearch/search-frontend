import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyCardComponent } from './pharmacy-card.component';

describe('PharmacyCardComponent', () => {
  let component: PharmacyCardComponent;
  let fixture: ComponentFixture<PharmacyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PharmacyCardComponent],
    });
    fixture = TestBed.createComponent(PharmacyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

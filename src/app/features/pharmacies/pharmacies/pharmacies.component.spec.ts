import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesComponent } from './pharmacies.component';

describe('PharmaciesComponent', () => {
  let component: PharmaciesComponent;
  let fixture: ComponentFixture<PharmaciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmaciesComponent]
    });
    fixture = TestBed.createComponent(PharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

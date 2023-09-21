import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsRadioComponent } from './aps-radio.component';

describe('ApsRadioComponent', () => {
  let component: ApsRadioComponent;
  let fixture: ComponentFixture<ApsRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApsRadioComponent],
    });
    fixture = TestBed.createComponent(ApsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

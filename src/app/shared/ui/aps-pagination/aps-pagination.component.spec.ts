import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsPaginationComponent } from './aps-pagination.component';

describe('ApsPaginationComponent', () => {
  let component: ApsPaginationComponent;
  let fixture: ComponentFixture<ApsPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApsPaginationComponent],
    });
    fixture = TestBed.createComponent(ApsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

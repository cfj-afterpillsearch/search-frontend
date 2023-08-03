import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTitleCardComponent } from './area-title-card.component';

describe('AreaTitleCardComponent', () => {
  let component: AreaTitleCardComponent;
  let fixture: ComponentFixture<AreaTitleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AreaTitleCardComponent],
    });
    fixture = TestBed.createComponent(AreaTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

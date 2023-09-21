import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofhoursExplainTextComponent } from './outofhours-explain-text.component';

describe('OutofhoursExplainTextComponent', () => {
  let component: OutofhoursExplainTextComponent;
  let fixture: ComponentFixture<OutofhoursExplainTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutofhoursExplainTextComponent],
    });
    fixture = TestBed.createComponent(OutofhoursExplainTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

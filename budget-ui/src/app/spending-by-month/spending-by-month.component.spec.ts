import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingByMonthComponent } from './spending-by-month.component';

describe('SpendingByMonthComponent', () => {
  let component: SpendingByMonthComponent;
  let fixture: ComponentFixture<SpendingByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpendingByMonthComponent]
    });
    fixture = TestBed.createComponent(SpendingByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

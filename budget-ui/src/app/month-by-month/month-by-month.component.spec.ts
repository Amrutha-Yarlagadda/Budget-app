import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthByMonthComponent } from './month-by-month.component';

describe('MonthByMonthComponent', () => {
  let component: MonthByMonthComponent;
  let fixture: ComponentFixture<MonthByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthByMonthComponent]
    });
    fixture = TestBed.createComponent(MonthByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

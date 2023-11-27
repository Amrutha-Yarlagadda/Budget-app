import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingVsBudgetComponent } from './spending-vs-budget.component';

describe('SpendingVsBudgetComponent', () => {
  let component: SpendingVsBudgetComponent;
  let fixture: ComponentFixture<SpendingVsBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpendingVsBudgetComponent]
    });
    fixture = TestBed.createComponent(SpendingVsBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureBudgetComponent } from './configurebudget.component';

describe('ConfigureBudgetComponent', () => {
  let component: ConfigureBudgetComponent;
  let fixture: ComponentFixture<ConfigureBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureBudgetComponent]
    });
    fixture = TestBed.createComponent(ConfigureBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

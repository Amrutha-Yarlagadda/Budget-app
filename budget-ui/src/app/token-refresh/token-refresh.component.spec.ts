import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRefreshComponent } from './token-refresh.component';

describe('TokenRefreshComponent', () => {
  let component: TokenRefreshComponent;
  let fixture: ComponentFixture<TokenRefreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenRefreshComponent]
    });
    fixture = TestBed.createComponent(TokenRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

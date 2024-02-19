import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TolbarNavigationComponent } from './tolbar-navigation.component';

describe('TolbarNavigationComponent', () => {
  let component: TolbarNavigationComponent;
  let fixture: ComponentFixture<TolbarNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TolbarNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TolbarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

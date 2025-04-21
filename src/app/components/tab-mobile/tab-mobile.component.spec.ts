import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMobileComponent } from './tab-mobile.component';

describe('TabMobileComponent', () => {
  let component: TabMobileComponent;
  let fixture: ComponentFixture<TabMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

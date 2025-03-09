import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardshipBarComponent } from './hardship-bar.component';

describe('HardshipBarComponent', () => {
  let component: HardshipBarComponent;
  let fixture: ComponentFixture<HardshipBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardshipBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HardshipBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

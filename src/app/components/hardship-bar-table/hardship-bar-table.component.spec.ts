import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardshipBarTableComponent } from './hardship-bar-table.component';

describe('HardshipBarTableComponent', () => {
  let component: HardshipBarTableComponent;
  let fixture: ComponentFixture<HardshipBarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardshipBarTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HardshipBarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

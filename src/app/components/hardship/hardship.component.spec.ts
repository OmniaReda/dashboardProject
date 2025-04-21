import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardshipComponent } from './hardship.component';

describe('HardshipComponent', () => {
  let component: HardshipComponent;
  let fixture: ComponentFixture<HardshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardshipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HardshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

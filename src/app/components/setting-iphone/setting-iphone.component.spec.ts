import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingIphoneComponent } from './setting-iphone.component';

describe('SettingIphoneComponent', () => {
  let component: SettingIphoneComponent;
  let fixture: ComponentFixture<SettingIphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingIphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

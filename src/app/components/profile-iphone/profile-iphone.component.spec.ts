import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIphoneComponent } from './profile-iphone.component';

describe('ProfileIphoneComponent', () => {
  let component: ProfileIphoneComponent;
  let fixture: ComponentFixture<ProfileIphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileIphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

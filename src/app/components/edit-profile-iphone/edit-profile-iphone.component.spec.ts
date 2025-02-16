import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileIphoneComponent } from './edit-profile-iphone.component';

describe('EditProfileIphoneComponent', () => {
  let component: EditProfileIphoneComponent;
  let fixture: ComponentFixture<EditProfileIphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileIphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

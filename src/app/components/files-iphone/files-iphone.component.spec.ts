import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesIphoneComponent } from './files-iphone.component';

describe('FilesIphoneComponent', () => {
  let component: FilesIphoneComponent;
  let fixture: ComponentFixture<FilesIphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesIphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesIphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

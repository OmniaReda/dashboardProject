import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-iphone',
  templateUrl: './profile-iphone.component.html',
  styleUrl: './profile-iphone.component.css',
})
export class ProfileIphoneComponent {
  openMailSent: boolean = false;
  openSetting: boolean = false;

  toggleAction(name: string): void {
    if (name === 'mail') {
      this.openMailSent = true;
    }
    if(name === 'setting') {
      this.openSetting = true
    }
  }
}

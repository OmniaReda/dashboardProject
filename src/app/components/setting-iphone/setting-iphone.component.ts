import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-setting-iphone',
  templateUrl: './setting-iphone.component.html',
  styleUrl: './setting-iphone.component.css',
})
export class SettingIphoneComponent {
  @Input() openSetting: boolean = false;
  @Output() openClose = new EventEmitter<boolean>();

  toggleAction(): void {
    this.openSetting = false;
    this.openClose.emit(this.openSetting);
  }
}

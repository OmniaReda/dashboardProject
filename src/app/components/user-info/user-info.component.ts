import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggleAction(): void {
    this.open = false;
    this.openChange.emit(this.open);
  }
}

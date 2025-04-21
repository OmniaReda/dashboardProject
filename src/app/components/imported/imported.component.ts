import { Component } from '@angular/core';

@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrl: './imported.component.css',
})
export class ImportedComponent {
  openUserInfo: boolean = false;
  openfiles: boolean = false;
  openMailSent: boolean = false;

  toggleAction(name: string): void {
    if (name === 'user') {
      this.openUserInfo = true
    }
    if (name === 'files') {
      this.openfiles = true
    }
    if (name === 'mail') {
      this.openMailSent = true
    }
  }
}

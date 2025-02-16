import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mail-sent',
  templateUrl: './mail-sent.component.html',
  styleUrl: './mail-sent.component.css',
})
export class MailSentComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggleAction(): void {
    this.open = false;
    this.openChange.emit(this.open);
  }
}

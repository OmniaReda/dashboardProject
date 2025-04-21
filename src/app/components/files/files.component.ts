import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggleAction(): void {
    this.open = false;
    this.openChange.emit(this.open);
  }
}

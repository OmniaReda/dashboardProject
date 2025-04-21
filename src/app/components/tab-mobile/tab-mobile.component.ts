import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-mobile',
  templateUrl: './tab-mobile.component.html',
  styleUrl: './tab-mobile.component.css'
})
export class TabMobileComponent {
  @Input() name: string = '';

}

import { Component, Input } from '@angular/core';

import { fadeInOut } from '../../shared/angular-animations/animations';

@Component({
  selector: 'app-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
  animations: [fadeInOut]
})
export class ScreenSaverComponent {
  @Input() showScreenSaver: boolean;
}

import { Component, Input } from '@angular/core';

import { fadeInOut } from '../../shared/angular-animations/animations';


/**
 * Component for the screen saver for application.
 */
@Component({
  selector: 'app-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
  animations: [fadeInOut]
})
export class ScreenSaverComponent {

  /**
   * Property based on which the screen saver is shown or hidden
   */
  @Input() show: boolean;
}

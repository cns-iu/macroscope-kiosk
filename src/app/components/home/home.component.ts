import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { IdleDetectorService } from '../../services/idle-detector/idle-detector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isIdle = false;

  constructor(private idleDetector: IdleDetectorService) {
    idleDetector.startIdleWatch(60 * 7).subscribe((res) => {
      this.isIdle = res;
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss']
})
export class ScreenSaverComponent implements OnInit {

  @Input() showScreenSaver: boolean;

  constructor() { }

  ngOnInit() {
  }

}

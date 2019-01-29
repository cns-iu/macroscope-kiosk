import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})
export class MacroscopeComponent {
  constructor(private readonly location: Location) { }

  backClick(): void { this.location.back(); }
}

import { Component } from '@angular/core';


/**
 * Header component holds the left content, logo of Application and right content.
 * Left Content: Could be back button or Modal click
 * Right Content: Different modal clicks based on users location
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { }

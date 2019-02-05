import { Component, OnInit } from '@angular/core';
import { DescriptionModalService } from 'src/app/shared/services/description-modal-service/description-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private modalService: DescriptionModalService) {}
  ngOnInit() {
  }
}

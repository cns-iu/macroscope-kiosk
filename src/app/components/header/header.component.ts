import { Component } from '@angular/core';
import { DescriptionModalService } from 'src/app/shared/services/description-modal-service/description-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private modalService: DescriptionModalService) {}
}

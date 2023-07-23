import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.css']
})
export class UserDetailsCardComponent {
  @Input() user: any;
}

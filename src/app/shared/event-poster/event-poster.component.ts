import { Component, Input } from '@angular/core';
import { EventDetails } from '../event-details';

@Component({
  selector: 'app-event-poster',
  templateUrl: './event-poster.component.html',
  styleUrls: ['./event-poster.component.scss']
})
export class EventPosterComponent {
  @Input() event!: EventDetails;
  @Input() showRegistrationLink = false;
}

import { Component, OnInit } from '@angular/core';
import { eventDetails } from '../../shared/event-details';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  readonly eventDetails = eventDetails;

  constructor() { }

  ngOnInit(): void {
  }

}

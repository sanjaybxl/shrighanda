import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eventDetails } from '../shared/event-details';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  readonly eventDetails = eventDetails;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigateToRegister() {
    this.router.navigate(['/events'], { queryParams: { type: 'nonbusiness' }});
  }

  navigateToRegisterStalls() {
    this.router.navigate(['/events'], { queryParams: { type: 'business' }});
  }
}

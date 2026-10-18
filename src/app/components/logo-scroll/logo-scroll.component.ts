import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { sponsorLogos } from '../../shared/sponsor-logos';

@Component({
  selector: 'app-logo-scroll',
  templateUrl: './logo-scroll.component.html',
  styleUrls: ['./logo-scroll.component.scss']
})
export class LogoScrollComponent implements OnInit {
  logos: string[] = sponsorLogos;

  duplicatedLogos: string[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // duplicate array here for smooth scroll
    this.duplicatedLogos = [...this.logos, ...this.logos];
    this.setScrollSpeed();
  }

  @HostListener('window:resize')
  onResize() {
    this.setScrollSpeed();
  }

  setScrollSpeed() {
    const width = window.innerWidth;
    let speed = '30s';
    if (width < 768) speed = '50s';
    else if (width < 1200) speed = '40s';

    this.renderer.setStyle(this.el.nativeElement, '--scroll-speed', speed);
  }
}

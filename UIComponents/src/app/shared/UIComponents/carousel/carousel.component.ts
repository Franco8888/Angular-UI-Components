import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CarouselManager } from './carouselManager';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  @Input() manager!: CarouselManager;

  constructor() {

  }
  ngOnInit(): void {
    if (this.manager.total > 0) {

      this.manager.firstEntry = true;
      this.manager.showSlides();
      this.manager.autoShowSlides();
    }
  }

}

export enum CarouselType {
  dots = 'dots',
  buttons = 'buttons'
}

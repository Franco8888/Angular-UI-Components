import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnInit {

  @Input() images: string[] = [];
  @Input() height: number = 400;
  @Input() aspectRatio: number = 1.5; // width/height
  @Input() type = CarouselType.dots;
  @Input() allowedTotal: number = 4;
  @Input() transitionTime: number = 4;  // time between auto transitioning

  currentIndex = 0;
  total: number;
  numberArr: number[] = [];
  width: number;
  canNext = true;
  canPrevious = false;
  manualTransitionPromted = false;
  firstEntry = false; // First time to enter

  constructor() {
    this.total = 0;
    this.width = 600;
  }
  
  ngOnInit(): void {
    this.total = this.images.length;
    this.width = this.height * this.aspectRatio;

    for (let i = 0; i < this.total; i++) {
      this.numberArr.push(i);
    }

    // If lenght more than 4 reduce size to 4
    if(this.total > this.allowedTotal) {
      console.log(`Carousel may only contain ${this.allowedTotal} images, thus reducing size`);
      const difference = this.total - this.allowedTotal;
      for (let i = 0; i < difference; i++) {
        this.images.pop();
      }
    }
    if(this.total < 2) {
      console.log('Carousel lenght must be more than 2');
    }
  }

  async ngAfterViewInit() {
    if (this.total > 0) {
      this.firstEntry = true;
      this.showSlides();
      this.autoShowSlides();
    }
  }

  // Next/prev buttons pressed
  onTransition(increment: number) {
    this.manualTransitionPromted = true;
    // increment 1
    if (increment === 1) {
      if (this.currentIndex === this.total-1) {
        return;
      } else {
        this.currentIndex++;
      }
    }
    // subtract 1
    if (increment === -1) {
      if (this.currentIndex === 0) {
        return;
      } else {
        this.currentIndex--;
      }
    }

    this.showSlides();
  }

  // Use dot buttons
  onTransitionToSlide(slide: number) {
    this.manualTransitionPromted = true;
    if(this.currentIndex === slide) {
      this.showSlides();
      return;
    }
    this.currentIndex = slide;

    this.showSlides();
  }

  // SHow slides using buttons
  async showSlides() {

    let slides = document.getElementsByClassName("mySlides");

    this.calculateAllowedTransition();
    
    for (let i = 0; i < slides.length; i++) {
      const slide = <HTMLElement>slides[i];
      slide.style.display = "none"; 
    }
    const el = <HTMLElement>slides[this.currentIndex];
    el.style.display = "block";

    // if dots were used
    if(this.type === CarouselType.dots) {
      let dots = document.getElementsByClassName("dot");

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      dots[this.currentIndex].className += " active";
    }
    
    if(!this.firstEntry) {
      await this.delay(500);
      this.autoShowSlides();
    }
    this.firstEntry = false;
  }
  
  // show slides with automatic transition
  async autoShowSlides() {
    for (let j = 0; j < this.transitionTime*2; j++) {
      await this.delay(500);
      const result = this.checkIfManualTransitionPromted();
      if(result) {
        this.manualTransitionPromted = false;
        return;
      }
    }
    
    
    let slides = document.getElementsByClassName("mySlides");
    
    if(this.currentIndex === this.total - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    
    this.calculateAllowedTransition();
    
    for (let i = 0; i < slides.length; i++) {
      const slide = <HTMLElement>slides[i];
      slide.style.display = "none"; 
    }
    const el = <HTMLElement>slides[this.currentIndex];
    el.style.display = "block";
    
    // if dots were used
    if(this.type === CarouselType.dots) {
      let dots = document.getElementsByClassName("dot");

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      dots[this.currentIndex].className += " active";
    }

    this.autoShowSlides();
  }

  checkIfManualTransitionPromted(): boolean {
    if(this.manualTransitionPromted) {
      return true;
    } else {
      return false;
    }
  }

  calculateAllowedTransition() {
    if(this.currentIndex === 0) {
      this.canPrevious = false;
    } else {
      this.canPrevious = true;
    }
    if(this.currentIndex === this.total - 1) {
      this.canNext = false;
    } else {
      this.canNext = true;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

export enum CarouselType {
  dots = 'dots',
  buttons = 'buttons'
}

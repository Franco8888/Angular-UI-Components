import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UISpinnerType } from './shared/UIComponents/spinner/spinner';
import { CarouselType } from './shared/UIComponents/carousel/carousel.component';
import { CarouselManager, CarouselManagerConfig } from './shared/UIComponents/carousel/carouselManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  show = false;
  title = 'UIComponents';
  date1 = new Date();
  date2 = new Date(2020, 7, 25);
  carouselImages1: string[] = [];
  carouselImages2: string[] = [];
  carouselImages3: string[] = [];
  carouselType = CarouselType.buttons;

  carouselManager1: CarouselManager;
  carouselManager2: CarouselManager;

  // Spinners
  spinCircle = UISpinnerType.circle;
  spinSquareFlip = UISpinnerType.squareFlip;
  spinCubeGrid = UISpinnerType.cubeGrid;
  spinDot = UISpinnerType.dot;
  spindotCircle = UISpinnerType.dotCircle;
  spinWave = UISpinnerType.wave;
  spinfoldingCube = UISpinnerType.foldingCube;

  constructor(public datepipe: DatePipe) {
    this.carouselImages1.push('https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80');
    this.carouselImages1.push('https://images.unsplash.com/photo-1648740310988-0d58d5838dd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    this.carouselImages1.push('https://images.unsplash.com/photo-1648737967267-f896a3cea436?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    this.carouselManager1 = new CarouselManager(this.carouselImages1, new CarouselManagerConfig());
    
    this.carouselImages2.push('https://images.unsplash.com/photo-1648907599687-869def29cfee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
    this.carouselImages2.push('https://images.unsplash.com/photo-1648907833554-8a89e8873822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80');
    this.carouselImages2.push('https://images.unsplash.com/photo-1648471520934-6f225cb72be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
    this.carouselImages2.push('https://images.unsplash.com/photo-1648856049225-c21484976429?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
    
    this.carouselManager2 = new CarouselManager(this.carouselImages2, new CarouselManagerConfig());
  }

  ngOnInit(): void {
    

    this.carouselImages3.push('https://images.unsplash.com/photo-1648823635782-586b9e160c40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    this.carouselImages3.push('https://images.unsplash.com/photo-1648748005497-f372bfff66a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80');
    this.carouselImages3.push('https://images.unsplash.com/photo-1646681268026-fbb6055f58f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');

    let date1 = new Date();
    const date2 = new Date(2020, 7, 14);
    var timeBetween = this.getTimeBetweenDates(date1, date2, 1);
    console.log(timeBetween);

  }

  getTimeBetweenDates(date1: Date, date2: Date, timeType: number): Number {
    //timeType = 1 will return days
    //timeType = 2 will return months
    //timeType = 3 will return years

    const Difference_In_Time = Math.abs(date2.getTime() - date1.getTime());

    let returnValue = 0;
    switch (timeType) {
      case 1:
        const Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        returnValue = Difference_In_Days;
        break;
      case 2:
        const Difference_In_Months = Math.floor(Difference_In_Time / (1000 * 3600 * 24 * 30));
        break;
      case 3:
        const Difference_In_Years = Math.floor(Difference_In_Time / (1000 * 3600 * 24 * 365));
        returnValue = Difference_In_Years;
        break;

      default:
        break;
    }
    // Value is rounded down
    return returnValue;
  }

  showDem() {
    this.show = true;
  }
}

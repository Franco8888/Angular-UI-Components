import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UISpinnerType } from './shared/UIComponents/spinner/spinner';

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

  // Spinners
  spinCircle = UISpinnerType.circle;
  spinSquareFlip = UISpinnerType.squareFlip;
  spinCubeGrid = UISpinnerType.cubeGrid;
  spinDot = UISpinnerType.dot;
  spindotCircle = UISpinnerType.dotCircle;
  spinWave = UISpinnerType.wave;
  spinfoldingCube = UISpinnerType.foldingCube;

  constructor(public datepipe: DatePipe) {
  }

  ngOnInit(): void {
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

import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

//=====================
//NOTE: The dotCircel and folding cube cannot bind to color prop, you need to adjust it in the CSS, because cannot bind to element's before pseudo element (try to fix)
//=====================
@Component({
	selector: 'app-ui-spinner',
	templateUrl: './spinner.html',
	styleUrls: ['./spinner.css']
})
export class AppUiSpinnerComponent implements OnInit {

	@Input() color: string = "#1f1f24";
	@Input() size: number = 40;
	@Input() type: UISpinnerType = UISpinnerType.circle;

	// Circle
	circleWidth: number;
	circleColor: string;

	// WaveSpinner
	waveWidth: number;
	waveBarWidth: number;
	waveBarGap: number;

	constructor(
	) {
		this.waveWidth = this.size * 1.15;
		this.waveBarWidth = this.size / 8;
		this.waveBarGap = this.size / 20;
		this.circleWidth = this.size / 8;
		this.circleColor = `${this.color} transparent transparent transparent`
	 }

	// ngAfterViewInit(): void {
	
	// }

	ngOnInit() {
		this.waveWidth = this.size * 1.15;
		this.waveBarWidth = this.size / 8;
		this.waveBarGap = this.size / 20;
		this.circleWidth = this.size / 8;
		this.circleColor = `${this.color} transparent transparent transparent`
	}
}

export enum UISpinnerType {
	circle = 'circle',
	squareFlip = 'squareFlip',
	dotCircle = 'dotCircle',	// This is not set with color, thus, just go change color yourself
	wave = 'wave',
	dot = 'dot',
	cubeGrid = 'cubeGrid',
	foldingCube = 'foldingCube'
}




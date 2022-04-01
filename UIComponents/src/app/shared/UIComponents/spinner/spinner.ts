import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-ui-spinner',
	templateUrl: './spinner.html',
	styleUrls: ['./spinner.css']
})
export class AppUiSpinnerComponent implements OnInit {

	@Input() color: string = "#1f1f24";
	@Input() size: number = 40;
	@Input() type: UISpinnerType = UISpinnerType.circle;

	// WaveSpinner
	waveWidth: number;
	waveBarWidth = this.size / 8;
	waveBarGap = this.size / 20;

	constructor(
	) {
		this.waveWidth = this.size * 1.15;
		this.waveBarWidth = this.size / 8;
		this.waveBarGap = this.size / 20;
	 }

	// ngAfterViewInit(): void {
	
	// }

	ngOnInit() {
		this.waveWidth = this.size * 1.15;
		this.waveBarWidth = this.size / 8;
		this.waveBarGap = this.size / 20;
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




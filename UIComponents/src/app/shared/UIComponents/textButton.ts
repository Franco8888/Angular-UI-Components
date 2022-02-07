import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: 'app-ui-text-button',
	styles: [`
		.text-button {
			border-radius: 5px;
			border: none;
			font-size: 20px;
			font-weight: bold;
			padding: 12px 20px;
			cursor: pointer;
			filter:drop-shadow(1px 1px 1px black);
		}
		
		.hovered {
			filter: brightness(0.9);
		}
	`],
	template: `
		<div class="text-button" [style.background-color]="buttonColor" [style.color]="textColor" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" (click)="onClick($event)" [class.hovered]="hovered">
			<ng-content></ng-content>
		</div>

	`
})
export class AppUiTextButtonComponent implements OnInit {

	@Output() clicked = new EventEmitter<any>();
	hovered = false;
	
    @Input() buttonColor: string = "#0d2b5c";
    @Input() textColor: string = "#e0e0e0";

	constructor(
	) { }

	ngOnInit() {
	}

	onMouseEnter() {
		this.hovered = true;
	}

	onMouseLeave() {
		this.hovered = false;
	}

	onClick(event: MouseEvent) {
		this.clicked.emit();
	}
}




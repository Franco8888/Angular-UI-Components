import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: 'app-ui-icon-text-button',
	styles: [`
		.text-icon-button {
			border-radius: 5px;
			border: none;
			padding: 12px 20px;
			font-weight: bold;
			cursor: pointer;
			filter:drop-shadow(1px 1px 1px black);
		}
		
		.hovered {
			filter: brightness(0.9);
		}
	`],
	template: `
			<div class="text-icon-button" [style.fontSize.px]="fontAndIconSize"  [style.background-color]="buttonColor" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" (click)="onClick($event)" [class.hovered]="hovered">
				<div style="display: flex;" [style.gap.px]="gap" >
					<i class="fa" [style.color]="iconColor" [ngClass]="icon" aria-hidden="true"></i>
					<div [style.color]="textColor"><ng-content></ng-content></div>
				</div>	
			</div>
	`
})
export class AppUiTextIconButtonComponent implements OnInit {

    @Input() buttonColor: string = "#0d2b5c";
	
	@Output() clicked = new EventEmitter<any>();
	hovered = false;

    @Input() textColor: string = "#e0e0e0";

    @Input() icon: string = "fa-bell";
    @Input() fontAndIconSize: number = 24;
    @Input() iconColor: string = "#e0e0e0";
	gap = this.fontAndIconSize / 3;

	constructor(
	) { }

	ngOnInit() {
		this.gap = this.fontAndIconSize/3;
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




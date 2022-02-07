import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-ui-icon-button',
    styles: [`
		.icon-button {
			border-radius: 5px;
			box-sizing: border-box;
			border: none;
			padding: 8px;
			cursor: pointer;
			filter:drop-shadow(1px 1px 1px black);
		}
		
		.hovered {
			filter: brightness(0.9);
		}
	`],
    template: `
			<div class="icon-button" [style.height.px]="size" [style.width.px]="size" [style.background-color]="buttonColor" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" (click)="onClick($event)" [class.hovered]="hovered">
				<div [style.fontSize.px]="iconSize" [style.color]="iconColor">
					<i class="fa" [ngClass]="icon" aria-hidden="true"></i>
				</div>	
			</div>
	`
})
export class AppUiIconButtonComponent implements OnInit {

    @Input() buttonColor: string = "#0d2b5c";

    @Output() clicked = new EventEmitter<any>();
    hovered = false;

    @Input() icon: string = "fa-bell";
    @Input() size: number = 40;
    @Input() iconColor: string = "#e0e0e0";
    iconSize = this.size;

    constructor(
    ) {}

    ngOnInit(): void {
        this.iconSize = this.size - 16;
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




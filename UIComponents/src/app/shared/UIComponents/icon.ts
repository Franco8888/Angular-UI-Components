import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-ui-icon',
    styles: [`
        .ui-icon {
            border-radius: 5px;
			box-sizing: border-box;
			border: none;
			padding: 8px;
			filter:drop-shadow(1px 1px 1px black);
        }
	`],
    template: `
			<div class="ui-icon" [style.height.px]="size" [style.width.px]="size" [style.background-color]="backGroundColor">
				<div [style.fontSize.px]="iconSize" [style.color]="iconColor">
					<i class="fa" [ngClass]="icon" aria-hidden="true"></i>
				</div>	
			</div>
	`
})
export class AppUiIconComponent implements OnInit {

    @Input() backGroundColor: string = "";

    @Output() clicked = new EventEmitter<any>();
    hovered = false;

    // Icon button specific
    @Input() icon: string = "fa-bell";
    @Input() size: number = 40;
    @Input() iconColor: string = "#e0e0e0";
    iconSize = this.size;

    constructor(
    ) {}
    
    ngOnInit(): void {
        this.iconSize = this.size - 16;
    }
}




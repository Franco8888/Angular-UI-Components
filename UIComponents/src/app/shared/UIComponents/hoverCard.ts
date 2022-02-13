import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-ui-hover',
    styles: [`
		.morph {
			background: rgba( 210, 204, 204, 0.2 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 1px );
            -webkit-backdrop-filter: blur( 1px );
		}
		
	`],
    template: `
			<div #hoverCard [class]="morphismClass" [style.borderRadius.px]="radius" [style.height.px]="height" [style.width.px]="width" style="position: relative" (mousemove)="onMouseMove($event)" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()" (click)="onClick()">
				<ng-content></ng-content>	
			</div>
	`
})
export class AppUiHoverCardComponent implements OnInit {

    @Output() clicked = new EventEmitter<any>();
    hovered = false;

    @Input() height: number = 400;
    @Input() width: number = 200;
    @Input() zoom: number = 1.25;
    @Input() tiltDegrees: number = 25;

    @ViewChild('hoverCard') hoverCard: ElementRef | undefined;

    @Input() morphism: boolean = false;
    @Input() radius: number = 0;
    morphismClass = "";

    ngOnInit(): void {
        if(this.morphism) {
            this.morphismClass = "morph";
        }  
    }
    
    onMouseMove(event: MouseEvent) {

        const card = this.hoverCard?.nativeElement;
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const centerXPos = card.offsetLeft + cardWidth/2;
        const centerYPos = card.offsetTop + cardHeight/2;

        // event.clientY gives distance from mouse cursor to top of viewport (changes with scrolling so have to account for scrolling)
        const topDistance = window.pageYOffset + event.clientY
        const leftDistance = window.pageXOffset + event.clientX

        const mouseX = leftDistance - centerXPos;   //gives distance from centre to cursor
        const mouseY = topDistance - centerYPos;

        const rotateX = this.tiltDegrees*( mouseY/(cardHeight/2) ) ;  
        const rotateY = this.tiltDegrees*( mouseX/(cardWidth/2) ) ;  

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.zoom}, ${this.zoom}, ${this.zoom} )`; 
    }

    onMouseEnter() {
        const card = this.hoverCard?.nativeElement;
        card.style.zIndex = '10';
        this.setTransition();
    }

    onMouseLeave() {
        const card = this.hoverCard?.nativeElement;
        card.style.zIndex = '1';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        this.setTransition();
    }

    // Method for smoothing mouse Enter and leave
    setTransition() {
        const card = this.hoverCard?.nativeElement;
        clearTimeout(card.transitionTimeOutId);
        card.style.transition = "transform 700ms cubic-bezier(.03,.98,.52,.99)";
        card.transitionTimeOutId = setTimeout(() => {
            card.style.transition = "";
        },700)

    }

    onClick() {
        this.clicked.emit();
    }
}




import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-ui-hover',
    styles: [`
        .card {

        }
		.morph {
			background: rgba( 210, 204, 204, 0.2 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 1px );
            -webkit-backdrop-filter: blur( 1px );
		}

        .border-radius {
            border-radius: 5px;
        }
		
	`],
    template: `
			<div #hoverCard [class]="morphismClass" [style.borderRadius.px]="radius" [style.height.px]="height" [style.width.px]="width" (mousemove)="onMouseMove($event)" (mouseleave)="onMouseLeave()" (click)="onClick()">
				<ng-content></ng-content>	
			</div>
	`
})
export class AppUiHoverCardComponent implements OnInit {

    @Output() clicked = new EventEmitter<any>();
    hovered = false;

    @Input() height: number = 400;
    @Input() width: number = 200;
    @Input() zoom: number = 1.2;

    @ViewChild('hoverCard') hoverCard: ElementRef | undefined;

    @Input() morphism: boolean = false;
    @Input() radius: number = 0;
    morphismClass = "";

    ngOnInit(): void {
        if(this.morphism) {
            this.morphismClass = "morph";
        }

        // const card = (Element)document.querySelector(".card");
        // this.card = card;
        // card?.addEventListener("mousemove", this.cardHover);  
    }

    cardHover(event: Event) {
    }
    
    onMouseMove(event: MouseEvent) {
        
        const degrees = 30;  
        const card = this.hoverCard?.nativeElement;

        
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const centerXPos = card.offsetLeft + cardWidth/2;
        const centerYPos = card.offsetTop + cardHeight/2;
        
        console.log(event);
    
        const mouseX = event.clientX - centerXPos;
        const mouseY = event.clientY - centerYPos;

        const rotateX = degrees*( mouseY/(cardHeight/2) ) ;  
        const rotateY = degrees*( mouseX/(cardWidth/2) ) ;  

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.zoom}, ${this.zoom}, ${this.zoom} )`; 

    }

    onMouseLeave() {
        const card = this.hoverCard?.nativeElement;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(${this.zoom}, ${this.zoom}, ${this.zoom} )`;
    }

    onClick() {
        this.clicked.emit();
    }
}




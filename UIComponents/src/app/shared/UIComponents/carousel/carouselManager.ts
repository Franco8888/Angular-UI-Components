import { CarouselType } from "./carousel.component";

export class CarouselManager {
    images: string[];
    config: CarouselManagerConfig;

    dotButtons: boolean[] = [];
    currentIndex = 0;
    currentSlide: string;
    total: number;
    numberArr: number[] = [];
    width: number;
    canNext = true;
    canPrevious = false;
    manualTransitionPromted = false;
    firstEntry = false; // First time to enter

    constructor(_images: string[], _config: CarouselManagerConfig) {
        this.images = _images;
        this.config = _config;
        this.currentSlide = this.images[this.currentIndex];
        this.total = 0;
        this.width = 600;

        this.initialize();
    }

    initialize() {
        this.total = this.images.length;
        this.width = this.config.height * this.config.aspectRatio;
        this.currentSlide = this.images[this.currentIndex];

        for (let i = 0; i < this.total; i++) {
            this.numberArr.push(i);
        }

        // If lenght more than 4 reduce size to 4
        if (this.total > this.config.allowedTotal) {
            console.log(`Carousel may only contain ${this.config.allowedTotal} images, thus reducing size`);
            const difference = this.total - this.config.allowedTotal;
            for (let i = 0; i < difference; i++) {
                this.images.pop();
            }
        }
        if (this.total < 2) {
            console.log('Carousel lenght must be more than 2');
        }

        // Initialize dot buttons
        for (let i = 0; i < this.total; i++) {
            if(i === 0) {
                this.dotButtons.push(true);
            } else {
                this.dotButtons.push(false);
            }
        }
    }
    
    // Next/prev buttons pressed
    onTransition(increment: number) {
        this.manualTransitionPromted = true;
        // increment 1
        if (increment === 1) {
            if (this.currentIndex === this.total - 1) {
                return;
            } else {
                this.currentIndex++;
                this.currentSlide = this.images[this.currentIndex];
            }
        }
        // subtract 1
        if (increment === -1) {
            if (this.currentIndex === 0) {
                return;
            } else {
                this.currentIndex--;
                this.currentSlide = this.images[this.currentIndex];
            }
        }

        this.showSlides();
    }

    // Use dot buttons
    onTransitionToSlide(slide: number) {
        this.manualTransitionPromted = true;
        if (this.currentIndex === slide) {
            this.showSlides();
            return;
        }
        this.currentIndex = slide;
        this.currentSlide = this.images[this.currentIndex];

        this.showSlides();
    }

    // SHow slides using buttons
    async showSlides() {

        let slides = document.getElementsByClassName("mySlides");

        this.calculateAllowedTransition();

        // if dots were used
        if (this.config.type === CarouselType.dots) {

            for (let i = 0; i < this.dotButtons.length; i++) {
                this.dotButtons[i] = false;
            }
            this.dotButtons[this.currentIndex] = true;;
        }

        if (!this.firstEntry) {
            await this.delay(500);
            this.autoShowSlides();
        }
        this.firstEntry = false;
    }

    // show slides with automatic transition
    async autoShowSlides() {
        for (let j = 0; j < this.config.transitionTime * 2; j++) {
            await this.delay(500);
            const result = this.checkIfManualTransitionPromted();
            if (result) {
                this.manualTransitionPromted = false;
                return;
            }
        }

        if (this.currentIndex === this.total - 1) {
            this.currentIndex = 0;
            this.currentSlide = this.images[this.currentIndex];
        } else {
            this.currentIndex++;
            this.currentSlide = this.images[this.currentIndex];
        }

        this.calculateAllowedTransition();

        // if dots were used
        if (this.config.type === CarouselType.dots) {

            for (let i = 0; i < this.dotButtons.length; i++) {
                this.dotButtons[i] = false;
            }
            this.dotButtons[this.currentIndex] = true;;
        }

        this.autoShowSlides();
    }

    checkIfManualTransitionPromted(): boolean {
        if (this.manualTransitionPromted) {
            return true;
        } else {
            return false;
        }
    }

    calculateAllowedTransition() {
        if (this.currentIndex === 0) {
            this.canPrevious = false;
        } else {
            this.canPrevious = true;
        }
        if (this.currentIndex === this.total - 1) {
            this.canNext = false;
        } else {
            this.canNext = true;
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export class CarouselManagerConfig {
    height: number;
    aspectRatio: number; // width/height
    type;
    allowedTotal;
    transitionTime;  // time between auto transitioning

    constructor(_height: number = 400, _aspectRatio: number = 1.5, _type = CarouselType.dots, _allowedTotal: number = 4, _transitionTime: number = 4) {
        this.height = _height;
        this.aspectRatio = _aspectRatio;
        this.type = _type;
        this.allowedTotal = _allowedTotal;
        this.transitionTime = _transitionTime;
    }
}

export class DotButton {
    constructor(
        public isActive: boolean,
     ) {}
}
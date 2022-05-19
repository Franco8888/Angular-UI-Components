import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarouselComponent } from './shared/UIComponents/carousel/carousel.component';
import { AppUiHoverCardComponent } from './shared/UIComponents/hoverCard';
import { AppUiIconComponent } from './shared/UIComponents/icon';
import { AppUiIconButtonComponent } from './shared/UIComponents/iconButton';
import { AppUiSpinnerComponent } from './shared/UIComponents/spinner/spinner';
import { AppUiTextButtonComponent } from './shared/UIComponents/textButton';
import { AppUiTextIconButtonComponent } from './shared/UIComponents/textIconButton';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppUiTextButtonComponent,
    AppUiIconButtonComponent,
    AppUiTextIconButtonComponent,
    AppUiIconComponent,
    AppUiHoverCardComponent,
    AppUiSpinnerComponent,
    CarouselComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

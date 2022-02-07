import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppUiIconComponent } from './shared/UIComponents/icon';
import { AppUiIconButtonComponent } from './shared/UIComponents/iconButton';
import { AppUiTextButtonComponent } from './shared/UIComponents/textButton';
import { AppUiTextIconButtonComponent } from './shared/UIComponents/textIconButton';

@NgModule({
  declarations: [
    AppComponent,
    AppUiTextButtonComponent,
    AppUiIconButtonComponent,
    AppUiTextIconButtonComponent,
    AppUiIconComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

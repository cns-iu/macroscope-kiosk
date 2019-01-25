import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { IFrameComponent } from './components/iframe/iframe.component';
import { MacroscopeComponent } from './components/macroscope/macroscope.component';
import { ModalComponent } from './components/modal/modal.component';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MacroscopeComponent,
    HeaderComponent,
    ModalComponent,
    CarouselComponent,
    CarouselItemComponent,
    IFrameComponent,
    ScreenSaverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

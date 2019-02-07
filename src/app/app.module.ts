import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { IFrameComponent } from './components/iframe/iframe.component';
import { MacroscopeComponent } from './components/macroscope/macroscope.component';
import {
  DescriptionModalContentComponent,
} from './components/modal/description-modal-content/description-modal-content.component';
import {
  DescriptionModalDialogComponent,
} from './components/modal/description-modal-dialog/description-modal-dialog.component';
import { ContainerLogoComponent } from './components/screen-saver/icons/container-logo/container-logo.component';
import { HandPointingLogoComponent } from './components/screen-saver/icons/hand-pointing-logo/hand-pointing-logo.component';
import { ScreenSaverHeaderComponent } from './components/screen-saver/screen-saver-header/screen-saver-header.component';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MacroscopeComponent,
    HeaderComponent,
    CarouselComponent,
    CarouselItemComponent,
    IFrameComponent,
    ScreenSaverComponent,
    ContainerLogoComponent,
    HandPointingLogoComponent,
    ScreenSaverHeaderComponent,
    DescriptionModalDialogComponent,
    DescriptionModalContentComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DescriptionModalContentComponent, CarouselItemComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';

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
import { VideoOverlayComponent } from './components/screen-saver/video-overlay/video-overlay.component';
import { SafePipe } from './shared/safe-pipe/safe.pipe';

@NgModule({
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // Material modules
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,

    // Third party modules
    SwiperModule,
    VgBufferingModule,
    VgControlsModule,
    VgCoreModule,
    VgOverlayPlayModule,

    // Local modules
    AppRoutingModule
  ],
  declarations: [
    // Components
    AppComponent,
    CarouselComponent,
    CarouselItemComponent,
    HeaderComponent,
    HomeComponent,
    IFrameComponent,
    MacroscopeComponent,
    ModalComponent,
    ScreenSaverComponent,
    VideoOverlayComponent,

    // Directives
    SafePipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CarouselItemComponent, ModalComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { InfiniteScrollerComponent } from './infinite-scroller/infinite-scroller.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ImageContainerComponent, InfiniteScrollerComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

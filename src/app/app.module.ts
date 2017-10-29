import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { HttpModule } from '@angular/http';
import { NgStyle } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [NgStyle],
  bootstrap: [AppComponent]
})
export class AppModule { }

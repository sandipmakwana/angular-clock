import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalogComponent } from './analog/analog.component';
import { DigitalComponent } from './digital/digital.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalogComponent,
    DigitalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

// Services
import { TwilioService } from './twilio.service';
// Modules
import { ControlsModule } from './controls/controls.module';
import { RemoteMediaModule } from './remote-media/remote-media.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    ControlsModule,
    RemoteMediaModule
  ],
  providers: [
      TwilioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

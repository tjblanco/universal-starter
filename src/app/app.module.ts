import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

// Services
import { TwilioService } from './twilio.service';
// Modules
import { ControlsModule } from './controls/controls.module';
import { RemoteMediaModule } from './remote-media/remote-media.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    ControlsModule,
    RemoteMediaModule,
    HttpClientModule
  ],
  providers: [
      TwilioService,
      HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

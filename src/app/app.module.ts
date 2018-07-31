import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import {RouterModule, Routes} from '@angular/router';

// Services
import { TwilioService } from './twilio.service';
// Modules
import { ControlsModule } from './controls/controls.module';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { RemoteMediaModule } from './remote-media/remote-media.module';


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    ControlsModule,
    RemoteMediaModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
      TwilioService,
      HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

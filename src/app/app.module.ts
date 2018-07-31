import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';

// Services
import { TwilioService } from './twilio.service';

// Modules
import { AppComponent } from './app.component';
import { ControlsModule } from './controls/controls.module';
import { HomeComponent } from './home.component';
import { DoctorComponent } from './doctor-view/doctor.component';
import { PatientComponent } from './patient-view/patient.component';
import { NotFoundComponent } from './not-found.component';
import { RemoteMediaModule } from './remote-media/remote-media.module';


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'doctor', component: DoctorComponent, pathMatch: 'full' },
    { path: 'patient', component: PatientComponent, pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DoctorComponent,
    PatientComponent
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

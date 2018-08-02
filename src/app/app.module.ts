import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { FormsModule } from '@angular/forms';
// Services
import { TwilioService } from './twilio.service';

// Modules
import { AppComponent } from './app.component';
import { ControlsModule } from './controls/controls.module';
import { HomeComponent } from './home.component';
import { DoctorComponent } from './doctor-view/doctor.component';
import { PatientComponent } from './patient-view/patient.component';
import { RemoteMediaModule } from './remote-media/remote-media.module';


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'doctor', component: DoctorComponent, pathMatch: 'full' },
    { path: 'patient', component: PatientComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    ControlsModule,
    RemoteMediaModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
      TwilioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

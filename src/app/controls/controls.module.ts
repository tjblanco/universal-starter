import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';
import { RoomControlsComponent } from '../room-controls/room-controls.component';
import { LogComponent } from '../log/log.component';
import { TwilioService } from '../twilio.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PreviewComponent,
        RoomControlsComponent,
        LogComponent
    ],
    exports: [
        PreviewComponent,
        RoomControlsComponent,
        LogComponent
    ],
    providers: [
        TwilioService
    ]
})
export class ControlsModule { }
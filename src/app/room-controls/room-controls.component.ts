import { Component } from '@angular/core';
import { TwilioService } from '../twilio.service';


@Component({
    selector: 'app-room-controls',
    templateUrl: './room-controls.component.html',
    styleUrls: ['./room-controls.component.css']
})
export class RoomControlsComponent {
    constructor(private twilio: TwilioService) {}

    joinRoom(roomName) {
        this.twilio.connectRoom(roomName);
    }
    leaveRoom() {
        this.twilio.leaveRoom();
    }
}

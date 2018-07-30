import { Component } from '@angular/core';
import {TwilioService} from '../twilio.service';
// import * as Video from 'twilio-video';

@Component({
    selector: 'app-room-controls',
    templateUrl: './room-controls.component.html',
    styleUrls: ['./room-controls.component.css']
})
export class RoomControlsComponent {
    public data;
    public previewTracks;
    public roomJoined
    constructor(private twilio: TwilioService) {}
    joinRoom(event) {
        return(true);
    }
    // ngOnInit() {
    //   this.data = this.twilio.getToken();
    // }
    // joinRoom() {
    //   // const roomName = document.getElementById('room-name').value;
    //   const roomName = null;
    //   if (!roomName) {
    //     alert('Please enter a room name.');
    //     return;
    //   }
    //
    //   // this.twilio.log('Joining room "' + roomName + '"...');
    //   const connectOptions = {
    //     name: roomName,
    //     logLevel: 'debug'
    //   };
    //
    //   if (this.previewTracks) {
    //     connectOptions['tracks'] = this.previewTracks;
    //   }
    //
    //   // Join the Room with the token from the server and the
    //   // LocalParticipant's Tracks.
    //   Video.connect(this.data.token, connectOptions).then(this.roomJoined, function(error) {
    //     this.twilio.log('Could not connect to Twilio: ' + error.message);
    //   });
    // }
}

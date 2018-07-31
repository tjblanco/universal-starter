import { Component } from '@angular/core';
import { TwilioService } from '../twilio.service';


@Component({
    selector: 'app-room-controls',
    templateUrl: './room-controls.component.html',
    styleUrls: ['./room-controls.component.css']
})
export class RoomControlsComponent {
    public room;
    public activeRoom;
    public previewTracks;
    public data;
    constructor(private twilio: TwilioService) {}
    roomJoined() {
        (<any> window).room = this.activeRoom = this.room;
        this.twilio.log('Joined room');
        document.getElementById('button-join').style.display = 'none';
        document.getElementById('button-leave').style.display = 'inline';


        // Attach LocalParticipant's Tracks, if not already attached.
        const previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
            this.twilio.attachParticipantTracks(this.room.localParticipant, previewContainer);
        }

        // Attach the Tracks of the Room's Participants.
        this.room.participants.forEach(function(participant) {
            this.twilio.log('Already in Room: "' + participant.identity + '"');
            const previewContainer = document.getElementById('remote-media');
            this.twilio.attachParticipantTracks(participant, previewContainer);
        });

        // When a Participant joins the Room, log the event.
        this.room.on('participantConnected', function(participant) {
            this.twilio.log('Joining: "' + participant.identity + '"');
        });

        // When a Participant adds a Track, attach it to the DOM.
        this.room.on('trackAdded', function(track, participant) {
            this.twilio.log(participant.identity + ' added track: ' + track.kind);
            const previewContainer = document.getElementById('remote-media');
            this.attachTracks([track], previewContainer);
        });

        // When a Participant removes a Track, detach it from the DOM.
        this.room.on('trackRemoved', function(track, participant) {
            this.twilio.log(participant.identity + ' removed track: ' + track.kind);
            this.detachTracks([track]);
        });

        // When a Participant leaves the Room, detach its Tracks.
        this.room.on('participantDisconnected', function(participant) {
            this.twilio.log('Participant "' + participant.identity + '" left the room');
            this.detachParticipantTracks(participant);
        });

        // Once the LocalParticipant leaves the room, detach the Tracks
        // of all Participants, including that of the LocalParticipant.
        this.room.on('disconnected', function() {
            this.twilio.log('Left');
            if (this.previewTracks) {
                this.previewTracks.forEach(function(track) {
                    track.stop();
                });
            }
            this.twilip.detachParticipantTracks(this.room.localParticipant);
            this.room.participants.forEach(this.twilio.detachParticipantTracks);
            this.activeRoom = null;
            document.getElementById('button-join').style.display = 'inline';
            document.getElementById('button-leave').style.display = 'none';
        });
    }
    joinRoom() {
        this.twilio.getToken();
    }
}

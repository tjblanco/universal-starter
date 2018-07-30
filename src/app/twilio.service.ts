import { Injectable, OnDestroy } from '@angular/core';

// declare const Twilio: any;
import * as Video from 'twilio-video';


@Injectable()
export class TwilioService implements OnDestroy {
    public activeRoom;
    public AccessToken;
    public VideoGrant;

    constructor() {
        this.getToken();
    }
    ngOnDestroy() {
        if (this.activeRoom) {
            this.activeRoom.disconnect();
        }
    }
    getToken () {
        // this.AccessToken = Twilio.jwt;
        // console.log(this.AccessToken);
        // return(
        // new this.AccessToken(
        //   'ACb502cdc5b1b17492802aed880cad0b22',
        //   'SK0b750704beec9dba28891e9f75d0355f',
        //   '3Cox8tqJSYghRSl2hLrNGpcIW3L4aMH6'
        // )
        // );
    }
    attachTracks(tracks, container) {
        tracks.forEach(function(track) {
            container.appendChild(track.attach());
        });
    }
    attachParticipantTracks(participant, container) {
        const tracks = Array.from(participant.tracks.values());
        this.attachTracks(tracks, container);
    }
    detachTracks(tracks) {
        tracks.forEach(function(track) {
            track.detach().forEach(function(detachedElement) {
                detachedElement.remove();
            });
        });
    }
    detachParticipantTracks(participant) {
        const tracks = Array.from(participant.tracks.values());
        this.detachTracks(tracks);
    }
    log(message) {
        const logDiv = document.getElementById('log');
        logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }
}

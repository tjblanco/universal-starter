import {Injectable, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import { Request } from 'express';
import {HttpClient} from '@angular/common/http';
import * as Video from 'twilio-video';

// const API_URL = makeStateKey('/token');
const API_URL = '/token';
@Injectable()
export class TwilioService implements OnDestroy {
    public activeRoom;
    public AccessToken;
    public VideoGrant;
    public previewTracks;
    constructor(public  http:  HttpClient) {}

    ngOnDestroy() {
        if (this.activeRoom) {
            this.activeRoom.disconnect();
        }
    }
    previewLocalParticipant(): Promise<any> { // Preview LocalParticipant's Tracks.
        this.log('Initializing camera...')
        const localTracksPromise = this.previewTracks ? Promise.resolve(this.previewTracks)
            : Video.createLocalTracks();

        return localTracksPromise
            .then((tracks: any): void => {
                (<any> window).previewTracks = this.previewTracks = tracks;
                const previewContainer = document.getElementById('local-media');
                if (!previewContainer.querySelector('video')) {
                    this.attachTracks(tracks, previewContainer);
                }
                this.log('...Done');
            }                )
            .catch((error: any): void => {
                console.error('Unable to access local media', error);
                this.log('--Unable to access Camera and Microphone----');
                this.log(JSON.stringify(error));
            });
    }
    getToken () {
        fetch('/token')
            .then((data) =>  data.json())
            .then(function(obj) {
                console.log(obj);
                const roomName = 'TestRoom';
                // const roomName = document.getElementById('room-name').value;
                if (!roomName) {
                    alert('Please enter a room name.');
                    return;
                }

                // this.twilio.log('Joining room "' + roomName + '"...');
                const connectOptions = {
                    name: roomName,
                    logLevel: 'debug'
                };

                if (this.previewTracks) {
                    connectOptions['tracks'] = this.previewTracks;
                }

                // Join the Room with the token from the server and the
                // LocalParticipant's Tracks.
                Video.connect(obj.token, connectOptions).then(this.roomJoined, function(error) {
                    this.twilio.log('Could not connect to Twilio: ' + error.message);
                });
            // var accessManager = new Twilio.AccessManager(obj.token);
            // var conversationsClient = new Twilio.Conversations.Client(accessManager);
            // conversationsClient.inviteToConversation("phil");
        });
        // return this.http.get(`${API_URL}`);
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

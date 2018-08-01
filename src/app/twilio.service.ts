import {Injectable, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import { Request } from 'express';
import {HttpClient} from '@angular/common/http';
import * as Video from 'twilio-video';

const API_URL = '/token';

@Injectable()
export class TwilioService implements OnDestroy {
    public previewTracks;
    public activeRoom;
    public identity;
    constructor(private  http:  HttpClient) { }
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
    connectRoom(roomName) {
        this.getToken(this, roomName);
    }
    leaveRoom() {
        this.log('Leaving room...');
        this.activeRoom.disconnect();
    }
    getToken (enviroment, roomName) {
        fetch('/token')
                    .then((data) =>  data.json())
                    .then(function(obj) {
                        enviroment.joinRoom(obj, enviroment, roomName);
                    });
    }
    joinRoom(data, enviroment, roomName) {
        this.identity = data.identity;
        // roomName = roomName ;
        if (!roomName) {
            alert('Please enter a room name.');
            return;
        }
        this.log('Joining room "' + roomName + '"...');
        const connectOptions = {
            name: roomName,
            logLevel: 'debug'
        };

        if (this.previewTracks) {
            connectOptions['tracks'] = this.previewTracks;
        }

        // Join the Room with the token from the server and the
        // LocalParticipant's Tracks.
        Video.connect(data.token, connectOptions).then((room) => this.roomJoined(room, enviroment), function(error) {
            this.log('Could not connect to Twilio: ' + error.message);
        });
    }
    roomJoined(room, enviroment) {
        enviroment.log('Joined as "' + enviroment.identity + '"');
        (<any> window).room = enviroment.activeRoom = room;
        document.getElementById('button-join').style.display = 'none';
        document.getElementById('button-leave').style.display = 'inline';


        // Attach LocalParticipant's Tracks, if not already attached.
        const previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
            enviroment.attachParticipantTracks(room.localParticipant, previewContainer);
        }

        // Attach the Tracks of the Room's Participants.
        room.participants.forEach(function(participant) {
            enviroment.log('Already in Room: "' + participant.identity + '"');
            const previewContainer = document.getElementById('remote-media');
            enviroment.attachParticipantTracks(participant, previewContainer);
        });

        // When a Participant joins the Room, log the event.
        room.on('participantConnected', function(participant) {
            enviroment.log('Joining: "' + participant.identity + '"');
        });

        // When a Participant adds a Track, attach it to the DOM.
        room.on('trackAdded', function(track, participant) {
            enviroment.log(participant.identity + ' added track: ' + track.kind);
            const previewContainer = document.getElementById('remote-media');
            enviroment.attachTracks([track], previewContainer);
        });

        // When a Participant removes a Track, detach it from the DOM.
        room.on('trackRemoved', function(track, participant) {
            enviroment.log(participant.identity + ' removed track: ' + track.kind);
            enviroment.detachTracks([track]);
        });

        // When a Participant leaves the Room, detach its Tracks.
        room.on('participantDisconnected', function(participant) {
            enviroment.log('Participant "' + participant.identity + '" left the room');
            enviroment.detachParticipantTracks(participant);
        });

        // Once the LocalParticipant leaves the room, detach the Tracks
        // of all Participants, including that of the LocalParticipant.
        room.on('disconnected', function() {
            enviroment.log('Left');
            if (enviroment.previewTracks) {
                enviroment.previewTracks.forEach(function(track) {
                    track.stop();
                });
            }
            enviroment.detachParticipantTracks(room.localParticipant);
            room.participants.forEach(enviroment.detachParticipantTracks);
            enviroment.activeRoom = null;
            document.getElementById('button-join').style.display = 'inline';
            document.getElementById('button-leave').style.display = 'none';
        });
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

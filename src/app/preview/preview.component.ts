import { Component, OnInit } from '@angular/core';
import * as Video from 'twilio-video';
import { TwilioService } from '../twilio.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
    previewTracks;
    public errorText: string;
    constructor(private twilio: TwilioService) { }
    ngOnInit() {
    }
    previewLocalParticipant(event) {
        const localTracksPromise = this.previewTracks
            ? Promise.resolve(this.previewTracks)
            : Video.createLocalTracks();
        localTracksPromise.then(function(tracks) {
            // window.previewTracks = this.previewTracks = tracks;
            const previewContainer = document.getElementById('local-media');
            if (!previewContainer.querySelector('video')) {
                this.attachTracks(tracks, previewContainer);
            }
        }, function(error) {
            console.error('Unable to access local media', error);
            event.twilio.log('Unable to access Camera and Microphone');
        });
    }
}

import { Component, OnInit } from '@angular/core';
import * as Video from 'twilio-video';
import { TwilioService } from '../twilio.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
    public previewTracks;
    public errorText: string;
    constructor(private twilio: TwilioService) { }
    ngOnInit() {
    }
    previewLocalParticipant(): Promise<any> { // Preview LocalParticipant's Tracks.
        this.twilio.log('Initializing camera...')
        const localTracksPromise = this.previewTracks ? Promise.resolve(this.previewTracks)
            : Video.createLocalTracks();

        return localTracksPromise
            .then((tracks: any): void => {
                (<any> window).previewTracks = this.previewTracks = tracks;
                const previewContainer = document.getElementById('local-media');
                if (!previewContainer.querySelector('video')) {
                    this.twilio.attachTracks(tracks, previewContainer);
                }
                this.twilio.log('...Done');
            }                )
            .catch((error: any): void => {
                console.error('Unable to access local media', error);
                this.twilio.log('--Unable to access Camera and Microphone----');
                this.twilio.log(JSON.stringify(error));
            });
    }
}

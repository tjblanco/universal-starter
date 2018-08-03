import { Component } from '@angular/core';
import { TwilioService } from '../twilio.service';

@Component({
    selector: 'app-preview',
    template: `
        <div id="preview">
            <div id="local-media"></div>
            <button id="button-preview" (click)="previewLocalParticipant()">
                Preview My Camera
            </button>
        </div>
    `,
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
    constructor(private twilio: TwilioService) {}
    previewLocalParticipant() {
        this.twilio.previewLocalParticipant();
    }
}

import { Component } from '@angular/core';
import { TwilioService } from '../twilio.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
    public errorText: string;
    constructor(private twilio: TwilioService) {}
    previewLocalParticipant() {
        this.twilio.previewLocalParticipant();
    }
}

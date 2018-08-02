import { Component } from '@angular/core';
import { TwilioService } from '../twilio.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
    public errorText: string;
    styles: object;

    constructor(private twilio: TwilioService) {
        this.styles = {
            display: 'inline-block'
        };
    }
    previewLocalParticipant() {
        this.twilio.previewLocalParticipant().then(() => this.styles['display'] = 'none');
    }
}

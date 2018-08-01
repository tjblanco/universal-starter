import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `
        <app-remote-media></app-remote-media>
        <app-preview></app-preview>
        <app-room-controls></app-room-controls>
        <app-log></app-log>
    `
})
export class PatientComponent {}

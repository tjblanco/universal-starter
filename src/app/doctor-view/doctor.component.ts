import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    template: `
        <app-remote-media></app-remote-media>
        <app-preview></app-preview>
        <app-room-controls></app-room-controls>
        <app-log></app-log>
    `
})
export class DoctorComponent implements OnInit {
    ngOnInit() {
        this.hide();
    }
    hide() {
        const navs = document.getElementsByClassName('nav') as HTMLCollectionOf<HTMLElement>;
        if (navs.length) {
            navs[0].style.display = 'none';
        }
    }
}

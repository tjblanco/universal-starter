import { Component } from '@angular/core';

interface Nav {
    link: string;
    name: string;
    exact: boolean;
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    nav: Nav[] = [
        {
            link: '/doctor',
            name: 'Are you a doctor?',
            exact: false
        },
        {
            link: '/patient',
            name: 'Are you a patient?',
            exact: false
        }
    ];
    ngOnInit() {
        const navs = document.getElementsByClassName('nav') as HTMLCollectionOf<HTMLElement>;
        if (navs.length) {
            navs[0].style.display = 'block';
        }
    }
}

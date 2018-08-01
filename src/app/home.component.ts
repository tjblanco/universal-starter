import {Component} from '@angular/core';

interface Nav {
    link: string;
    name: string;
    exact: boolean;
}
@Component({
    selector: 'app-home',
    template: `
        <nav class="nav">
            <a
                    *ngFor="let item of nav"
                    [routerLink]="item.link"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: item.exact }"
            >
                {{ item.name }}
            </a>
        </nav>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
}

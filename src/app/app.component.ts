import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div style="text-align:center">
            <h1>
                {{ title }}
            </h1>
        </div>
        <router-outlet></router-outlet>
        `
})
export class AppComponent {
    title = 'Genetic counseling';
}

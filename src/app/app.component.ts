import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div style="text-align:center">
            <h1>
                {{ title }}
            </h1>
            <router-outlet></router-outlet>
        </div>
        `
})
export class AppComponent {
    title = 'Genetic counseling';
}

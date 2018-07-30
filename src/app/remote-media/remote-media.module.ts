import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RemoteMediaComponent} from './remote-media.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RemoteMediaComponent
    ],
    exports: [
        RemoteMediaComponent
    ]
})
export class RemoteMediaModule { }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'logo',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <ng-container *ngIf="isLink; else elseBlock">
            <a routerLink="/" class="inline-flex va-c">
                <img src="assets/favicon.svg" class="{{ class }}">
                <ng-container *ngIf="title"> <span class=" txt-gradient txt-2 ml-075 fw9">{{ title }}</span> </ng-container>
            </a>
        </ng-container>
        <ng-template #elseBlock>
            <div class="inline-flex va-c">
                <img src="assets/favicon.svg" class="{{ class }}">
                <ng-container *ngIf="title"> <span class=" txt-gradient txt-2 ml-075 fw9">{{ title }}</span> </ng-container>
            </div>
        </ng-template>
    `,
})
export class Logo {

    @Input() class: string = 'wh-5';
    @Input() isLink: boolean = false;
    @Input() title: string = '';

}


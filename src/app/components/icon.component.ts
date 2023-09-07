import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'icon',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: ` <svg class="icon"> <use [attr.xlink:href]="path"></use> </svg> `,
})
export class Icon {

    @Input() iconName: string = '';

    get path(): string {
        return `/assets/naykel-ui.svg#${this.iconName}`;
    }
}

import { AppLayout } from './layouts/app-layout.component';
import { Logo } from './components/logo.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, AppLayout, Logo],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'angular-playground';
}

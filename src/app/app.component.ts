import { AppLayout } from './views/layouts/app-layout.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Logo } from './components/logo.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, AppLayout, Logo],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'angular-playground';
}
